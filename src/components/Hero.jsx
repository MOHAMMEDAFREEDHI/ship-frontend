import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ChevronDown, 
  Anchor, 
  Activity,
  MapPin, 
  Mail, 
  Phone, 
  Wind,
  Zap,
  Cpu,
  Globe,
  Radar,
  Shield,
  Layers,
  Send
} from "lucide-react";

/* --- 1. UTILITY COMPONENTS & HOOKS --- */

// Custom Hook for Scroll Reveal
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    // Calculate glow position (percentage)
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`perspective-1000 ${className}`} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="w-full h-full transition-transform duration-100 ease-out transform-gpu preserve-3d relative overflow-hidden"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Dynamic Gloss/Glow Effect */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(6, 182, 212, 0.4) 0%, rgba(255,255,255,0) 60%)`,
            opacity: rotation.x !== 0 ? 1 : 0
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050914] min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4 inset; }
          50% { box-shadow: 0 0 25px #06b6d4, 0 0 40px #06b6d4 inset; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .shimmer-text {
          background: linear-gradient(to right, #94a3b8 20%, #ffffff 50%, #94a3b8 80%);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .glass-panel {
          background: rgba(8, 16, 30, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(6, 182, 212, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-16 lg:px-24">
        
        {/* 1. Video & Overlay Layers */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2000&auto=format&fit=crop"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
          />
          {/* Deep Ocean Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-[#082f49]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,transparent_0%,#050914_100%)]" />
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        </div>

        {/* 3. Main Content - Grid Layout for Image + Text */}
        <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left w-full">
            
            {/* LOGO PLACEHOLDER */}
            <div className={`mb-8 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
               <img src="/log4.png" alt="Architide Logo" className="w-40 h-auto object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 transition-transform duration-500 filter hue-rotate-15 brightness-110" />
            </div>
            
           
            
            <h1 className="relative">
              {/* FIXED: Increased padding-right to pr-6 and added pb-1 to ensure the 'E' is fully visible */}
              <span className={`block text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 mb-2 tracking-tighter transition-all duration-1000 delay-200 transform ${loaded ? 'translate-x-0 opacity-100 blur-0' : '-translate-x-20 opacity-0 blur-lg'} pr-6 pb-1`}>
                ARCHITIDE  Marine
              </span>
              <span className={`block text-xl md:text-3xl font-light tracking-[0.5em] text-cyan-400/90 uppercase mt-4 transition-all duration-1000 delay-300 transform ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                 AND Engineering Services
              </span>
            </h1>

            {/* Interactive Buttons */}
            <div className={`mt-12 flex flex-col md:flex-row gap-6 justify-start items-center md:items-start transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <button 
                onClick={() => scrollToSection('about-section')}
                className="group relative px-8 py-3 text-sm bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-cyan-600 hover:text-white hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
              >
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[20deg] group-hover:left-[200%] transition-all duration-700 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Initialize Protocol <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-3 text-sm text-slate-400 font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
                <span className="w-8 h-[1px] bg-slate-600 group-hover:bg-white transition-colors"></span>
                Our Fleet
              </button>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('showcase')}>
          <ChevronDown size={32} className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>
      </section>


      {/* --- SHOWCASE GRID (3D TILT) --- */}
      <section id="showcase" className="relative py-32 px-6 overflow-hidden bg-[#050914]">
        {/* Ambient Light Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse">Horizon</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed shimmer-text font-medium">
                Utilizing next-generation structural analysis and hydrodynamic simulation to forge vessels that defy the elements.
              </p>
            </div>
            <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm">
              <Activity className="animate-pulse" />
              <span className="animate-[pulse_2s_infinite]">SYSTEM STATUS: OPTIMAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
             {[
                { 
                  title: "Cyber-Hull Design", 
                  desc: "AI-Optimized drag reduction.", 
                  icon: <Wind size={32} />,
                  img: "https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=2664&auto=format&fit=crop"
                },
                { 
                  title: "Ionic Propulsion", 
                  desc: "Zero-emission energy systems.", 
                  icon: <Zap size={32} />,
                  img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2672&auto=format&fit=crop"
                },
                { 
                  title: "Neural Navigation", 
                  desc: "Autonomous deep-sea guidance.", 
                  icon: <Cpu size={32} />,
                  img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2680&auto=format&fit=crop"
                }
             ].map((item, i) => (
                <ScrollRevealWrapper key={i} delay={i * 100}>
                  <TiltCard className="h-[450px] rounded-2xl group cursor-pointer">
                    <div className="w-full h-full bg-[#081018] rounded-2xl overflow-hidden border border-cyan-500/20 relative shadow-2xl">
                      {/* Image Background */}
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40 grayscale group-hover:grayscale-0"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/80 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                        <div className="mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                          {item.icon}
                        </div>
                        
                        <div className="space-y-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                          <div className="h-[1px] w-12 bg-cyan-500 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_#22d3ee]" />
                          <p className="text-slate-400 text-sm opacity-80 group-hover:text-white transition-colors">{item.desc}</p>
                        </div>
                      </div>

                      {/* Border Glow */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-colors duration-300" />
                    </div>
                  </TiltCard>
                </ScrollRevealWrapper>
             ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Glassmorphism) --- */}
      <section className="py-20 bg-cyan-900/5 relative border-y border-white/5 bg-[#050914]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "105", label: "Vessels Deployed" },
            { val: "40%", label: "Efficiency Boost" },
            { val: "12km", label: "Max Depth" },
            { val: "24/7", label: "Global Monitoring" }
          ].map((stat, i) => (
             <ScrollRevealWrapper key={i} delay={i * 50}>
               <div className="glass-panel p-6 rounded-xl text-center group hover:bg-cyan-900/20 transition-colors duration-300">
                 <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors shadow-cyan-500/50 drop-shadow-sm animate-pulse">
                   {stat.val}
                 </div>
                 <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">{stat.label}</div>
               </div>
             </ScrollRevealWrapper>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION (New Premium Layout) --- */}
      <section id="about-section" className="relative py-32 px-6 bg-[#050914] overflow-hidden border-t border-white/5">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <ScrollRevealWrapper>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
                <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">Our Identity</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Architects of the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-600">Abyss</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                We are not just shipbuilders; we are pioneers of the deep. Architide fuses advanced robotics, AI-driven navigation, and hyper-durable materials to create vessels that dominate the world's most hostile environments.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Cpu size={18} className="text-cyan-500"/> Innovation</h4>
                  <p className="text-sm text-slate-500">Pushing the boundaries of naval physics.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Shield size={18} className="text-cyan-500"/> Resilience</h4>
                  <p className="text-sm text-slate-500">Engineered for the impossible.</p>
                </div>
              </div>

              <button className="group px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center gap-3 clip-path-slant shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                Discover Our Legacy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollRevealWrapper>
          </div>

          <div className="order-1 lg:order-2 perspective-1000">
             <ScrollRevealWrapper direction="left">
               <TiltCard className="rounded-2xl">
                 <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group h-[600px]">
                   <img 
                     src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2564&auto=format&fit=crop" 
                     alt="About Architide" 
                     className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />
                   
                   {/* Decorative Tech Elements */}
                   <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                        <Radar className="animate-spin-slow" size={16} /> 
                        <span className="tracking-widest animate-pulse">SECTOR 09</span>
                      </div>
                      <div className="w-32 h-[1px] bg-cyan-500/50 shadow-[0_0_5px_#22d3ee]"></div>
                   </div>

                   <div className="absolute bottom-8 left-8 border-l-2 border-cyan-500 pl-4">
                      <div className="text-xs font-mono text-cyan-400 mb-1">EST. 2045</div>
                      <div className="text-white font-bold text-xl">HQ: NEO-TOKYO</div>
                   </div>
                 </div>
               </TiltCard>
             </ScrollRevealWrapper>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECT (Parallax) --- */}
      <section className="relative py-40 overflow-hidden bg-[#050914] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="bac.webp" 
            alt="Featured Project Background" 
            className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-[20s] hover:scale-110" 
            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#050914]/80 to-[#050914]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
           <ScrollRevealWrapper>
              <div className="inline-block px-4 py-1 mb-6 border border-orange-500/50 rounded-full text-orange-400 text-xs font-bold tracking-[0.2em] uppercase bg-orange-950/30 backdrop-blur-md animate-pulse">
                Featured Operation
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight">
                The Poseidon <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-500">MK-IV</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                A marvel of modern engineering, capable of withstanding pressures at the bottom of the Mariana Trench while maintaining full life-support autonomy for 30 days.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="px-8 py-6 bg-[#081018]/60 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[160px] group hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
                  <Anchor className="mx-auto mb-3 text-orange-500 group-hover:scale-110 transition-transform" size={28} />
                  <div className="text-3xl font-bold text-white mb-1">450ft</div>
                  <div className="text-[10px] uppercase text-slate-500 tracking-widest">Length</div>
                </div>
                <div className="px-8 py-6 bg-[#081018]/60 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[160px] group hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
                  <Layers className="mx-auto mb-3 text-orange-500 group-hover:scale-110 transition-transform" size={28} />
                  <div className="text-3xl font-bold text-white mb-1">Titanium</div>
                  <div className="text-[10px] uppercase text-slate-500 tracking-widest">Hull Alloy</div>
                </div>
                 <div className="px-8 py-6 bg-[#081018]/60 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[160px] group hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
                  <Globe className="mx-auto mb-3 text-orange-500 group-hover:scale-110 transition-transform" size={28} />
                  <div className="text-3xl font-bold text-white mb-1">Global</div>
                  <div className="text-[10px] uppercase text-slate-500 tracking-widest">Range</div>
                </div>
              </div>

              <div>
                <button className="group relative px-10 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-sm">
                  <span className="relative z-10 flex items-center gap-2">
                    View Project Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
           </ScrollRevealWrapper>
        </div>
      </section>

      {/* --- CONTACT (Holographic Form) --- */}
      <section className="relative py-32 px-6 bg-[#050914] overflow-hidden">
        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-30" />

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollRevealWrapper>
            <div className="relative rounded-2xl p-1 md:p-12 border border-white/10 bg-[#081018]/50 backdrop-blur-xl overflow-hidden group">
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl" />

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"></span> SECURE UPLINK
                </div>
                <h2 className="text-4xl font-black text-white mb-4">Initialize <span className="text-cyan-500">Communication</span></h2>
                <p className="text-slate-400 max-w-lg mx-auto">Secure channels are open for contracting and high-priority inquiries. Encryption protocols active.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group relative">
                    <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all peer font-mono text-sm" placeholder="IDENTITY CODE" />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full peer-focus:w-full shadow-[0_0_10px_#22d3ee]"></div>
                  </div>
                  <div className="group relative">
                    <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all peer font-mono text-sm" placeholder="FREQUENCY (EMAIL)" />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full peer-focus:w-full shadow-[0_0_10px_#22d3ee]"></div>
                  </div>
                </div>

                <div className="group relative">
                  <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all peer resize-none font-mono text-sm" placeholder="TRANSMISSION DATA"></textarea>
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full peer-focus:w-full shadow-[0_0_10px_#22d3ee]"></div>
                </div>

                <button className="w-full py-5 bg-cyan-600 border border-cyan-500 text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send size={18} /> Transmit
                  </span>
                </button>
              </form>
            </div>
          </ScrollRevealWrapper>

          <div className="mt-12 flex justify-center gap-12 text-slate-500">
             <div className="flex flex-col items-center gap-2 hover:text-cyan-500 transition-colors cursor-pointer group">
               <Mail className="group-hover:animate-bounce" /> <span className="text-xs uppercase tracking-widest">Encrypted</span>
             </div>
             <div className="flex flex-col items-center gap-2 hover:text-cyan-500 transition-colors cursor-pointer group">
               <MapPin className="group-hover:animate-bounce" /> <span className="text-xs uppercase tracking-widest">Sector 7</span>
             </div>
             <div className="flex flex-col items-center gap-2 hover:text-cyan-500 transition-colors cursor-pointer group">
               <Phone className="group-hover:animate-bounce" /> <span className="text-xs uppercase tracking-widest">Uplink</span>
             </div>
          </div>
        </div>
      </section>

      

    </div>
  );
}

// Wrapper for Scroll Animations
function ScrollRevealWrapper({ children, direction = 'up', delay = 0 }) {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });
  
  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-20';
      case 'left': return '-translate-x-20';
      case 'right': return 'translate-x-20';
      default: return 'translate-y-20';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getTransform()}`}`}  
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}