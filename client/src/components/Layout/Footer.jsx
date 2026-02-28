import { Scale, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-auto">
      {/* Disclaimer Banner */}
      <div className="bg-maroon/90 text-cream text-center px-4 py-3">
        <p className="text-xs sm:text-sm max-w-4xl mx-auto leading-relaxed">
          <strong>⚖️ Disclaimer:</strong> This website is for awareness and
          educational purposes only. Outputs are AI-generated approximations and
          do not constitute legal advice. Dowry is a punishable offense under
          Indian law.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-charcoal" />
              </div>
              <span className="text-lg font-bold text-cream">
                Reality Check
              </span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed">
              An AI-powered educational platform raising awareness about social
              and legal realities around marriage finances in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dowry-awareness"
                  className="text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  Dowry Awareness Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/alimony-estimator"
                  className="text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  Alimony Estimator
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-awareness"
                  className="text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  Legal Awareness
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpline */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-3 uppercase tracking-wider">
              Emergency Helplines
            </h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>Women Helpline: <span className="text-gold font-medium">181</span></li>
              <li>Police: <span className="text-gold font-medium">100 / 112</span></li>
              <li>NCW: <span className="text-gold font-medium">7827-170-170</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-8 pt-6 text-center">
          <p className="text-xs text-cream/40">
            Made with <Heart className="w-3 h-3 inline text-maroon-light" /> for awareness &amp; education
            &nbsp;•&nbsp; © {new Date().getFullYear()} Reality Check
          </p>
        </div>
      </div>
    </footer>
  );
}
