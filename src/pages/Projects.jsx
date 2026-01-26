import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Anchor, Radar, Zap, Shield, Wind, Navigation, Crosshair, Target } from 'lucide-react';

// --- Data: Elite Ship Projects ---
const projectsData = [
  {
    id: "01",
    title: "Spectre Stealth Frigate",
    category: "Coastal Defense",
    desc: "A radar-absorbent masterpiece designed for silent interception. Features an angular hull geometry that deflects sonar and radar waves.",
    image: "https://images.unsplash.com/photo-1599557250669-e0705a325015?q=80&w=2670&auto=format&fit=crop",
    stats: { speed: "55 Knots", range: "2000 NM", stealth: "Active" },
    accent: "text-cyan-400",
    bgGradient: "from-cyan-900/40"
  },
  {
    id: "02",
    title: "Poseidon's Grace",
    category: "Ultra-Luxury",
    desc: "The pinnacle of oceanic leisure. This 120m mega-yacht features a helipad, submersible garage, and AI-driven stabilization for zero-roll comfort.",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2574&auto=format&fit=crop",
    stats: { speed: "22 Knots", decks: "4 Levels", crew: "60" },
    accent: "text-amber-200",
    bgGradient: "from-amber-900/40"
  },
  {
    id: "03",
    title: "Titan Hauler MK-IV",
    category: "Green Logistics",
    desc: "Next-gen LNG-powered container ship utilizing massive automated sails to harness wind power, reducing carbon footprint by 40%.",
    image: "https://images.unsplash.com/photo-1574768343764-da328c057b52?q=80&w=2574&auto=format&fit=crop",
    stats: { capacity: "24k TEU", power: "Hybrid", length: "400m" },
    accent: "text-emerald-400",
    bgGradient: "from-emerald-900/40"
  },
  {
    id: "04",
    title: "Arctic Pioneer",
    category: "Polar Exploration",
    desc: "Nuclear-powered icebreaker capable of crushing 3-meter thick ice sheets. Designed to forge paths for scientific research in the frozen north.",
    image: "https://images.unsplash.com/photo-1542358894-39c2858b29f7?q=80&w=2600&auto=format&fit=crop",
    stats: { hull: "Reinforced", temp: "-60°C", power: "Nuclear" },
    accent: "text-blue-300",
    bgGradient: "from-blue-900/40"
  },
  {
    id: "05",
    title: "Deep Blue Observer",
    category: "Abyssal Research",
    desc: "Advanced submersible launch platform equipped with multi-spectrum sonar for mapping the deepest trenches of the Mariana.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    stats: { depth: "11,000m", sensors: "LIDAR", comms: "VLF" },
    accent: "text-indigo-400",
    bgGradient: "from-indigo-900/40"
  },
];

// --- Component: Sticky Project Card ---
const StickyCard = ({ project, index, total }) => {
  // Use simple CSS sticky positioning for the "stacking" effect
  // Top offset creates a slight cascading stack visual if desired, or keep it 0 for full overlay
  const topOffset = 0; 
  
  return (
    <div 
      className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* Container Frame */}
      <div className="relative w-full h-full bg-[#050b14] overflow-hidden flex flex-col md:flex-row shadow-[0_-50px_100px_rgba(0,0,0,0.7)]">
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} to-black opacity-30 animate-pulse-slow`}></div>

        {/* --- LEFT: Image Section (Parallax Window) --- */}
        <div className="relative w-full md:w-3/5 h-[50vh] md:h-full overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
          
          {/* Image with Scale Effect on Hover */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
          />
          
          {/* Decorative Overlay UI */}
          <div className="absolute top-8 left-8 z-20 flex gap-2">
            <div className="h-[2px] w-12 bg-white/50"></div>
            <span className="text-xs font-mono text-white/70 tracking-widest uppercase">Cam-0{index + 1} // Live Feed</span>
          </div>

          <div className="absolute bottom-0 right-0 p-8 z-20 hidden md:block">
            <div className="w-24 h-24 border-r border-b border-white/20 rounded-br-3xl"></div>
          </div>
        </div>

        {/* --- RIGHT: Content Section --- */}
        <div className="relative w-full md:w-2/5 h-[50vh] md:h-full p-8 md:p-16 flex flex-col justify-center bg-[#050b14]/95 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/5">
          
          {/* Background Big Number */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 md:mr-4 md:mt-4 text-[120px] md:text-[200px] font-black text-white/5 select-none leading-none font-mono">
            {project.id}
          </div>

          {/* Header Info */}
          <div className="relative z-10 mb-auto">
            <div className={`flex items-center gap-3 mb-4 ${project.accent}`}>
              <Target className="w-5 h-5 animate-spin-slow" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase">{project.category}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tight mb-6 uppercase">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
          </div>

          {/* Description */}
          <div className="relative z-10 mb-12">
            <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-white/10 pl-6">
              {project.desc}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key}>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{key}</div>
                <div className={`text-lg font-medium ${project.accent} font-mono`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="relative z-10 mt-auto pt-8 flex items-center justify-between">
             <button className="group flex items-center gap-4 text-white hover:text-cyan-400 transition-colors">
                <span className="uppercase text-sm font-bold tracking-widest border-b border-transparent group-hover:border-cyan-400 pb-1">Initialize</span>
                <div className="p-2 border border-white/20 rounded-full group-hover:border-cyan-400 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
             
             {/* Progress Indicator */}
             <div className="text-xs font-mono text-slate-600">
               {index + 1} / {total}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-[#020408] text-white font-sans selection:bg-cyan-500/30">
      
      {/* Global Styles for Custom Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020408; 
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #06b6d4; 
        }
      `}</style>

      {/* Intro / Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050b14] to-[#020408]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        
        <div className="text-center z-10 px-6">
          <div className="flex justify-center mb-6">
            <Anchor className="w-12 h-12 text-cyan-500 animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800">
            Trident
          </h1>
          <p className="text-xl md:text-2xl text-cyan-500/80 font-mono tracking-[0.5em] uppercase">
            Naval Engineering
          </p>
          <div className="mt-12 animate-pulse text-xs text-slate-500 uppercase tracking-widest">
            Scroll to Dive Deep
          </div>
          <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-500 to-transparent mx-auto mt-6"></div>
        </div>
      </section>

      {/* Sticky Project Stack Container */}
      <main className="relative">
        {projectsData.map((project, index) => (
          <StickyCard 
            key={project.id} 
            project={project} 
            index={index} 
            total={projectsData.length} 
          />
        ))}
      </main>

      {/* Footer */}
      <section className="h-[50vh] bg-[#020408] flex items-center justify-center relative z-50">
         <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-700 mb-4 uppercase">End of Transmission</h3>
            <button className="text-cyan-500 underline underline-offset-8 decoration-cyan-500/30 hover:decoration-cyan-500 transition-all">
              Return to Surface
            </button>
         </div>
      </section>

    </div>
  );
}