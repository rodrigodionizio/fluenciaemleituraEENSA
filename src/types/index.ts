/**
 * Tipos e constantes para o sistema de Fluência em Leitura v2.0
 */

// Nível de dificuldade ligado à faixa etária/série
export type TextDifficulty = 'facil' | 'medio' | 'dificil';

// Categoria temática do texto
export type TextCategory = 'trava-lingua' | 'fabula' | 'poesia' | 'narrativa' | 'informativo';

// Estrutura de cada texto da biblioteca
export interface ReadingText {
  id: string;
  title: string;
  category: TextCategory;
  difficulty: TextDifficulty;
  minSeconds: number;   // Tempo mínimo recomendado (segundos)
  maxSeconds: number;   // Tempo máximo recomendado (segundos)
  content: string;      // Texto completo com pontuação rica
  wordsPerMinute: number; // WPM médio esperado para este texto
  tip?: string;         // Dica pedagógica opcional para o professor
}

// Análise da IA sobre a leitura do aluno
export interface ReadingAnalysis {
  feedback: string;        // Texto do feedback para o aluno
  emoji: string;           // Emoji principal do resultado (🏆, ⭐, 👍, 💪)
  wordsCorrect: number;    // Estimativa de palavras corretas
  wordsTotal: number;      // Total de palavras do texto
  accuracy: number;        // Porcentagem de precisão (0-100)
  highlight: string;       // Uma palavra difícil que ele foi bem ou precisa melhorar
  encouragement: string;   // Frase curta de encorajamento
}

// Pontuação máxima possível por leitura
export const MAX_SCORE = 1000;

// Faixas de avaliação por pontuação
export interface ScoreTier {
  min: number;
  label: string;
  color: string;
}

export const SCORE_TIERS: ScoreTier[] = [
  { min: 850, label: '🏆 Leitura Impecável!',   color: '#FFD700' },
  { min: 650, label: '⭐ Muito Bem!',            color: '#4CAF50' },
  { min: 400, label: '👍 Bom Progresso!',        color: '#00838F' },
  { min: 1,   label: '💪 Continue Treinando!',   color: '#E64A19' },
];

// Função auxiliar para obter tier baseado na pontuação
export function getScoreTier(score: number): ScoreTier {
  for (const tier of SCORE_TIERS) {
    if (score >= tier.min) return tier;
  }
  return SCORE_TIERS[SCORE_TIERS.length - 1];
}
