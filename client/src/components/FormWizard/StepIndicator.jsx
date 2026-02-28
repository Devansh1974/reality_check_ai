import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor:
                  index < currentStep
                    ? "#800020"
                    : index === currentStep
                    ? "#800020"
                    : "#F5EDE0",
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-sm ${
                index <= currentStep
                  ? "text-cream shadow-md"
                  : "text-warm-gray"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </motion.div>
            <span
              className={`text-xs mt-1.5 font-medium max-w-[80px] text-center leading-tight ${
                index <= currentStep ? "text-maroon" : "text-warm-gray"
              }`}
            >
              {step}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-12 sm:w-20 h-0.5 mx-1 sm:mx-2 mt-[-18px]">
              <motion.div
                initial={false}
                animate={{
                  scaleX: index < currentStep ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="h-full bg-maroon origin-left"
                style={{ transformOrigin: "left" }}
              />
              <div
                className={`h-full -mt-0.5 ${
                  index < currentStep ? "bg-maroon" : "bg-cream-dark"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
