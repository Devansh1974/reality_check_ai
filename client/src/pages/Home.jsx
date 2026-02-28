import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scale,
  Calculator,
  BookOpen,
  Shield,
  ArrowRight,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Dowry Awareness Calculator",
    description:
      "Understand how socioeconomic factors create biased social expectations. An eye-opening analysis for awareness.",
    link: "/dowry-awareness",
    color: "from-maroon to-maroon-light",
    accent: "maroon",
  },
  {
    icon: Scale,
    title: "Alimony / Maintenance Estimator",
    description:
      "Learn about approximate maintenance ranges based on commonly known legal factors in Indian law.",
    link: "/alimony-estimator",
    color: "from-gold-dark to-gold",
    accent: "gold-dark",
  },
  {
    icon: BookOpen,
    title: "Legal Awareness",
    description:
      "Explore key Indian laws related to marriage, dowry, maintenance, and domestic violence.",
    link: "/legal-awareness",
    color: "from-charcoal to-charcoal-light",
    accent: "charcoal",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-warm-white to-cream-dark">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-maroon/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-saffron/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Awareness Platform
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Reality Check</span>
              <br />
              <span className="text-charcoal text-2xl sm:text-3xl md:text-4xl font-medium">
                Know the Truth. Break the Bias.
              </span>
            </h1>

            <p className="text-lg text-charcoal-light leading-relaxed mb-8 max-w-2xl mx-auto">
              An educational platform that uses AI to highlight how social biases
              and legal factors shape perceptions around marriage finances in
              India — empowering you with awareness, not recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dowry-awareness" className="btn-primary flex items-center gap-2">
                Explore Awareness Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/legal-awareness" className="btn-secondary flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Learn Your Rights
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anti-Dowry Banner */}
      <section className="bg-maroon text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-saffron shrink-0" />
            <p className="text-sm sm:text-base font-medium">
              Dowry is <strong>illegal</strong> under the Dowry Prohibition Act,
              1961. This platform exists to raise <strong>awareness</strong>,
              not to promote or calculate dowry.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="section-title mb-4">What This Platform Offers</h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              Three powerful tools designed to inform, educate, and empower.
              Every insight comes with context and awareness messaging.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  to={feature.link}
                  className="card group block h-full"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <feature.icon className="w-7 h-7 text-cream" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-maroon transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-maroon group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-16 bg-gradient-to-br from-cream to-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <Shield className="w-12 h-12 text-maroon mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
              Our Commitment
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-6">
              Reality Check is built with a clear anti-dowry stance. We believe
              that awareness is the first step towards change. Our AI-powered
              tools are designed to expose the unfairness of social expectations
              — not to normalize them.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Educational First", icon: "📚" },
                { label: "Anti-Dowry", icon: "🚫" },
                { label: "AI-Powered Insights", icon: "🤖" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card text-center py-4"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-sm font-semibold text-charcoal">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
