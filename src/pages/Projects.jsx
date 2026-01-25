import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
  return (
    <section className="min-h-screen pt-32 px-10">
      <SectionTitle
        title="Our Projects"
        subtitle="Ships built for extreme conditions"
      />

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <ProjectCard
          title="Naval Patrol Vessel"
          desc="High-speed defense vessel with advanced hull design."
        />
        <ProjectCard
          title="Luxury Yacht"
          desc="Precision-crafted yacht with elite performance."
        />
        <ProjectCard
          title="Cargo Ship"
          desc="Optimized for efficiency and long-range transport."
        />
      </div>
    </section>
  );
}
