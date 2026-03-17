/**
 * Componente de Área de Leitura com Auto-Scroll Inteligente
 * 
 * Recursos:
 * - Auto-scroll 30% mais agressivo para leitores avançados
 * - Scroll manual permitido (usuário tem controle total)
 * - Auto-scroll pausa quando usuário rola manualmente
 * - Retoma auto-scroll após 2s de inatividade
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoScrollRef = useRef(0);

  // Detectar scroll manual do usuário
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const now = Date.now();
      
      // Se o scroll aconteceu logo após auto-scroll, ignore
      if (now - lastAutoScrollRef.current < 100) return;
      
      // Usuário está rolando manualmente
      setIsManualScrolling(true);
      
      // Limpar timeout anterior
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
      
      // Retomar auto-scroll após 2s de inatividade
      manualScrollTimeoutRef.current = setTimeout(() => {
        setIsManualScrolling(false);
      }, 2000);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll sincronizado e 30% mais agressivo
  useEffect(() => {
    if (!scrollRef.current || isManualScrolling) return;
    
    const el = scrollRef.current;
    const elapsed = duration - timeLeft;
    
    // Auto-scroll 30% mais rápido (1.3x) para leitores avançados
    const adjustedProgress = Math.min(1, (elapsed / duration) * 1.3);
    
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    const targetScroll = adjustedProgress * maxScroll;
    
    // Registrar timestamp do auto-scroll
    lastAutoScrollRef.current = Date.now();
    
    // Atualiza scroll suavemente
    el.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, [timeLeft, duration, isManualScrolling]);

  // Formatar parágrafos do texto
  const paragraphs = content.split('\n').filter(p => p.trim());

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 360px)', minHeight: '300px', maxHeight: '600px' }}>
      {/* Gradiente fade no topo */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-stone-50 to-transparent pointer-events-none z-10" />
      
      {/* Indicador de scroll manual permitido */}
      {!isManualScrolling && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200 shadow-sm animate-bounce">
          <ChevronDown className="w-4 h-4 text-green-600" />
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
            Pode rolar
          </span>
        </div>
      )}
      
      {/* Indicador de scroll manual ativo */}
      {isManualScrolling && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-green-500 px-3 py-1.5 rounded-full shadow-lg">
          <ChevronDown className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            Rolando
          </span>
        </div>
      )}
      
      {/* Área de texto com scroll MANUAL permitido */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto px-6 py-8 bg-linear-to-br from-white to-stone-50 rounded-3xl border border-stone-200 shadow-inner"
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
