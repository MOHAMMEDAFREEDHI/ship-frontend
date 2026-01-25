import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide text-white">
          SHIP<span className="text-accent">YARD</span>
        </h1>

        <ul className="flex gap-8 text-sm text-steel">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
