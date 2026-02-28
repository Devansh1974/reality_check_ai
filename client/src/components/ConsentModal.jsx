import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, ExternalLink } from "lucide-react";

export default function ConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("realitycheck_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("realitycheck_consent", "accepted");
    setIsVisible(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-maroon to-maroon-light p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-cream" />
              </div>
              <h2 className="text-2xl font-bold text-cream">
                Awareness Notice
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-charcoal-light leading-relaxed text-sm">
                This platform is created for{" "}
                <strong className="text-maroon">
                  educational and awareness purposes only
                </strong>
                .
              </p>

              <p className="text-charcoal-light leading-relaxed text-sm">
                All calculations are{" "}
                <strong>AI-generated approximations</strong> and not real-world
                recommendations or legal advice.
              </p>

              <div className="flex items-start gap-3 bg-gradient-to-r from-maroon/5 to-gold/5 border border-maroon/15 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-maroon">
                  Dowry is illegal under Indian law (Dowry Prohibition Act,
                  1961). This platform does not promote or encourage dowry in
                  any form.
                </p>
              </div>

              <p className="text-charcoal-light leading-relaxed text-sm">
                By continuing, you acknowledge and agree to use this platform
                responsibly.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                I Understand & Continue
              </button>
              <button
                onClick={handleExit}
                className="btn-secondary flex-1 text-center flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
