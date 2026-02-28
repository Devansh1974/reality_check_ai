import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  User,
  GraduationCap,
  Briefcase,
  Building2,
  MapPin,
  Users,
  Heart,
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import StepIndicator from "../components/FormWizard/StepIndicator";
import ResultsDisplay from "../components/ResultsDisplay";

const steps = ["Groom Details", "Assets & Location", "Bride & Wedding", "Results"];

const educationOptions = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Professional Degree (CA, MBBS, LLB, etc.)",
];

const professionOptions = [
  "Government Job",
  "Private Sector - Entry Level",
  "Private Sector - Mid Level",
  "Private Sector - Senior Level",
  "Business Owner",
  "Self-Employed / Freelancer",
  "Doctor / Medical Professional",
  "Engineer (IT / Software)",
  "Lawyer / Legal Professional",
  "IAS / IPS / Civil Services",
  "Armed Forces",
  "Farmer / Agriculture",
  "Daily Wage Worker",
  "Unemployed",
  "Other",
];

const cityTierOptions = [
  "Tier 1 (Metro - Delhi, Mumbai, Bangalore, etc.)",
  "Tier 2 (Pune, Jaipur, Lucknow, etc.)",
  "Tier 3 (Smaller cities)",
  "Rural / Village",
];

const familyBgOptions = [
  "Upper Class / Affluent",
  "Upper Middle Class",
  "Middle Class",
  "Lower Middle Class",
  "Economically Weaker Section",
];

const weddingScaleOptions = [
  "Grand / Lavish (₹50L+)",
  "Upper Standard (₹20-50L)",
  "Standard (₹5-20L)",
  "Simple / Budget (Under ₹5L)",
  "Court Marriage",
];

export default function DowryAwareness() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    groomAge: "",
    groomEducation: "",
    groomProfession: "",
    groomIncome: "",
    groomAssets: "",
    cityTier: "",
    familyBackground: "",
    brideEducation: "",
    brideIncome: "",
    weddingScale: "",
    dependents: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const response = await axios.post(
        `${BASE_URL}/api/calculate/dowry-awareness`,
        formData
      );
      if (response.data.success) {
        setResults(response.data.data);
        setCurrentStep(3);
      } else {
        setError("Failed to generate analysis. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      groomAge: "",
      groomEducation: "",
      groomProfession: "",
      groomIncome: "",
      groomAssets: "",
      cityTier: "",
      familyBackground: "",
      brideEducation: "",
      brideIncome: "",
      weddingScale: "",
      dependents: "",
    });
    setResults(null);
    setCurrentStep(0);
    setError("");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.groomAge && formData.groomEducation && formData.groomProfession && formData.groomIncome;
      case 1:
        return formData.cityTier && formData.familyBackground;
      case 2:
        return formData.weddingScale;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-white to-cream-dark py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="section-title mb-2">Dowry Awareness Calculator</h1>
          <p className="text-charcoal-light text-sm max-w-xl mx-auto">
            This tool analyzes how societal biases create unfair expectations. It
            does <strong>not</strong> promote or calculate dowry.
          </p>
        </motion.div>

        {/* Awareness Banner */}
        <div className="awareness-banner mb-8 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
          <span>
            <strong>Remember:</strong> Dowry is a criminal offense under Indian law.
            This analysis is for educational purposes only.
          </span>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <div className="card-flat">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                  <User className="w-5 h-5 text-maroon" />
                  Groom Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Age *</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 28"
                      value={formData.groomAge}
                      onChange={(e) => updateField("groomAge", e.target.value)}
                      min="18"
                      max="70"
                    />
                  </div>
                  <div>
                    <label className="label-text">Annual Income (₹) *</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 1000000"
                      value={formData.groomIncome}
                      onChange={(e) => updateField("groomIncome", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">Education Level *</label>
                  <select
                    className="select-field"
                    value={formData.groomEducation}
                    onChange={(e) => updateField("groomEducation", e.target.value)}
                  >
                    <option value="">Select education level</option>
                    {educationOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-text">Profession *</label>
                  <select
                    className="select-field"
                    value={formData.groomProfession}
                    onChange={(e) => updateField("groomProfession", e.target.value)}
                  >
                    <option value="">Select profession</option>
                    {professionOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-maroon" />
                  Assets & Location
                </h2>

                <div>
                  <label className="label-text">Assets (Land, House, Investments)</label>
                  <textarea
                    className="input-field min-h-[80px]"
                    placeholder="e.g., 2BHK flat in Pune, 1 acre farmland, ₹10L in mutual funds"
                    value={formData.groomAssets}
                    onChange={(e) => updateField("groomAssets", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-text">City / Location Tier *</label>
                  <select
                    className="select-field"
                    value={formData.cityTier}
                    onChange={(e) => updateField("cityTier", e.target.value)}
                  >
                    <option value="">Select city tier</option>
                    {cityTierOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-text">Family Background *</label>
                  <select
                    className="select-field"
                    value={formData.familyBackground}
                    onChange={(e) => updateField("familyBackground", e.target.value)}
                  >
                    <option value="">Select family background</option>
                    {familyBgOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-text">Number of Dependents</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 2"
                    value={formData.dependents}
                    onChange={(e) => updateField("dependents", e.target.value)}
                    min="0"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                  <Heart className="w-5 h-5 text-maroon" />
                  Bride Details & Wedding
                </h2>

                <div>
                  <label className="label-text">Bride's Education (Optional)</label>
                  <select
                    className="select-field"
                    value={formData.brideEducation}
                    onChange={(e) => updateField("brideEducation", e.target.value)}
                  >
                    <option value="">Select education level</option>
                    {educationOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-text">Bride's Annual Income (Optional)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 500000"
                    value={formData.brideIncome}
                    onChange={(e) => updateField("brideIncome", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-text">Wedding Scale *</label>
                  <select
                    className="select-field"
                    value={formData.weddingScale}
                    onChange={(e) => updateField("weddingScale", e.target.value)}
                  >
                    <option value="">Select wedding scale</option>
                    {weddingScaleOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && results && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ResultsDisplay
                  type="dowry"
                  data={results}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-dark/30">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  currentStep === 0
                    ? "text-warm-gray cursor-not-allowed"
                    : "text-maroon hover:bg-maroon/5"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 ${
                    canProceed() ? "btn-primary" : "bg-cream-dark text-warm-gray px-6 py-3 rounded-xl cursor-not-allowed"
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className={`flex items-center gap-2 ${
                    canProceed() && !isLoading
                      ? "btn-primary"
                      : "bg-cream-dark text-warm-gray px-6 py-3 rounded-xl cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Analysis
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
