import React, { useState, useEffect, useRef } from "react";
import { Award, Users, Globe, Shield, Target, Anchor, CheckCircle, Sparkles } from "lucide-react";

// --- HOOKS & UTILS ---

// Custom hook for scroll animations (Fade In Up)
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update state based on intersection (allows re-animation)
          setIsVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return [domRef, isVisible];
};

// Wrapper component for animated sections
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) transform will-change-transform ${
        isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle, align = "center", theme = "dark" }) => {
  const isDark = theme === "dark";
  // Replacing Blue with Rose/Red logic
  return (
    <div className={`text-${align} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-12 relative z-10`}>
      <h2 className={`font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center justify-center gap-2 ${isDark ? 'text-amber-500' : 'text-rose-600'}`}>
        <span className={`w-8 h-px ${isDark ? 'bg-amber-500/50' : 'bg-rose-600/30'}`}></span>
        {title === "About ShipPro" ? "Our Identity" : "Discover More"}
        <span className={`w-8 h-px ${isDark ? 'bg-amber-500/50' : 'bg-rose-600/30'}`}></span>
      </h2>
      <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl leading-relaxed font-light ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-32 mt-8 rounded-full bg-gradient-to-r from-transparent ${isDark ? 'via-amber-500' : 'via-rose-600'} to-transparent opacity-80 ${align === 'center' ? 'mx-auto' : ''} animate-pulse`}></div>
    </div>
  );
};

// --- GALLERY COMPONENT (Spread Effect) ---
const GallerySpread = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const images = [
    { src: "https://images.unsplash.com/photo-1545560965-055c65306654?auto=format&fit=crop&q=80", title: "Aerial Operations" },
    { src: "https://images.unsplash.com/photo-1577149004698-174052dcbb32?auto=format&fit=crop&q=80", title: "Container Yards" },
    { src: "https://images.unsplash.com/photo-1494412574643-35d324698428?auto=format&fit=crop&q=80", title: "Flagship Vessels" },
    { src: "https://images.unsplash.com/photo-1569018987179-8d5f3073740e?auto=format&fit=crop&q=80", title: "Heavy Machinery" },
    { src: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80", title: "Logistics Hubs" },
  ];

  return (
    <div ref={ref} className="relative h-[600px] w-full flex items-center justify-center perspective-1000">
      {images.map((img, index) => {
        // Calculate offset for fan effect
        // Center index is 2. 
        // 0 -> -2, 1 -> -1, 2 -> 0, 3 -> 1, 4 -> 2
        const offset = index - 2; 
        
        return (
          <div
            key={index}
            className={`absolute w-64 md:w-80 h-96 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/5 transition-all duration-[1500ms] cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer group hover:z-50 hover:scale-110 will-change-transform`}
            style={{
              // If visible: spread out. If not: stack in center with scaling down
              transform: isVisible 
                ? `translateX(${offset * 60}%) translateY(${Math.abs(offset) * 20}px) rotate(${offset * 5}deg)` 
                : `translateX(0) translateY(100px) scale(0.5) rotate(0deg)`,
              opacity: isVisible ? 1 : 0,
              zIndex: isVisible ? 10 - Math.abs(offset) : 0, // Center item on top
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="relative w-full h-full">
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover filter brightness-75 group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-lg tracking-wide uppercase">{img.title}</p>
                <div className="h-0.5 w-12 bg-rose-500 mt-2"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- MAIN PAGE ---

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative selection:bg-rose-500/30 selection:text-rose-900">
      
      {/* 1. HERO / INTRO SECTION (Obsidian & Gold) */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                alt="Global Network" 
                className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#050505]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
              <SectionTitle
                title="About ShipPro"
                subtitle="Excellence in marine engineering and global logistics since 1998."
                theme="dark"
              />
          </AnimatedSection>

          <div className="mt-24 flex flex-col lg:flex-row items-center gap-20">
            {/* Left: Image Grid */}
            <div className="lg:w-1/2 relative group perspective-1000">
               <AnimatedSection delay={200}>
                  <div className="relative z-10 transform transition-transform duration-1000 ease-out hover:rotate-y-3 hover:scale-[1.02]">
                      <div className="grid grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                          <img 
                              src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&q=80" 
                              alt="Ship Bow" 
                              className="w-full h-72 object-cover transform translate-y-12 scale-110 filter sepia-[.1] contrast-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-2xl mt-8">
                          <img 
                              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80" 
                              alt="Port Operations" 
                              className="w-full h-72 object-cover filter sepia-[.1] contrast-110"
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      </div>
                       {/* Gold Frame Element */}
                       <div className="absolute -inset-6 border border-amber-500/20 rounded-xl -z-10 animate-pulse"></div>
                  </div>
              </AnimatedSection>
            </div>

            {/* Right: Content */}
            <div className="lg:w-1/2">
               <AnimatedSection delay={400}>
                  <div className="inline-flex items-center gap-3 text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20 px-5 py-2 rounded-full mb-8 text-xs uppercase tracking-widest hover:bg-amber-500/20 transition-colors cursor-default">
                    <Anchor size={14} className="text-amber-400" />
                    <span>Our Mission</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                    Engineering the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Golden Standard</span>
                  </h3>
                  
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light border-l-2 border-amber-500/30 pl-6">
                    We specialize in advanced shipbuilding, naval architecture, and ocean engineering solutions. 
                    Built for <span className="text-white font-medium">durability</span>, <span className="text-white font-medium">performance</span>, and <span className="text-white font-medium">sustainability</span>.
                  </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (High Contrast - Rose/Crimson) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
         {/* Subtle pattern */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-slate-200">
            {[
              { label: "Years Experience", value: "25+" },
              { label: "Vessels Owned", value: "85" },
              { label: "Offices Worldwide", value: "42" },
              { label: "Team Members", value: "1.2k" },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 100} className="p-4 group">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 mb-3 group-hover:from-rose-600 group-hover:to-red-800 transition-all duration-500">{stat.value}</div>
                <div className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold group-hover:text-rose-600 transition-colors">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW GALLERY SECTION (Spread Transition) */}
      <section className="py-32 bg-[#0a0505] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
                <SectionTitle 
                    title="Global Fleet Gallery" 
                    subtitle="A glimpse into our world-class operations and machinery." 
                    theme="dark"
                />
            </AnimatedSection>
            
            {/* Gallery Component Rendered Here */}
            <div className="mt-16">
              <GallerySpread />
            </div>
         </div>
      </section>

      {/* 4. CORE VALUES (Crimson Void) */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0f0505] relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>
         {/* Ambient Crimson Glow */}
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-600/5 blur-[100px] rounded-full pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection>
                <SectionTitle 
                    title="Our Core Values" 
                    subtitle="The principles that guide every shipment we make." 
                    theme="dark"
                />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                {
                    icon: Shield,
                    title: "Safety First",
                    desc: "We prioritize the safety of our crew, cargo, and environment above all else, adhering to the strictest international standards."
                },
                {
                    icon: Target,
                    title: "Precision",
                    desc: "In logistics, timing is everything. Our automated systems ensure 99.9% accuracy in scheduling and delivery estimates."
                },
                {
                    icon: Globe,
                    title: "Sustainability",
                    desc: "We are committed to reducing our carbon footprint through eco-friendly fuel alternatives and optimized route planning."
                }
                ].map((value, i) => (
                <AnimatedSection key={i} delay={i * 200}>
                    <div className="group h-full bg-[#180a0a] p-10 rounded-2xl border border-white/5 hover:border-rose-500/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-xl">
                        
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-rose-600 group-hover:border-transparent transition-all duration-500 shadow-lg relative">
                                <value.icon className="text-slate-300 w-8 h-8 group-hover:text-white transition-colors duration-500 relative z-10" />
                                {/* Glow behind icon on hover */}
                                <div className="absolute inset-0 bg-rose-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">{value.title}</h4>
                            <p className="text-slate-400 leading-relaxed text-sm font-light group-hover:text-slate-300 transition-colors">{value.desc}</p>
                        </div>
                    </div>
                </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* 5. LEADERSHIP TEAM (Textured Off-White / Marble with Red Accents) */}
      <section className="py-32 relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <AnimatedSection>
              <SectionTitle 
                  title="Leadership Team" 
                  subtitle="Meet the experts behind our global operations." 
                  theme="light"
              />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
              {[
                { name: "Sarah Jenkins", role: "CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
                { name: "David Chen", role: "Head of Logistics", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
                { name: "Marcus Strom", role: "Chief Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" },
                { name: "Elena Rodriguez", role: "Ops Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" },
              ].map((member, i) => (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="group relative overflow-hidden rounded-lg cursor-pointer h-[450px] shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <h4 className="text-white font-bold text-2xl mb-1">{member.name}</h4>
                          <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-rose-500"></div>
                            <p className="text-rose-400 text-xs font-bold tracking-widest uppercase">{member.role}</p>
                          </div>
                      </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
      </section>

    </div>
  );
};

export default About;