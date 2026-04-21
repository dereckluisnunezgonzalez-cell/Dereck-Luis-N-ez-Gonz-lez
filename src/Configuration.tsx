import { motion, AnimatePresence } from "motion/react";
import { useState, cloneElement, ReactElement } from "react";
import { 
  Smartphone, 
  Search, 
  Cpu, 
  Crosshair, 
  Zap, 
  Activity, 
  Target, 
  Dna, 
  ChevronRight,
  Flame,
  Gamepad2,
  Save,
  CheckCircle2
} from "lucide-react";

interface ConfigurationProps {
  onGenerate: (data: any) => void;
}

export default function Configuration({ onGenerate }: ConfigurationProps) {
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [device, setDevice] = useState("");
  const [weapon, setWeapon] = useState("UMP");
  const [style, setStyle] = useState("precise");
  const [showSaved, setShowSaved] = useState(false);
  const [useDpi, setUseDpi] = useState(true);
  const [customDpi, setCustomDpi] = useState("726");
  const [intensity, setIntensity] = useState("media");

  const handleSaveProfile = () => {
    // Simulate saving the current config
    const profile = { platform, device, weapon, style, useDpi, customDpi, intensity, timestamp: new Date() };
    console.log("Perfil salvo:", profile);
    localStorage.setItem("cyborg_sensi_profile", JSON.stringify(profile));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const weapons = ["UMP", "XM8", "Desert", "MP40", "Carapina", "12 Nova"];

  const styles = [
    { id: "precise", name: "CONTROLE", icon: <Crosshair />, color: "#00ffff" },
    { id: "aggro", name: "RÁPIDO", icon: <Flame />, color: "#ff0055" },
    { id: "balanced", name: "BALANCEADO", icon: <Activity />, color: "#00ff7f" },
    { id: "smart", name: "INTELIGENTE", icon: <Dna />, color: "#a413ed" },
    { id: "pro", name: "PROFISSIONAL", icon: <Target />, color: "#ffd700" },
    { id: "speed", name: "VELOCIDADE", icon: <Zap />, color: "#007fff" },
  ];

  const intensities = [
    { id: "baja", name: "SENSI BAJA", icon: "🐢" },
    { id: "media", name: "SENSI MEDIA", icon: "🏃‍♂️" },
    { id: "alta", name: "SENSI ALTA", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-[#0a001a] text-white selection:bg-[#00ffff]/30 overflow-x-hidden font-mono">
      <div className="max-w-md mx-auto relative flex flex-col min-h-screen">
        
        {/* Weapon Display */}
        <div className="relative pt-12 flex justify-center items-end mb-8 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#a413ed]/10 blur-[100px] rounded-full" />
          <motion.img 
            src="https://picsum.photos/seed/cyberweapon/600/400" 
            alt="Cyber Weapon"
            referrerPolicy="no-referrer"
            className="w-[85%] max-w-[320px] weapon-float drop-shadow-[0_0_30px_rgba(0,255,255,0.4)] mix-blend-screen brightness-125 rounded-3xl"
          />
        </div>

        {/* Header */}
        <div className="px-6 text-center mb-10">
          <h1 className="font-display text-5xl font-black italic glitch-text tracking-tighter leading-none mb-3">
            SENSI<br />ENGINE
          </h1>
          <p className="text-neutral-500 text-xs tracking-widest uppercase leading-relaxed max-w-[280px] mx-auto opacity-70">
            Algoritmo Cíborg v4.2 • Otimização de Resposta Neural de Hardware
          </p>
        </div>

        {/* Weapon Selection */}
        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <Flame className="text-[#00ffff]" size={18} />
              <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest uppercase">Arma Selecionada</span>
            </div>

            <div className="relative mb-5 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ffff]">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="NOME DA ARMA..."
                value={weapon}
                onChange={(e) => setWeapon(e.target.value.toUpperCase())}
                className="w-full bg-[#2a004a] border-2 border-[#5a008a] rounded-xl py-3 pl-11 pr-4 text-[#00ffff] placeholder:text-[#4a008a] font-bold focus:border-[#00ffff] transition-all outline-none text-sm uppercase"
              />
            </div>
            
            <div className="text-[10px] text-neutral-400/50 font-bold mb-3 uppercase tracking-tighter">Sugestões Populares:</div>
            <div className="flex flex-wrap gap-2">
              {weapons.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeapon(w)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black transition-all border-2 ${
                    weapon === w
                      ? "bg-[#a413ed] border-[#00ff7f] text-white shadow-[0_0_10px_rgba(0,255,127,0.5)]"
                      : "bg-[#2a004a] border-[#5a008a] text-neutral-400 opacity-60 hover:opacity-100"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <Smartphone className="text-[#00ffff]" size={18} />
              <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest">PLATAFORMA</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setPlatform("android")}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all border-2 ${
                  platform === "android" 
                    ? "bg-[#a413ed] border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.5)] scale-[1.02]" 
                    : "bg-[#2a004a] border-[#5a008a] opacity-60 hover:opacity-100"
                }`}
              >
                <Smartphone size={20} />
                ANDROID
              </button>
              <button 
                onClick={() => setPlatform("ios")}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all border-2 ${
                  platform === "ios" 
                    ? "bg-[#a413ed] border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.5)] scale-[1.02]" 
                    : "bg-[#2a004a] border-[#5a008a] opacity-60 hover:opacity-100"
                }`}
              >
                <Gamepad2 size={20} />
                IOS
              </button>
            </div>
          </div>
        </div>

        {/* Device Selection */}
        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <Cpu className="text-[#00ffff]" size={18} />
              <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest">HARDWARE</span>
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ffff]">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="PROCURAR DISPOSITIVO..."
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full bg-[#2a004a] border-2 border-[#5a008a] rounded-xl py-4 pl-12 pr-4 text-[#00ffff] placeholder:text-[#4a008a] font-bold focus:border-[#00ffff] transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sensi Intensity Selection */}
        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <span className="icon">🎯</span>
              <span className="font-display text-sm font-bold text-[#a413ed] tracking-widest uppercase">Elige tu Estilo de Sensibilidad</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {intensities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIntensity(item.id)}
                  className={`w-full flex items-center justify-center gap-4 p-4 rounded-xl border-2 font-bold transition-all ${
                    intensity === item.id 
                      ? "bg-[#a413ed] border-[#00ff7f] text-white shadow-[0_0_15px_rgba(0,255,127,0.6)]" 
                      : "bg-[#2a0a4a] border-[#4a0f8a] text-neutral-400 opacity-80 hover:opacity-100 hover:bg-[#3a0ca3]"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="tracking-widest">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style Selection */}

        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <Target className="text-[#00ffff]" size={18} />
              <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest">ESTILO DE SENSI</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group ${
                    style === s.id 
                      ? "bg-[#a413ed] border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.4)] scale-105" 
                      : "bg-[#2a004a] border-[#5a008a] opacity-50 gray-scale hover:opacity-100 hover:gray-scale-0"
                  }`}
                >
                  <div className={`text-2xl mb-1 ${style === s.id ? "text-white" : "text-neutral-400 group-hover:text-[#00ffff]"}`}>
                    {style === s.id ? cloneElement(s.icon as ReactElement, { fill: "currentColor" }) : s.icon}
                  </div>
                  <span className="text-[9px] font-black">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DPI Configuration */}
        <div className="px-5 mb-8">
          <div className="bg-[#1a002a]/60 backdrop-blur-md rounded-2xl p-6 border-2 border-[#a413ed] relative scanline overflow-hidden shadow-[0_0_20px_rgba(164,19,237,0.1)]">
            <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-[#00ffff]/20">
              <div className="flex items-center gap-2">
                <Target className="text-[#00ffff]" size={18} />
                <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest uppercase">DPI AVANÇADO</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useDpi} 
                  onChange={(e) => setUseDpi(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-[#2a004a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a413ed]"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div className={`transition-all duration-300 ${useDpi ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <label className="text-[10px] text-neutral-500 font-bold mb-2 block uppercase tracking-wider">Valor do DPI Personalizado:</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Ej: 726" 
                    value={customDpi}
                    onChange={(e) => setCustomDpi(e.target.value)}
                    className="w-full bg-[#2a004a] border-2 border-[#5a008a] rounded-xl py-3 px-4 text-[#00ffff] placeholder:text-[#4a008a] font-bold focus:border-[#00ffff] transition-all outline-none"
                    disabled={!useDpi}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#00ffff]/40 font-black tracking-tighter">PIXELS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Profile Section */}
        <div className="px-5 mb-12">
          <div className="bg-[#00ffff]/5 rounded-2xl p-6 border-2 border-[#00ffff]/20 relative overflow-hidden group">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-[#00ffff] tracking-widest uppercase">Perfil Personalizado</span>
                <span className="text-[10px] text-neutral-500 font-mono mt-1">Salva sua configuração atual no cache neural.</span>
              </div>
              <button 
                onClick={handleSaveProfile}
                className="bg-[#00ffff] text-[#0a001a] p-4 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-110 active:scale-95 transition-all"
              >
                <Save size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="px-5 pb-12 mt-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onGenerate({ platform, device, style, weapon, useDpi, customDpi: useDpi ? customDpi : null, intensity })}
            className="w-full bg-[#00ffff] text-[#0a001a] py-6 rounded-2xl font-display font-black text-2xl italic tracking-tighter flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,255,255,0.6)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            GENERAR SENSI {weapon}
            <ChevronRight size={28} />
          </motion.button>
        </div>

      </div>

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
              <div className="text-sm uppercase leading-none">Perfil Salvo!</div>
              <div className="text-[11px] font-medium opacity-70">Configuração armazenada no cache local.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
