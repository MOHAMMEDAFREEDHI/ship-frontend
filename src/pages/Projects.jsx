import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Anchor, Radar, Zap, Shield, Wind, Navigation } from 'lucide-react';

// --- Custom Hook for Scroll Animations (Updated for "Coming and Going") ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state based on intersection - allows elements to animate in AND out
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible];
};

// --- Data: Premium Ship Projects ---
const projectsData = [
  {
    id: 1,
    title: "Spectre Stealth Frigate",
    category: "Defense",
    desc: "A radar-absorbent coastal defense vessel designed for rapid interception.",
    image: "https://images.unsplash.com/photo-1599557250669-e0705a325015?q=80&w=2670&auto=format&fit=crop",
    icon: <Shield className="w-5 h-5" />,
    stats: { speed: "55 Knots", range: "2000 NM" },
    colSpan: "md:col-span-8", // Wide
  },
  {
    id: 2,
    title: "Poseidon's Grace",
    category: "Luxury",
    desc: "120m mega-yacht with autonomous stabilization.",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2574&auto=format&fit=crop",
    icon: <Wind className="w-5 h-5" />,
    stats: { speed: "22 Knots", range: "Trans-Atlantic" },
    colSpan: "md:col-span-4", // Narrow
  },
  {
    id: 3,
    title: "Titan Hauler MK-IV",
    category: "Logistics",
    desc: "LNG-powered container ship with wind-assist propulsion.",
    image: "https://images.unsplash.com/photo-1574768343764-da328c057b52?q=80&w=2574&auto=format&fit=crop",
    icon: <Anchor className="w-5 h-5" />,
    stats: { speed: "18 Knots", capacity: "24k TEU" },
    colSpan: "md:col-span-4", // Narrow
  },
  {
    id: 4,
    title: "Arctic Pioneer",
    category: "Exploration",
    desc: "Nuclear-powered icebreaker for extreme polar expeditions.",
    image: "https://images.unsplash.com/photo-1542358894-39c2858b29f7?q=80&w=2600&auto=format&fit=crop",
    icon: <Navigation className="w-5 h-5" />,
    stats: { speed: "15 Knots", ice: "3.5m Thick" },
    colSpan: "md:col-span-8", // Wide
  },
  {
    id: 5,
    title: "Aeolus Trimaran",
    category: "Racing",
    desc: "Carbon-fiber hydrofoiling racer minimizing drag.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
    icon: <Zap className="w-5 h-5" />,
    stats: { speed: "65 Knots", hull: "Carbon" },
    colSpan: "md:col-span-6", // Half
  },
  {
    id: 6,
    title: "Deep Blue Observer",
    category: "Research",
    desc: "Advanced sonar vessel for Mariana Trench mapping.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    icon: <Radar className="w-5 h-5" />,
    stats: { depth: "11,000m", crew: "45 Sci" },
    colSpan: "md:col-span-6", // Half
  },
];

// --- Sub-Component: Section Title ---
const SectionTitle = ({ title, subtitle }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div 
      ref={ref} 
      className={`text-center mb-24 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-20 scale-95 blur-sm'}`}
    >
      <div className="inline-flex items-center gap-3 mb-6 px-4 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
        <span className="text-cyan-400 text-xs font-mono uppercase tracking-[0.2em]">System Online</span>
      </div>
      <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-8 tracking-tighter uppercase">
        {title}
      </h2>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

// --- Sub-Component: Tactical Card (New Design) ---
const TacticalCard = ({ project, index }) => {
  // Lower threshold so it triggers earlier, "coming" into view
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  
  return (
    <div 
      ref={ref}
      // Removed fixed delay to make scroll interaction more responsive
      className={`
        ${project.colSpan} relative h-[400px] md:h-[500px] group cursor-pointer
        transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] transform
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100 rotate-0 filter-none' 
          : 'opacity-0 translate-y-32 scale-90 rotate-1 blur-sm'}
      `}
    >
      {/* 1. Main Container Shape & Image */}
      <div className="absolute inset-0 bg-[#0a111e] overflow-hidden clip-path-stealth">
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/60 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>

        {/* Scan Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
      </div>

      {/* 2. HUD Border Elements (The "Frame") */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex justify-between items-start opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          {/* Top Left Bracket */}
          <div className="w-16 h-16 border-t border-l border-cyan-500/30 group-hover:border-cyan-400 relative">
             <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 shadow-[0_0_10px_cyan]"></div>
          </div>
          
          {/* Top Right - ID Number */}
          <div className="font-mono text-xs text-cyan-500/70 tracking-widest bg-black/50 backdrop-blur-md px-2 py-1 border border-cyan-900/50">
            PRJ-0{project.id} // <span className="text-white">CLASSIFIED</span>
          </div>
        </div>

        {/* Bottom Bar (Content Container) */}
        <div className="flex justify-between items-end">
          {/* Bottom Left Bracket */}
          <div className="w-16 h-16 border-b border-l border-cyan-500/30 group-hover:border-cyan-400 relative transition-colors duration-300">
             <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400 shadow-[0_0_10px_cyan]"></div>
          </div>
          
          {/* Bottom Right - Action Icon */}
          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="bg-cyan-500/10 p-3 rounded-full border border-cyan-500/30 text-cyan-400 backdrop-blur-md">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {/* Category Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded bg-cyan-900/40 border border-cyan-500/20 text-cyan-400">
            {project.icon}
          </span>
          <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-50 transition-colors">
          {project.title}
        </h3>

        {/* Hidden Description & Stats (Reveal on Hover) */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <p className="text-slate-400 text-sm md:text-base mt-4 mb-6 leading-relaxed max-w-lg">
              {project.desc}
            </p>
            
            {/* Tech Specs */}
            <div className="flex gap-6 border-t border-white/10 pt-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">{key}</div>
                  <div className="text-white font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Component ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#02060c] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Global CSS for custom animations & shapes */}
      <style>{`
        /* Custom Clip Path for 'Stealth' look */
        .clip-path-stealth {
           /* No clip by default to fill space, or subtle angled corners */
        }
        
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }

        .bg-grid-pattern {
          background-image: linear-gradient(to right, #1e293b 1px, transparent 1px),
                           linear-gradient(to bottom, #1e293b 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
        }
      `}</style>

      {/* Background Ambience - Updated for seamless top-to-bottom feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#02060c]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-[#050b14] to-[#02060c]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      </div>

      <section className="relative pt-32 pb-40 px-4 md:px-8 z-10 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <SectionTitle 
          title="Naval Architecture" 
          subtitle="A collection of elite maritime projects engineered for extreme environments and tactical superiority." 
        />

        {/* Mosaic Grid Layout (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-12">
          {projectsData.map((project, index) => (
            <TacticalCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer / Status Bar */}
        <div className="mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            System Status: Operational
          </div>
          <div className="mt-4 md:mt-0">
            Encrypted Connection // Auth: Level 4
          </div>
        </div>

      </section>
    </div>
  );
}