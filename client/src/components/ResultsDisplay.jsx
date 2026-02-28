import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AlertTriangle, TrendingUp, Info, Shield } from "lucide-react";

const CHART_COLORS = [
  "#800020",
  "#A0334D",
  "#C5A55A",
  "#D4BC7C",
  "#9E8340",
  "#5C0018",
  "#8B8178",
];

function formatCurrency(num) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
}

export default function ResultsDisplay({
  type,
  data,
  onReset,
}) {
  if (!data) return null;

  const isAlimony = type === "alimony";
  const range = isAlimony ? data.estimatedMonthlyRange : data.estimatedRange;
  const factors = data.factors || [];

  const chartData = factors.map((f) => ({
    name: f.name,
    contribution: f.contribution,
    impact: f.impact,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Awareness Banner */}
      <div className="bg-gradient-to-r from-maroon/10 to-gold/10 border border-maroon/20 rounded-2xl p-5 flex items-start gap-3">
        <Shield className="w-6 h-6 text-maroon shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-maroon mb-1">
            {isAlimony ? "Educational Information Only" : "Anti-Dowry Awareness"}
          </p>
          <p className="text-sm text-charcoal-light leading-relaxed">
            {isAlimony
              ? data.disclaimer
              : data.awarenessMessage}
          </p>
        </div>
      </div>

      {/* Estimated Range Card */}
      <div className="card-flat text-center">
        <p className="text-sm text-warm-gray mb-2 uppercase tracking-wider font-medium">
          {isAlimony
            ? "Estimated Monthly Maintenance Range"
            : "Estimated Social Expectation Range"}
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-maroon">
            {formatCurrency(range?.low || 0)}
          </span>
          <TrendingUp className="w-6 h-6 text-gold" />
          <span className="text-2xl sm:text-3xl font-bold text-maroon">
            {formatCurrency(range?.high || 0)}
          </span>
        </div>
        {isAlimony && (
          <p className="text-xs text-warm-gray">Per month (approximate)</p>
        )}
      </div>

      {/* Factor Contribution Chart */}
      {chartData.length > 0 && (
        <div className="card-flat">
          <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-gold" />
            Factor Contribution Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE0" />
                <XAxis
                  type="number"
                  domain={[0, "auto"]}
                  tick={{ fontSize: 12, fill: "#8B8178" }}
                  unit="%"
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fontSize: 11, fill: "#4A4A4A" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #F5EDE0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Contribution"]}
                />
                <Bar dataKey="contribution" radius={[0, 6, 6, 0]} barSize={20}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Factor Details */}
      <div className="card-flat">
        <h3 className="text-lg font-bold text-charcoal mb-4">
          Detailed Factor Breakdown
        </h3>
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-cream/40 border border-cream-dark/30"
            >
              <div
                className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                style={{
                  backgroundColor:
                    CHART_COLORS[index % CHART_COLORS.length],
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-charcoal">
                    {factor.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      factor.impact === "high"
                        ? "bg-maroon/10 text-maroon"
                        : factor.impact === "medium"
                        ? "bg-gold/20 text-gold-dark"
                        : "bg-cream-dark text-warm-gray"
                    }`}
                  >
                    {factor.impact} impact
                  </span>
                </div>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  {factor.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context / Legal Basis */}
      <div className="card-flat bg-gradient-to-br from-cream/50 to-warm-white">
        <h3 className="text-lg font-bold text-charcoal mb-3">
          {isAlimony ? "Legal Basis" : "Social Context"}
        </h3>
        <p className="text-sm text-charcoal-light leading-relaxed">
          {isAlimony ? data.legalBasis : data.socialContext}
        </p>
      </div>

      {/* Legal Reminder / Court Discretion */}
      <div className="bg-maroon/5 border border-maroon/15 rounded-2xl p-5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
        <p className="text-sm text-charcoal-light leading-relaxed">
          {isAlimony ? data.courtDiscretion : data.legalReminder}
        </p>
      </div>

      {/* Reset Button */}
      <div className="text-center pt-2">
        <button onClick={onReset} className="btn-secondary">
          Start Over
        </button>
      </div>
    </motion.div>
  );
}
