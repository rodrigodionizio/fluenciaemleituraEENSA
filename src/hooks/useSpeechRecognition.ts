/**
 * Hook para capturar a leitura em voz alta do aluno
 * Usa a Web Speech API nativa — sem dependências externas
 * 
 * Compatibilidade: Chrome ✅ | Edge ✅ | Android Chrome ✅ | Safari iOS ⚠️ (limitado)
 * 
 * IMPORTANTE: Não bloqueia nem interrompe o fluxo do app.
 * Se o navegador não suportar, o app continua funcionando normalmente
 * (apenas sem a funcionalidade de transcrição).
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionHook {
  transcript: string;           // Tudo que foi capturado durante a leitura
  isListening: boolean;         // Se o microfone está1 ativo
  isSupported: boolean;         // Se o navegador suporta
  error: string | null;         // Mensagem de erro, se houver
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Tipos da Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const recognitionRef = useRef<any>(null);
  
  const SpeechRecognitionAPI = 
    typeof window !== 'undefined' 
      ? (window.SpeechRecognition || (window as any).webkitSpeechRecognition)
      : null;
  const isSupported = !!SpeechRecognitionAPI;

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) {
      setError('Seu navegador não suporta reconhecimento de voz');
      return;
    }
    
    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;
      
      recognition.lang = 'pt-BR';          // Português do Brasil
      recognition.continuous = true;       // Continua ouvindo sem parar
      recognition.interimResults = true;   // Resultados em tempo real
      recognition.maxAlternatives = 1;
      
      let finalTranscript = '';
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript + interim);
        setError(null);
      };
      
      recognition.onend = () => {
        // Auto-restart se ainda estiver no estado de leitura
        if (recognitionRef.current && isListening) {
          try { 
            recognition.start(); 
          } catch (e) { 
            // Silenciosamente ignora se já está rodando
          }
        } else {
          setIsListening(false);
        }
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.warn('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setError('Permissão de microfone negada. Ative nas configurações do navegador.');
          setIsListening(false);
        } else if (event.error === 'no-speech') {
          // Silencioso - normal quando não há fala
          setError(null);
        } else if (event.error !== 'aborted') {
          setError(`Erro de reconhecimento: ${event.error}`);
        }
      };
      
      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (e) {
      console.error('Failed to start speech recognition:', e);
      setError('Não foi possível iniciar o reconhecimento de voz');
      setIsListening(false);
    }
  }, [isSupported, SpeechRecognitionAPI, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignora se já estava parado
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignora
        }
      }
    };
  }, []);

  return { 
    transcript, 
    isListening, 
    isSupported, 
    error,
    startListening, 
    stopListening, 
    resetTranscript 
  };
}
