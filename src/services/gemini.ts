/**
 * Serviço de integração com Gemini 2.0 Flash
 * Responsável por analisar a leitura do aluno e retornar feedback pedagógico
 */

import { ReadingAnalysis } from '../types';

const GEMINI_API_URL = 
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface AnalyzeReadingParams {
  originalText: string;
  transcript: string;      // O que o aluno falou (capturado pelo SpeechRecognition)
  timeLeft: number;
  duration: number;
  textTitle: string;
  difficulty: 'facil' | 'medio' | 'dificil';
}

export async function analyzeReading(params: AnalyzeReadingParams): Promise<ReadingAnalysis> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    // Fallback sem IA: retorna feedback genérico positivo
    return generateFallbackFeedback(params.timeLeft, params.duration);
  }

  const prompt = buildReadingPrompt(params);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,        // Criativo mas consistente
          maxOutputTokens: 400,    // Resposta curta e rápida
        }
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.statusText);
      return generateFallbackFeedback(params.timeLeft, params.duration);
    }

    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    
    try {
      // Remove markdown code blocks se houver
      const cleanedRaw = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanedRaw);
      
      // Validar estrutura básica
      if (parsed.feedback && parsed.emoji) {
        return parsed as ReadingAnalysis;
      }
      throw new Error('Invalid response structure');
    } catch (parseError) {
      console.warn('Failed to parse Gemini response:', parseError);
      return generateFallbackFeedback(params.timeLeft, params.duration);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return generateFallbackFeedback(params.timeLeft, params.duration);
  }
}

/**
 * Constrói o prompt pedagógico contextualizado para o Gemini
 */
function buildReadingPrompt(params: AnalyzeReadingParams): string {
  const {
    originalText,
    transcript,
    timeLeft,
    duration,
    textTitle,
    difficulty
  } = params;

  const timePerformance = Math.round((timeLeft / duration) * 100);

  return `Você é um assistente pedagógico amigável para crianças do Ensino Fundamental brasileiro.
Analise a leitura de um aluno e retorne um JSON com feedback encorajador e preciso.

TEXTO ORIGINAL (que o aluno deveria ler):
"${originalText.substring(0, 500)}..."

O QUE O ALUNO FALOU (transcrição por voz):
"${transcript || '[Sem transcrição disponível - avalie apenas pelo tempo]'}"

DADOS DA LEITURA:
- Título: ${textTitle}
- Dificuldade: ${difficulty}
- Tempo total: ${duration}s
- Tempo restante: ${timeLeft}s
- Desempenho de tempo: ${timePerformance}%

INSTRUÇÕES:
1. Compare o texto original com o que o aluno falou
2. Identifique palavras que ele errou ou pulou
3. Destaque uma conquista específica (uma palavra difícil que ele acertou)
4. Se não houver transcrição, baseie o feedback apenas no tempo
5. Use linguagem SIMPLES, POSITIVA e ACOLHEDORA para crianças (8-14 anos)
6. NUNCA critique de forma negativa — sempre enquadre como oportunidade de melhora
7. Seja específico sobre o que foi lido (mencione palavras ou trechos reais do texto)

Retorne SOMENTE este JSON (sem markdown, sem comentários):
{
  "feedback": "texto do feedback principal para o aluno (2-3 frases, linguagem infantil)",
  "emoji": "um emoji que representa o resultado (🏆 ⭐ 👍 💪 🌟 🎯)",
  "wordsCorrect": número_estimado_de_palavras_corretas,
  "wordsTotal": total_de_palavras_no_texto_original,
  "accuracy": porcentagem_0_a_100,
  "highlight": "uma palavra do texto que merece destaque positivo ou de melhora",
  "encouragement": "frase motivacional curta (máximo 10 palavras)"
}`;
}

/**
 * Calcula precisão aproximada comparando palavras do transcript com o original
 */
function calculateRoughAccuracy(original: string, transcript: string): number {
  const normalize = (s: string) => 
    s.toLowerCase()
     .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
     .replace(/[^a-z\s]/g, '')
     .split(/\s+/)
     .filter(Boolean);

  const originalWords = normalize(original);
  const transcriptWords = normalize(transcript);
  
  let matches = 0;
  transcriptWords.forEach(word => {
    if (originalWords.includes(word)) matches++;
  });
  
  return Math.min(100, Math.round((matches / originalWords.length) * 100));
}

/**
 * Feedback sem IA para quando a API key não está configurada ou falha
 */
export function generateFallbackFeedback(timeLeft: number, duration: number): ReadingAnalysis {
  const ratio = timeLeft / duration;
  const totalWords = 100; // Estimativa genérica
  
  if (ratio > 0.7) return {
    feedback: "Que leitura incrível! Você terminou com muito tempo de sobra. Você está ficando um expert! 🚀",
    emoji: "🏆",
    wordsCorrect: Math.round(totalWords * 0.95),
    wordsTotal: totalWords,
    accuracy: 95,
    highlight: "Excelente velocidade!",
    encouragement: "Continue assim, você é incrível!"
  };
  
  if (ratio > 0.4) return {
    feedback: "Muito bem! Você leu com boa velocidade e concluiu o desafio! Continue praticando! ⭐",
    emoji: "⭐",
    wordsCorrect: Math.round(totalWords * 0.80),
    wordsTotal: totalWords,
    accuracy: 80,
    highlight: "Boa fluência!",
    encouragement: "Cada leitura te deixa mais forte!"
  };
  
  if (ratio > 0.15) return {
    feedback: "Parabéns por chegar até o fim! A prática leva à perfeição. Tente de novo! 💪",
    emoji: "👍",
    wordsCorrect: Math.round(totalWords * 0.65),
    wordsTotal: totalWords,
    accuracy: 65,
    highlight: "Persistência é tudo!",
    encouragement: "Você está no caminho certo!"
  };

  return {
    feedback: "Vamos tentar mais uma vez? Quanto mais você pratica, melhor fica! Eu acredito em você! 💪",
    emoji: "💪",
    wordsCorrect: Math.round(totalWords * 0.50),
    wordsTotal: totalWords,
    accuracy: 50,
    highlight: "Não desista!",
    encouragement: "Pequenos passos levam longe!"
  };
}
