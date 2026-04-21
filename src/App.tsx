/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Settings, Shield, Zap, Cpu } from "lucide-react";
import Configuration from "./Configuration";
import Generator from "./Generator";

type AppState = "CONFIG" | "GENERATING" | "RESULTS";

export default function App() {
  const [appState, setAppState] = useState<AppState>("CONFIG");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Iniciando sistema...");
  const [configData, setConfigData] = useState<any>(null);

  // Handler to start the timed generation sequence
  const startGeneration = (data: any) => {
    setAppState("GENERATING");
    setProgress(0);
    
    // Base ranges for different intensities
    const ranges: Record<string, { min: number, max: number }> = {
      baja: { min: 20, max: 80 },
      media: { min: 80, max: 150 },
      alta: { min: 150, max: 200 }
    };
    
    const range = ranges[data.intensity] || ranges.media;
    const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate randomized results for the "Todo Rojo" effect
    const randomizedData = {
      ...data,
      sensi: {
        geral: getRandom(range.min, range.max),
        vermelho: getRandom(range.min, range.max),
        mira2x: getRandom(range.min, range.max),
        mira4x: getRandom(range.min, range.max),
        miraAWM: getRandom(20, 100), // AWM is usually lower
        olhadinha: getRandom(range.min, range.max)
      },
      buttonSize: Math.floor(Math.random() * 16) + 45, // 45% - 60%
      dpi: data.customDpi ? data.customDpi : (Math.floor(Math.random() * 401) + 500), // Use custom or random
    };
    
    setConfigData(randomizedData);
    
    // Stage 1: Inicializando (10%)
    const stage1 = setTimeout(() => {
      setProgress(10);
      setStatusText("Inicializando");
    }, 0);

    // Stage 2: Procesando datos (40%) after 3s
    const stage2 = setTimeout(() => {
      setProgress(40);
      setStatusText("Procesando datos");
    }, 3000);

    // Stage 3: Finalizando (70%) after 6s
    const stage3 = setTimeout(() => {
      setProgress(70);
      setStatusText("Finalizando");
    }, 6000);

    // Stage 4: Carga completa (100%) -> ¡Listo! after 9s
    const stage4 = setTimeout(() => {
      setProgress(100);
      setStatusText("¡Listo!");
      
      // Auto-transition to Generator (Results) after another 2 seconds
      setTimeout(() => setAppState("RESULTS"), 2000);
    }, 9000);
  };

  if (appState === "CONFIG") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Configuration onGenerate={startGeneration} />
      </motion.div>
    );
  }

  if (appState === "RESULTS") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Generator 
          config={configData} 
          onBack={() => setAppState("CONFIG")}
        />
      </motion.div>
    );
  }

  // GENERATING STATE (Loading Screen)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a001a] text-white font-sans selection:bg-[#a413ed]/30 p-6 selection:text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3a0ca3]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#a413ed]/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-sm text-center -mt-20"
      >
        {/* Animated Circular Progress Spinner */}
        <div className="relative mb-12">
          {/* Inner pulse */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#3a0ca3] rounded-full blur-xl"
          />
          
          <div className="relative w-32 h-32 rounded-full bg-[#3a0ca3] flex items-center justify-center p-1 overflow-hidden shadow-[0_0_30px_rgba(58,12,163,0.3)]">
            {/* The spinning border hack */}
            <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#a413ed] border-r-[#a413ed] border-b-[#a413ed] border-l-[#00ff7f] animate-spin-custom" />
            
            {/* Center icon cycling */}
            <div className="relative z-10 text-[#a413ed]">
              <AnimatePresence mode="wait">
                {progress < 25 ? (
                  <motion.div key="cpu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Cpu size={32} /></motion.div>
                ) : progress < 50 ? (
                  <motion.div key="shield" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Shield size={32} /></motion.div>
                ) : progress < 75 ? (
                  <motion.div key="zap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Zap size={32} /></motion.div>
                ) : (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Settings size={32} /></motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <motion.h1 
          className="text-5xl font-bold tracking-tight text-white mb-2 font-display italic glitch-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sensi Engine
        </motion.h1>
        
        <motion.p 
          className="text-lg text-[#00ffff] font-mono tracking-wide h-6 mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {statusText}...
        </motion.p>

        {/* Linear Progress Bar */}
        <div className="w-[80%] h-2 bg-[#1a002a] rounded-full overflow-hidden mb-6 relative border border-[#a413ed]/30">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#a413ed] to-[#00ff7f] shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 1 }}
          />
        </div>

        {/* BOOYAH! text */}
        <AnimatePresence mode="wait">
          {progress >= 100 && (
            <motion.div 
              key="booyah"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1.2, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-5xl font-black italic tracking-[0.2em] text-[#00ff7f] drop-shadow-[0_0_20px_rgba(0,255,127,0.8)]"
            >
              BOOYAH!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer details */}
      <motion.div 
        initial={{ opacity:0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase px-4 text-center leading-relaxed"
      >
        Otimização de Hardware Ativada • Latência Reduzida • Algoritmo Cíborg v4.2
      </motion.div>
    </div>
  );
}
