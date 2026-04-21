import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Copy, Sparkles, Target, Settings, Smartphone, CheckCircle2 } from "lucide-react";

interface SensiItemProps {
  label: string;
  value: number;
  delay: number;
}

function SensiItem({ label, value, delay }: SensiItemProps) {
  return (
    <div className="flex items-center mb-5">
      <div className="w-28 text-sm text-neutral-300 font-medium">{label}</div>
      <div className="flex-grow h-2.5 bg-[#3a3a4a] rounded-full relative mx-4 border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 200) * 100}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full bg-[#a413ed] rounded-full shadow-[0_0_10px_rgba(164,19,237,0.5)]"
        />
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1 }}
        className="w-10 text-right text-base font-bold text-[#00ff7f] drop-shadow-[0_0_5px_rgba(0,255,127,0.3)]"
      >
        {value}
      </motion.div>
    </div>
  );
}

interface OSItemProps {
  label: string;
  value: string;
  fullWidth?: boolean;
  copyable?: boolean;
}

function OSItem({ label, value, fullWidth, copyable }: OSItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${fullWidth ? 'col-span-2' : ''} bg-[#3a3a4a]/50 rounded-xl p-4 border border-white/5 flex flex-col justify-between min-h-[80px] hover:bg-[#3a3a4a]/80 transition-colors group`}>
      <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">{label}</div>
      <div className="text-lg font-bold text-[#00ff7f] flex items-center justify-between drop-shadow-[0_0_5px_rgba(0,255,127,0.5)]">
        {value}
        {copyable && (
          <button onClick={handleCopy} className="text-[#00ff7f]/60 hover:text-[#00ff7f] transition-colors p-1">
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} className="group-hover:scale-110 transition-transform" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Generator({ config, onBack }: { config: any; onBack?: () => void }) {
  const [showSaved, setShowSaved] = useState(false);
  const { weapon = "UMP", sensi, buttonSize, dpi } = config || {};

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white selection:bg-[#a413ed]/30 p-4 font-sans flex justify-center items-start overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#1a1a2a] rounded-2xl shadow-[0_0_50px_rgba(164,19,237,0.2)] border border-[#a413ed]/20 overflow-hidden relative"
      >
        {/* Top Bar */}
        <div className="bg-[#1a1a2a]/80 backdrop-blur-md sticky top-0 z-20 px-6 py-5 flex items-center gap-5 border-b border-white/5">
          <button 
            onClick={onBack}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#a413ed]">Sensi {weapon}</h1>
            <p className="text-[11px] text-neutral-400 uppercase tracking-widest">Sensi Engine • Todo Rojo</p>
          </div>
        </div>

        <div className="px-5 py-4 space-y-6">
          {/* Game Sensi Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2a2a3a]/40 rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-white/5">
              <Sparkles className="text-[#00ff7f]" size={20} />
              <h2 className="text-lg font-black text-[#00ff7f] italic uppercase tracking-tight">Sensibilidade do Jogo</h2>
            </div>
            
            <div className="space-y-4">
              <SensiItem label="Geral" value={sensi?.geral || 185} delay={0.4} />
              <SensiItem label="Ponto Vermelho" value={sensi?.vermelho || 192} delay={0.5} />
              <SensiItem label="Mira 2X" value={sensi?.mira2x || 178} delay={0.6} />
              <SensiItem label="Mira 4X" value={sensi?.mira4x || 165} delay={0.7} />
              <SensiItem label="Mira AWM" value={sensi?.miraAWM || 60} delay={0.8} />
              <SensiItem label="Olhadinha" value={sensi?.olhadinha || 188} delay={0.9} />
            </div>
          </motion.section>

          {/* Fire Button Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-[#2a2a3a]/40 rounded-2xl p-8 border border-[#a413ed]/30 flex flex-col items-center gap-6 shadow-[0_0_20px_rgba(164,19,237,0.1)]"
          >
            <div className="flex items-center gap-2 self-start pb-2 border-b border-white/5 w-full">
              <Target className="text-[#00ff7f]" size={20} />
              <h2 className="text-lg font-black text-[#00ff7f] italic uppercase tracking-tight">Botão de Tiro</h2>
            </div>
            
            <div className="relative group cursor-help">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-[#a413ed] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(164,19,237,0.6),inset_0_0_15px_rgba(255,255,255,0.4)] border-4 border-white/20"
              >
                <div className="w-10 h-10 border-4 border-white rounded-full bg-white/20" />
              </motion.div>
              <div className="absolute -top-2 -right-4 bg-[#00ff7f] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">IDEAL</div>
            </div>
            
            <div className="text-3xl font-black italic text-neutral-100 flex items-baseline gap-2">
              <span className="text-5xl">{buttonSize || 59}</span>
              <span className="text-xl text-neutral-500">%</span>
            </div>
          </motion.section>

          {/* OS Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-[#2a2a3a]/40 rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-white/5">
              <Settings className="text-[#00ff7f]" size={20} />
              <h2 className="text-lg font-black text-[#00ff7f] italic uppercase tracking-tight">Sistema Operacional</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <OSItem label="DPI" value={String(dpi || 726)} copyable />
              <OSItem label="Ponteiro" value="Rápido" />
              <OSItem label="Fonte" value="Pequena" />
              <OSItem label="Animação" value="0.5x" />
              <OSItem label="Leitura Automática" value="0.27s" fullWidth />
              <OSItem label="1º Item" value="0.4s" fullWidth />
            </div>
          </motion.section>

          {/* Subheader action message */}
          <div className="text-center py-4">
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em]">Otimização de Hardware 100% Sincronizada</p>
          </div>

          {/* Main Action Button */}
          <div className="px-2 pb-8">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full bg-[#a413ed] hover:bg-[#8c0ebf] transition-all py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(164,19,237,0.4)] border border-white/10 group"
            >
              <Save size={24} className="group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-black italic uppercase tracking-tighter">Guardar e Aplicar Sensi</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Floating Notification */}
      <AnimatePresence>
        {showSaved && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#00ff7f] text-black font-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]"
          >
            <div className="bg-black/10 rounded-full p-1"><CheckCircle2 size={24} /></div>
            <div>
              <div className="text-sm uppercase leading-none">Sucesso!</div>
              <div className="text-[11px] font-medium opacity-70">Sensibilidade aplicada com sucesso.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
