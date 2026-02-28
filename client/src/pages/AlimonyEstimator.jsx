import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Clock,
  DollarSign,
  HeartPulse,
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Users,
  Briefcase,
} from "lucide-react";
import StepIndicator from "../components/FormWizard/StepIndicator";
import ResultsDisplay from "../components/ResultsDisplay";

const steps = ["Marriage Details", "Financials", "Additional Factors", "Results"];

const employmentOptions = [
  "Full-time Employed",
  "Part-time Employed",
  "Self-Employed",
  "Business Owner",
  "Government Employee",
  "Homemaker",
  "Unemployed",
  "Retired",
];

const livingStandardOptions = [
  "Luxury / Upper Class",
  "Upper Middle Class",
  "Middle Class",
  "Lower Middle Class",
  "Basic / Below Average",
];

export default function AlimonyEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    marriageDuration: "",
    children: "",
    childCustody: "",
    husbandIncome: "",
    wifeIncome: "",
    standardOfLiving: "",
    assets: "",
    liabilities: "",
    husbandEmployment: "",
    wifeEmployment: "",
    healthConditions: "",
    careerSacrifice: "",
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
        `${BASE_URL}/api/calculate/alimony`,
        formData
      );
      if (response.data.success) {
        setResults(response.data.data);
        setCurrentStep(3);
      } else {
        setError("Failed to generate estimation. Please try again.");
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
      marriageDuration: "",
      children: "",
      childCustody: "",
      husbandIncome: "",
      wifeIncome: "",
      standardOfLiving: "",
      assets: "",
      liabilities: "",
      husbandEmployment: "",
      wifeEmployment: "",
      healthConditions: "",
      careerSacrifice: "",
    });
    setResults(null);
    setCurrentStep(0);
    setError("");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.marriageDuration;
      case 1:
        return formData.husbandIncome;
      case 2:
        return true;
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
          <h1 className="section-title mb-2">Alimony / Maintenance Estimator</h1>
          <p className="text-charcoal-light text-sm max-w-xl mx-auto">
            Get an approximate estimation based on commonly known legal factors.
            This is <strong>not</strong> legal advice.
          </p>
        </motion.div>

        {/* Info Banner */}
        <div className="awareness-banner mb-8 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
          <span>
            <strong>Disclaimer:</strong> Actual maintenance is determined by courts.
            This tool provides educational estimates only.
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
                  <Clock className="w-5 h-5 text-maroon" />
                  Marriage Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Marriage Duration (Years) *</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 10"
                      value={formData.marriageDuration}
                      onChange={(e) => updateField("marriageDuration", e.target.value)}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="label-text">Number of Children</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 2"
                      value={formData.children}
                      onChange={(e) => updateField("children", e.target.value)}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">Child Custody Arrangement</label>
                  <select
                    className="select-field"
                    value={formData.childCustody}
                    onChange={(e) => updateField("childCustody", e.target.value)}
                  >
                    <option value="">Select arrangement</option>
                    <option value="Wife has full custody">Wife has full custody</option>
                    <option value="Husband has full custody">Husband has full custody</option>
                    <option value="Shared / Joint custody">Shared / Joint custody</option>
                    <option value="Not applicable">Not applicable</option>
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
                  <DollarSign className="w-5 h-5 text-maroon" />
                  Financial Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Husband's Monthly Income (₹) *</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 100000"
                      value={formData.husbandIncome}
                      onChange={(e) => updateField("husbandIncome", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Wife's Monthly Income (₹)</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 0"
                      value={formData.wifeIncome}
                      onChange={(e) => updateField("wifeIncome", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Husband's Employment</label>
                    <select
                      className="select-field"
                      value={formData.husbandEmployment}
                      onChange={(e) => updateField("husbandEmployment", e.target.value)}
                    >
                      <option value="">Select employment type</option>
                      {employmentOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Wife's Employment</label>
                    <select
                      className="select-field"
                      value={formData.wifeEmployment}
                      onChange={(e) => updateField("wifeEmployment", e.target.value)}
                    >
                      <option value="">Select employment type</option>
                      {employmentOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-text">Standard of Living During Marriage</label>
                  <select
                    className="select-field"
                    value={formData.standardOfLiving}
                    onChange={(e) => updateField("standardOfLiving", e.target.value)}
                  >
                    <option value="">Select standard</option>
                    {livingStandardOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Combined Assets</label>
                    <textarea
                      className="input-field min-h-[70px]"
                      placeholder="e.g., House worth ₹80L, Car, FDs worth ₹10L"
                      value={formData.assets}
                      onChange={(e) => updateField("assets", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Liabilities / Loans</label>
                    <textarea
                      className="input-field min-h-[70px]"
                      placeholder="e.g., Home loan ₹40L, Car loan ₹5L"
                      value={formData.liabilities}
                      onChange={(e) => updateField("liabilities", e.target.value)}
                    />
                  </div>
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
                  <HeartPulse className="w-5 h-5 text-maroon" />
                  Additional Factors
                </h2>

                <div>
                  <label className="label-text">Health Conditions (Either Spouse)</label>
                  <textarea
                    className="input-field min-h-[70px]"
                    placeholder="e.g., Wife has chronic illness requiring regular treatment"
                    value={formData.healthConditions}
                    onChange={(e) => updateField("healthConditions", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-text">Career Sacrifice by Wife</label>
                  <textarea
                    className="input-field min-h-[80px]"
                    placeholder="e.g., Left software engineering career to manage household for 8 years"
                    value={formData.careerSacrifice}
                    onChange={(e) => updateField("careerSacrifice", e.target.value)}
                  />
                </div>

                <div className="bg-cream/50 rounded-xl p-4 border border-cream-dark/30">
                  <p className="text-xs text-warm-gray leading-relaxed">
                    <strong>Note:</strong> These factors are commonly considered
                    by Indian courts when determining maintenance. Providing
                    detailed information leads to more accurate educational
                    estimates.
                  </p>
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
                  type="alimony"
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
                    canProceed()
                      ? "btn-primary"
                      : "bg-cream-dark text-warm-gray px-6 py-3 rounded-xl cursor-not-allowed"
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
                      Estimating...
                    </>
                  ) : (
                    <>
                      Generate Estimation
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
