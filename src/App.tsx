/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  RotateCcw, 
  CheckCircle, 
  Bomb, 
  Timer, 
  ChevronRight, 
  Trophy,
  XCircle,
  Volume2,
  VolumeX,
  Heart,
  GraduationCap,
  MapPin,
  Play,
  Mic,
  MicOff,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoEENSA from './images/logo_eensa.png';
import { TextScrollArea } from './components/TextScrollArea';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { analyzeReading } from './services/gemini';
import { selectTextForDuration } from './utils/textSelector';
import { TEXTS } from './data/texts';
import type { ReadingText, ReadingAnalysis } from './types';

type GameState = 'SETUP' | 'RUNNING' | 'SUCCESS' | 'FAILURE';

// School Colors from Logo
const COLORS = {
  primary: '#004d1a', // Dark Green (EENSA text)
  accentGreen: '#4CAF50',
  teal: '#00838F',
  yellow: '#FFC107',
  orange: '#E64A19',
  red: '#d32f2f'
};

// Audio Utility using Web Audio API
const playSound = (type: 'TICK' | 'BOOM' | 'SUCCESS', muted: boolean) => {
  if (muted) return;
  
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  
  const ctx = new AudioContextClass();
  
  if (type === 'TICK') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } else if (type === 'BOOM') {
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } else if (type === 'SUCCESS') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  
  // NEW: v2.0 AI-powered reading states
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<ReadingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognition = useSpeechRecognition();

  const startTimer = () => {
    // v2.0: Select optimal text for given duration
    const text = selectTextForDuration(duration, TEXTS);
    setSelectedText(text);
    
    // Reset AI states
    setAiAnalysis(null);
    speechRecognition.resetTranscript();
    
    // Start speech recognition if enabled
    if (micEnabled && speechRecognition.isSupported) {
      speechRecognition.startListening();
    }
    
    setTimeLeft(duration);
    setGameState('RUNNING');
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSuccess = async () => {
    stopTimer();
    
    // Stop speech recognition
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
    }
    
    // Play success sound
    playSound('SUCCESS', isMuted);
    setGameState('SUCCESS');
    
    // Analyze reading with AI
    if (selectedText && micEnabled) {
      setIsAnalyzing(true);
      
      try {
        const analysis = await analyzeReading({
          originalText: selectedText.content,
          transcript: speechRecognition.transcript,
          timeLeft,
          duration,
          textTitle: selectedText.title,
          difficulty: selectedText.difficulty
        });
        
        setAiAnalysis(analysis);
        setCurrentScore(Math.round((analysis.accuracy / 100) * 1000));
      } catch (error) {
        console.error('Failed to analyze reading:', error);
        setAiAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    }
    
    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [COLORS.primary, COLORS.accentGreen, COLORS.teal, COLORS.yellow, COLORS.orange]
    });
  };

  const handleFailure = () => {
    stopTimer();
    
    // Stop speech recognition
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
    }
    
    setGameState('FAILURE');
    playSound('BOOM', isMuted);
  };

  const resetGame = () => {
    stopTimer();
    
    // Stop speech recognition if active
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
    }
    
    // Reset all states
    setGameState('SETUP');
    setTimeLeft(duration);
    setSelectedText(null);
    setAiAnalysis(null);
    setCurrentScore(0);
    speechRecognition.resetTranscript();
  };

  useEffect(() => {
    if (gameState === 'RUNNING') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFailure();
            return 0;
          }
          // Play tick sound every second
          playSound('TICK', isMuted);
          return prev - 1;
        });
      }, 1000);
    }
    return () => stopTimer();
  }, [gameState, isMuted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // School Logo Component (Official)
  const SchoolLogo = () => (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <img 
          src={logoEENSA} 
          alt="Logo EENSA" 
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-black text-xl leading-none tracking-tighter" style={{ color: COLORS.primary }}>EENSA</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Escola Estadual Nossa Senhora Aparecida</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-green-100 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-stone-200 bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <SchoolLogo />
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-stone-400" /> : <Volume2 className="w-5 h-5 text-stone-600" />}
          </button>
          {gameState !== 'SETUP' && (
            <button 
              onClick={resetGame}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'SETUP' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest border border-green-100">
                  <Heart className="w-3 h-3 fill-green-700" /> Projeto Fluência
                </div>
                <h2 className="text-3xl font-black text-stone-800 leading-tight">
                  Construindo histórias através da leitura
                </h2>
                <p className="text-stone-500 font-medium">
                  Olá, Professor! Prepare o desafio para seus alunos da <span className="text-green-800 font-bold">EENSA</span>.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 space-y-8 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-50 rounded-full -z-10"></div>
                
                <div className="space-y-6">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
                    <Timer className="w-4 h-4" /> Tempo do Desafio
                  </label>
                  
                  <div className="flex items-center justify-between gap-4">
                    <button 
                      onClick={() => setDuration(Math.max(10, duration - 10))}
                      className="w-14 h-14 rounded-2xl bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-3xl font-bold transition-all active:scale-90 border border-stone-100"
                    >
                      -
                    </button>
                    <div className="text-6xl font-black tabular-nums" style={{ color: COLORS.primary }}>
                      {duration}s
                    </div>
                    <button 
                      onClick={() => setDuration(duration + 10)}
                      className="w-14 h-14 rounded-2xl bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-3xl font-bold transition-all active:scale-90 border border-stone-100"
                    >
                      +
                    </button>
                  </div>
                  
                  <input 
                    type="range" 
                    min="10" 
                    max="300" 
                    step="10"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-3 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-green-700"
                  />
                  <div className="flex justify-between text-[10px] font-black text-stone-400 uppercase tracking-widest">
                    <span>Início</span>
                    <span>Meta: 5min</span>
                  </div>
                </div>

                {/* NEW: Microphone Toggle for AI Feedback */}
                {speechRecognition.isSupported && (
                  <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${micEnabled ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-400'}`}>
                          {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm text-stone-800">IA Ouvinte</p>
                          <p className="text-[10px] text-stone-500 font-medium">
                            {micEnabled ? 'Ativado - Feedback Inteligente' : 'Desativado'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMicEnabled(!micEnabled)}
                        className={`w-12 h-7 rounded-full transition-all ${micEnabled ? 'bg-green-500' : 'bg-stone-300'} relative`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${micEnabled ? 'right-1' : 'left-1'} shadow-sm`}></div>
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  onClick={startTimer}
                  style={{ backgroundColor: COLORS.primary }}
                  className="w-full text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                >
                  INICIAR LEITURA
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-stone-400">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3" /> Mendes Pimentel
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                  <GraduationCap className="w-3 h-3" /> Educação de Qualidade
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'RUNNING' && (
            <motion.div 
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-4 h-full max-h-[calc(100vh-12rem)]"
            >
              {/* Mini Bomb + Timer Bar at top */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-lg border border-stone-100">
                <motion.div 
                  className="w-16 h-16 bg-stone-900 rounded-full relative shadow-xl flex items-center justify-center shrink-0"
                  animate={{ 
                    scale: timeLeft < 10 ? [1, 1.06, 1] : 1,
                    rotate: timeLeft < 5 ? [-1, 1, -1] : 0
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: timeLeft < 5 ? 0.08 : 0.4 
                  }}
                >
                  <Bomb className="w-8 h-8 text-stone-800" />
                  {timeLeft < 10 && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-red-500/30"
                      animate={{ opacity: [0, 0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 0.4 }}
                    />
                  )}
                </motion.div>

                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-3xl font-black tabular-nums text-stone-800">
                      {formatTime(timeLeft)}
                    </span>
                    {selectedText && (
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                        {selectedText.category}
                      </span>
                    )}
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: timeLeft < 10 ? COLORS.red : timeLeft < 30 ? COLORS.orange : COLORS.accentGreen,
                        width: `${(timeLeft / duration) * 100}%`
                      }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>

              {/* Text Reading Area - Auto Scrolling */}
              {selectedText && (
                <TextScrollArea 
                  content={selectedText.content}
                  timeLeft={timeLeft}
                  duration={duration}
                />
              )}

              {/* Success Button + Mic Status */}
              <div className="space-y-3">
                {micEnabled && speechRecognition.isListening && (
                  <div className="flex items-center justify-center gap-2 text-green-600 animate-pulse">
                    <Mic className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Ouvindo sua leitura...</span>
                  </div>
                )}
                
                <button 
                  onClick={handleSuccess}
                  style={{ backgroundColor: COLORS.accentGreen }}
                  className="w-full text-white py-6 rounded-4xl font-black text-xl shadow-2xl shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-4 border-b-8 border-green-700"
                >
                  <CheckCircle className="w-8 h-8" />
                  TEXTO MEMORIZADO!
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'SUCCESS' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-6 max-w-md"
            >
              {/* Loading State while AI analyzes */}
              {isAnalyzing && (
                <div className="text-center space-y-4 py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-20 h-20 mx-auto"
                  >
                    <Brain className="w-full h-full text-purple-500" />
                  </motion.div>
                  <p className="text-lg font-bold text-stone-600">
                    A IA está analisando sua leitura...
                  </p>
                </div>
              )}

              {/* AI Analysis Results */}
              {!isAnalyzing && aiAnalysis && (
                <>
                  {/* Emoji Header */}
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="text-8xl mb-4"
                    >
                      {aiAnalysis.emoji}
                    </motion.div>
                    <h2 className="text-4xl font-black" style={{ color: COLORS.primary }}>
                      PARABÉNS!
                    </h2>
                  </div>

                  {/* Main Feedback */}
                  <div className="bg-linear-to-br from-green-50 to-teal-50 p-6 rounded-3xl border-2 border-green-100">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <p className="text-base font-medium text-stone-700 leading-relaxed">
                        {aiAnalysis.feedback}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Accuracy */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                          Precisão
                        </span>
                      </div>
                      <p className="text-3xl font-black text-blue-600">
                        {aiAnalysis.accuracy}%
                      </p>
                    </div>

                    {/* Words Correct */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-teal-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                          Palavras
                        </span>
                      </div>
                      <p className="text-3xl font-black text-teal-600">
                        {aiAnalysis.wordsCorrect}/{aiAnalysis.wordsTotal}
                      </p>
                    </div>
                  </div>

                  {/* Highlight Card */}
                  <div className="bg-linear-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border-2 border-yellow-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-orange-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                        Destaque
                      </span>
                    </div>
                    <p className="text-lg font-bold text-orange-900">
                      {aiAnalysis.highlight}
                    </p>
                  </div>

                  {/* Encouragement */}
                  <div className="text-center">
                    <p className="text-sm font-bold text-green-700 italic">
                      "{aiAnalysis.encouragement}"
                    </p>
                  </div>
                </>
              )}

              {/* Fallback without AI */}
              {!isAnalyzing && !aiAnalysis && (
                <div className="text-center space-y-4">
                  <div className="text-7xl">🏆</div>
                  <h2 className="text-4xl font-black" style={{ color: COLORS.primary }}>
                    PARABÉNS!
                  </h2>
                  <p className="text-lg text-stone-600 font-medium">
                    Você brilhou! A leitura abre portas para novas histórias.
                  </p>
                  <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm inline-block">
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                      Tempo de Conquista
                    </p>
                    <p className="text-4xl font-black" style={{ color: COLORS.teal }}>
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
              )}

              {/* New Challenge Button */}
              <button 
                onClick={resetGame}
                style={{ backgroundColor: COLORS.primary }}
                className="w-full text-white py-6 rounded-3xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
              >
                <RotateCcw className="w-6 h-6" />
                NOVO DESAFIO
              </button>
            </motion.div>
          )}

          {gameState === 'FAILURE' && (
            <motion.div 
              key="failure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full text-center space-y-8"
            >
              <div className="relative h-64 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-32 h-32 bg-orange-500 rounded-full blur-xl"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                  className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-lg"
                />
                
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <XCircle className="w-48 h-48 text-red-500 drop-shadow-2xl" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black text-stone-800 uppercase leading-none">Quase lá!</h2>
                <p className="text-lg text-stone-600 font-medium">
                  O tempo acabou, mas o aprendizado continua. Vamos tentar mais uma vez?
                </p>
              </div>

              <button 
                onClick={resetGame}
                style={{ backgroundColor: COLORS.orange }}
                className="w-full text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-6 h-6" />
                RECOMEÇAR TREINO
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-8 bg-white border-t border-stone-100">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <div className="w-8 h-px bg-stone-200"></div>
            <Heart className="w-4 h-4 fill-stone-200" />
            <div className="w-8 h-px bg-stone-200"></div>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: COLORS.primary }}>
              "Construindo histórias..."
            </p>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">
              Escola Estadual Nossa Senhora Aparecida • Mendes Pimentel
            </p>
          </div>
        </div>
      </footer>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-12 w-80 h-80 bg-green-100 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-12 w-80 h-80 bg-teal-50 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
