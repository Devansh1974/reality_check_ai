import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale, Shield } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dowry-awareness", label: "Dowry Awareness" },
  { path: "/alimony-estimator", label: "Alimony Estimator" },
  { path: "/legal-awareness", label: "Legal Awareness" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-cream-dark/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-maroon to-maroon-light rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Scale className="w-5 h-5 text-cream" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Reality Check
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-maroon/10 text-maroon"
                    : "text-charcoal-light hover:text-maroon hover:bg-maroon/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal-light hover:bg-cream-dark transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-dark/50 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "bg-maroon/10 text-maroon"
                    : "text-charcoal-light hover:text-maroon hover:bg-maroon/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
