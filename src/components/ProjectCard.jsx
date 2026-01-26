export default function ProjectCard({ title, desc }) {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/40 to-blue-600/40 hover:scale-[1.03] transition-transform duration-500">
      
      {/* Glass Card */}
      <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-xl p-8 border border-white/10 overflow-hidden">

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-blue-700/10"></div>

        {/* Fake Ship Image Placeholder */}
        <div className="h-40 mb-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center text-cyan-400 tracking-widest text-sm">
          SHIP MODEL
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm">
          {desc}
        </p>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition duration-500">
          <span>View Details</span>
          <span className="translate-x-0 group-hover:translate-x-2 transition">→</span>
        </div>
      </div>
    </div>
  );
}
