/**
 * Componente de Área de Leitura com Auto-Scroll
 * Sincroniza o scroll do texto com o tempo restante
 */

import { useEffect, useRef } from 'react';

export type FontSize = 'normal' | 'grande' | 'enorme';

interface TextScrollAreaProps {
  content: string;
  duration: number;
  timeLeft: number;
  fontSize?: FontSize;
}

const fontSizeClasses: Record<FontSize, string> = {
  normal: 'text-2xl',
  grande: 'text-3xl',
  enorme: 'text-4xl'
};

export function TextScrollArea({ 
  content, 
  duration, 
  timeLeft, 
  fontSize = 'normal' 
}: TextScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll sincronizado com o tempo
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const el = scrollRef.current;
    const elapsed = duration - timeLeft;
    const progress = Math.min(1, elapsed / duration); // 0 a 1
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    
    // Atualiza scroll suavemente
    el.scrollTo({
      top: progress * maxScroll,
      behavior: 'smooth'
    });
  }, [timeLeft, duration]);

  // Formatar parágrafos do texto
  const paragraphs = content.split('\n').filter(p => p.trim());

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 360px)', minHeight: '300px', maxHeight: '600px' }}>
      {/* Gradiente fade no topo */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-stone-50 to-transparent pointer-events-none z-10" />
      
      {/* Área de texto com scroll controlado */}
      <div
        ref={scrollRef}
        className="h-full overflow-hidden px-6 py-8 bg-linear-to-br from-white to-stone-50 rounded-3xl border border-stone-200 shadow-inner"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className={`${fontSizeClasses[fontSize]} leading-relaxed text-stone-800 space-y-6`}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-green-800 first-letter:mr-1">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Gradiente fade na base */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-stone-50 to-transparent pointer-events-none z-10" />
    </div>
  );
}
