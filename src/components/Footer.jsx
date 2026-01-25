import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-steel">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">
            SHIP<span className="text-accent">YARD</span>
          </h2>
          <p className="mt-4 text-sm">
            Engineering excellence in shipbuilding, naval architecture,
            and marine innovation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: contact@shipyard.com</p>
          <p className="text-sm mt-2">Phone: +91 9XXXXXXXXX</p>
        </div>

      </div>

      <div className="text-center text-xs text-steel py-4 border-t border-white/10">
        ©  ARCHITIDE MARINE SYSTEMS ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
