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
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoEENSA from './images/logo_eensa.png';

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
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimeLeft(duration);
    setGameState('RUNNING');
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSuccess = () => {
    stopTimer();
    setGameState('SUCCESS');
    playSound('SUCCESS', isMuted);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [COLORS.primary, COLORS.accentGreen, COLORS.teal, COLORS.yellow, COLORS.orange]
    });
  };

  const handleFailure = () => {
    stopTimer();
    setGameState('FAILURE');
    playSound('BOOM', isMuted);
  };

  const resetGame = () => {
    stopTimer();
    setGameState('SETUP');
    setTimeLeft(duration);
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-12"
            >
              <div className="text-center">
                <div className="text-8xl font-black tabular-nums text-stone-800 mb-2 tracking-tighter">
                  {formatTime(timeLeft)}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  <Play className="w-3 h-3 fill-stone-600" /> Lendo agora...
                </div>
              </div>

              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="absolute w-full h-full overflow-visible" viewBox="0 0 100 100">
                  {/* Fuse Path - Longer and more defined */}
                  <motion.path
                    id="fuse-path"
                    d="M 50 20 C 70 20, 80 -10, 100 10"
                    fill="transparent"
                    stroke="#78350f"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: timeLeft / duration }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                  {/* Spark - Perfectly synced with pathLength */}
                  <motion.g
                    initial={{ x: 100, y: 10 }}
                    animate={{ 
                      // Using offsetDistance to follow the path perfectly
                      offsetDistance: `${100 - (timeLeft / duration) * 100}%`
                    }}
                    style={{ 
                      offsetPath: "path('M 50 20 C 70 20, 80 -10, 100 10')",
                      offsetRotate: "auto",
                    }}
                    transition={{ duration: 1, ease: "linear" }}
                  >
                    <motion.circle 
                      r="5" 
                      fill={COLORS.yellow}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 0.15 }}
                    />
                    <motion.circle 
                      r="3" 
                      fill={COLORS.orange}
                      animate={{ scale: [1, 2.5, 1] }}
                      transition={{ repeat: Infinity, duration: 0.1 }}
                    />
                    {/* Particle sparks */}
                    <motion.circle r="1" fill="white" animate={{ x: [0, 10], y: [0, -10], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.3 }} />
                    <motion.circle r="1" fill="white" animate={{ x: [0, -10], y: [0, 5], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.25, delay: 0.1 }} />
                  </motion.g>
                </svg>

                <motion.div 
                  className="w-48 h-48 bg-stone-900 rounded-full relative shadow-2xl flex items-center justify-center border-4 border-stone-800"
                  animate={{ 
                    scale: timeLeft < 10 ? [1, 1.08, 1] : 1,
                    rotate: timeLeft < 5 ? [-2, 2, -2] : 0
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: timeLeft < 5 ? 0.08 : 0.4 
                  }}
                >
                  <div className="absolute top-4 left-1/4 w-8 h-4 bg-stone-700/50 rounded-full blur-sm rotate-45"></div>
                  <Bomb className="w-20 h-20 text-stone-800" />
                  
                  {timeLeft < 10 && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-red-500/30"
                      animate={{ opacity: [0, 0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 0.4 }}
                    />
                  )}
                </motion.div>
              </div>

              <button 
                onClick={handleSuccess}
                style={{ backgroundColor: COLORS.accentGreen }}
                className="w-full text-white py-7 rounded-4xl font-black text-2xl shadow-2xl shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-4 border-b-8 border-green-700"
              >
                <CheckCircle className="w-10 h-10" />
                CONCLUÍDO!
              </button>
            </motion.div>
          )}

          {gameState === 'SUCCESS' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center space-y-8"
            >
              <div className="relative inline-block">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="p-10 rounded-full shadow-2xl"
                  style={{ backgroundColor: COLORS.yellow }}
                >
                  <Trophy className="w-32 h-32 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white text-green-600 p-4 rounded-full shadow-xl border-4 border-green-50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl font-black" style={{ color: COLORS.primary }}>PARABÉNS!</h2>
                <p className="text-xl text-stone-600 font-medium max-w-xs mx-auto">
                  Você brilhou! A leitura abre portas para novas histórias.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm inline-block">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Tempo de Conquista</p>
                <p className="text-4xl font-black" style={{ color: COLORS.teal }}>{formatTime(timeLeft)}</p>
              </div>

              <button 
                onClick={resetGame}
                style={{ backgroundColor: COLORS.primary }}
                className="w-full text-white py-6 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3"
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
