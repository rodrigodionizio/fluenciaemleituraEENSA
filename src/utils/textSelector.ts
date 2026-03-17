/**
 * Função de Seleção Inteligente de Texto
 * Escolhe o texto mais adequado para a duração definida pelo professor
 */

import { ReadingText } from '../types';

/**
 * Seleciona o texto mais adequado para o tempo definido pelo professor.
 * 
 * Algoritmo:
 * 1. Filtra textos cujo intervalo [minSeconds, maxSeconds] contém `duration`
 * 2. Entre os compatíveis, prioriza o que tem `maxSeconds` mais próximo de `duration`
 *    (texto "cheio" que ocupa bem o tempo sem sobrar muito)
 * 3. Se nenhum texto for compatível exatamente, retorna o mais próximo por diferença absoluta
 * 4. Adiciona aleatoriedade: se houver 2+ textos igualmente compatíveis, sorteia um
 *    (para evitar repetição quando o professor usa o mesmo tempo)
 * 
 * @param duration - Tempo em segundos definido pelo professor
 * @param texts - Array de textos disponíveis
 * @returns O texto mais adequado para a duração
 */
export function selectTextForDuration(duration: number, texts: ReadingText[]): ReadingText {
  if (texts.length === 0) {
    throw new Error('Nenhum texto disponível na biblioteca');
  }

  // Passo 1: Filtrar textos compatíveis (duration está dentro do range)
  const compatibleTexts = texts.filter(
    text => duration >= text.minSeconds && duration <= text.maxSeconds
  );

  if (compatibleTexts.length > 0) {
    // Passo 2: Entre os compatíveis, encontrar os que melhor preenchem o tempo
    // Ordenar por proximidade do maxSeconds com duration
    const sorted = compatibleTexts.sort((a, b) => {
      const diffA = Math.abs(a.maxSeconds - duration);
      const diffB = Math.abs(b.maxSeconds - duration);
      return diffA - diffB;
    });

    // Passo 4: Adicionar aleatoriedade se houver empate
    // Pegar todos os textos com a mesma diferença mínima
    const minDiff = Math.abs(sorted[0].maxSeconds - duration);
    const bestMatches = sorted.filter(
      text => Math.abs(text.maxSeconds - duration) === minDiff
    );

    // Sortear um entre os melhores
    return bestMatches[Math.floor(Math.random() * bestMatches.length)];
  }

  // Passo 3: Nenhum texto compatível - retornar o mais próximo
  const sortedByDistance = texts.sort((a, b) => {
    const distanceA = Math.min(
      Math.abs(duration - a.minSeconds),
      Math.abs(duration - a.maxSeconds)
    );
    const distanceB = Math.min(
      Math.abs(duration - b.minSeconds),
      Math.abs(duration - b.maxSeconds)
    );
    return distanceA - distanceB;
  });

  // Aleatoriedade também para os mais próximos
  const minDistance = Math.min(
    Math.abs(duration - sortedByDistance[0].minSeconds),
    Math.abs(duration - sortedByDistance[0].maxSeconds)
  );
  
  const closestMatches = sortedByDistance.filter(text => {
    const dist = Math.min(
      Math.abs(duration - text.minSeconds),
      Math.abs(duration - text.maxSeconds)
    );
    return dist === minDistance;
  });

  return closestMatches[Math.floor(Math.random() * closestMatches.length)];
}

/**
 * Filtra textos por dificuldade (opcional para o professor)
 * 
 * @param texts - Array de textos
 * @param difficulty - Nível de dificuldade desejado
 * @returns Textos filtrados
 */
export function filterByDifficulty(
  texts: ReadingText[], 
  difficulty: 'facil' | 'medio' | 'dificil' | 'todos'
): ReadingText[] {
  if (difficulty === 'todos') return texts;
  return texts.filter(text => text.difficulty === difficulty);
}

/**
 * Filtra textos por categoria (opcional para o professor)
 * 
 * @param texts - Array de textos
 * @param category - Categoria desejada
 * @returns Textos filtrados
 */
export function filterByCategory(
  texts: ReadingText[], 
  category: 'trava-lingua' | 'fabula' | 'poesia' | 'narrativa' | 'informativo' | 'todos'
): ReadingText[] {
  if (category === 'todos') return texts;
  return texts.filter(text => text.category === category);
}

// ===== TESTES INLINE (para verificação rápida) =====

/**
 * Executa testes básicos do algoritmo de seleção
 * Útil para verificar se a lógica está funcionando
 */
export function runTests(texts: ReadingText[]): void {
  console.log('🧪 Executando testes do seletor de texto...\n');

  const tests = [
    { duration: 20, expected: 'trava-lingua ou poesia curta' },
    { duration: 60, expected: 'fábula ou informativo' },
    { duration: 150, expected: 'narrativa longa' },
    { duration: 300, expected: 'texto mais longo disponível' },
    { duration: 5, expected: 'texto mais curto disponível' },
  ];

  tests.forEach(test => {
    const selected = selectTextForDuration(test.duration, texts);
    console.log(`⏱️  Duração: ${test.duration}s`);
    console.log(`   Esperado: ${test.expected}`);
    console.log(`   Selecionado: "${selected.title}" (${selected.category})`);
    console.log(`   Range: ${selected.minSeconds}s - ${selected.maxSeconds}s`);
    console.log(`   Dificuldade: ${selected.difficulty}\n`);
  });

  console.log('✅ Testes concluídos!\n');
}
