import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
  return (
    <section className="relative min-h-screen pt-36 px-6 overflow-hidden bg-[#050b14]">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-700/20 blur-[120px] rounded-full"></div>

      {/* Section Title */}
      <SectionTitle
        title="Our Projects"
        subtitle="Ships engineered for extreme seas & elite performance"
      />

      {/* Projects Grid */}
      <div className="relative grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-20">
        <ProjectCard
          title="Naval Patrol Vessel"
          desc="High-speed tactical vessel built for coastal defense and rapid response."
        />
        <ProjectCard
          title="Luxury Yacht"
          desc="Ultra-premium yacht combining comfort, elegance, and raw power."
        />
        <ProjectCard
          title="Cargo Ship"
          desc="Next-gen logistics vessel optimized for fuel efficiency and endurance."
        />
      </div>
    </section>
  );
}
