export default function ProjectCard({ title, desc }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 hover:scale-105 transition">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-steel">{desc}</p>
    </div>
  );
}
