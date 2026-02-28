import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Scale,
  Shield,
  Phone,
  ExternalLink,
  AlertTriangle,
  Gavel,
  Heart,
} from "lucide-react";

const legalSections = [
  {
    id: "dowry-prohibition",
    icon: Shield,
    title: "Dowry Prohibition Act, 1961",
    description:
      "The primary legislation that prohibits the giving or taking of dowry in India.",
    content: `The Dowry Prohibition Act was enacted in 1961 to curb the practice of dowry. Under this Act:

• **Definition of Dowry**: Any property or valuable security given or agreed to be given, directly or indirectly, by one party to another party in connection with the marriage.

• **Penalty for Giving or Taking Dowry (Section 3)**: Imprisonment for not less than 5 years and a fine of not less than ₹15,000 or the amount of dowry, whichever is more.

• **Penalty for Demanding Dowry (Section 4)**: Imprisonment for not less than 6 months, extendable up to 2 years, and a fine up to ₹10,000.

• **Agreements for Dowry (Section 5)**: Any agreement for giving or taking dowry is void.

• **Dowry to be for the Benefit of Wife (Section 6)**: Any dowry received must be transferred to the woman within 3 months of marriage, or it shall be held in trust for her benefit.`,
    punishment:
      "Minimum 5 years imprisonment and fine of ₹15,000 or dowry amount (whichever is more) for giving/taking dowry. 6 months to 2 years for demanding dowry.",
    awareness:
      "Dowry is not a tradition — it is a crime. Even accepting or giving dowry makes you liable under law. Report dowry demands immediately.",
  },
  {
    id: "ipc-498a",
    icon: Gavel,
    title: "IPC Section 498A — Cruelty by Husband or Relatives",
    description:
      "Protection against cruelty, harassment, and abuse by husband or in-laws.",
    content: `Section 498A of the Indian Penal Code deals with matrimonial cruelty:

• **What it Covers**: Any willful conduct that is likely to drive the woman to suicide or cause grave injury (physical or mental) to her life, limb, or health.

• **Dowry Harassment**: Harassment with the purpose of coercing the woman or her family to meet unlawful demands for property or valuable security.

• **Cognizable & Non-Bailable**: This is a cognizable offense (police can arrest without a warrant) and non-bailable.

• **Who Can File**: The aggrieved wife or her relatives can file a complaint.

• **Scope**: Covers physical abuse, mental torture, emotional harassment, and financial exploitation related to marriage.`,
    punishment:
      "Imprisonment up to 3 years and fine. It is a cognizable and non-bailable offense.",
    awareness:
      "No woman should suffer in silence. Cruelty — physical, mental, or financial — within marriage is a punishable offense. Seek help immediately.",
  },
  {
    id: "ipc-304b",
    icon: AlertTriangle,
    title: "IPC Section 304B — Dowry Death",
    description:
      "Deals with death of a woman within 7 years of marriage under suspicious circumstances.",
    content: `Section 304B addresses dowry death — one of the most serious offenses under Indian criminal law:

• **Definition**: When a woman dies within 7 years of marriage under unnatural circumstances, and it is shown that she was subjected to cruelty or harassment by her husband or in-laws in connection with dowry demands.

• **Presumption of Dowry Death**: If a woman's death occurs within 7 years of marriage and evidence shows dowry harassment, the court can presume it as a dowry death.

• **Burden of Proof**: The burden shifts to the accused to prove innocence.

• **Connection with Section 113B of the Evidence Act**: Creates a legal presumption that the husband or in-laws caused the death when circumstances indicate dowry harassment.`,
    punishment:
      "Minimum 7 years imprisonment, extendable to life imprisonment. This is a non-bailable and non-compoundable offense.",
    awareness:
      "Every year, thousands of women die due to dowry-related violence. If you know someone facing dowry harassment, help them seek legal protection before it's too late.",
  },
  {
    id: "hma-24-25",
    icon: Scale,
    title: "Hindu Marriage Act — Sections 24 & 25 (Maintenance)",
    description:
      "Provisions for interim and permanent maintenance during and after marriage proceedings.",
    content: `The Hindu Marriage Act provides for maintenance of spouses:

**Section 24 — Maintenance Pendente Lite (During Proceedings)**:
• Either spouse can claim maintenance during ongoing divorce/judicial separation proceedings.
• The court considers the income and property of both parties.
• Includes maintenance for litigation expenses.

**Section 25 — Permanent Alimony and Maintenance**:
• After a decree of divorce or judicial separation, either party may apply for permanent maintenance.
• The court considers: income, property, conduct of parties, standard of living, and other circumstances.
• Can be granted as a lump sum or monthly payments.
• Can be modified if circumstances change.
• Ceases upon remarriage of the party receiving maintenance.`,
    punishment: "Not an offense-based section. These are rights-based provisions for financial support.",
    awareness:
      "Both men and women can claim maintenance under these provisions. The law aims to ensure financial fairness after marriage dissolution.",
  },
  {
    id: "crpc-125",
    icon: BookOpen,
    title: "CrPC Section 125 — Maintenance of Wives, Children & Parents",
    description:
      "A secular provision for maintenance available to all religions and communities.",
    content: `Section 125 of the Code of Criminal Procedure provides maintenance rights:

• **Who Can Claim**: Wife (including divorced wife who hasn't remarried), legitimate/illegitimate minor children, and parents unable to maintain themselves.

• **Applicability**: Secular provision — applies to all religions, castes, and communities in India.

• **Conditions**: The person from whom maintenance is claimed must have sufficient means and must have neglected or refused to maintain.

• **Amount**: The magistrate determines a reasonable amount based on living standard, income, and needs.

• **Maximum Limit**: Monthly maintenance amount as the magistrate deems fit. There is no upper ceiling.

• **Enforcement**: Failure to pay can lead to warrant and imprisonment.`,
    punishment:
      "Non-payment of maintenance can lead to warrant, attachment of property, and imprisonment up to 1 month (or until payment is made).",
    awareness:
      "This is one of the most powerful maintenance provisions available to all women, regardless of religion. It ensures that no woman or child is left destitute.",
  },
  {
    id: "dva",
    icon: Heart,
    title: "Protection of Women from Domestic Violence Act, 2005",
    description:
      "Comprehensive protection against domestic violence including financial abuse.",
    content: `The DV Act provides broad protection to women in domestic relationships:

• **Types of Violence Covered**:
  - Physical abuse (beating, slapping, etc.)
  - Sexual abuse
  - Verbal and emotional abuse (insults, humiliation, threats)
  - Economic/Financial abuse (deprivation of resources, prohibition from employment)

• **Financial Relief (Section 20)**:
  - Compensation for injuries, medical expenses, loss of earnings
  - Maintenance for the woman and her children
  - Damage to property caused by the respondent

• **Protection Orders**: Court can issue orders restraining the abuser from committing violence, entering the home, or contacting the victim.

• **Right to Residence (Section 17)**: Every woman has the right to reside in the shared household regardless of her ownership rights.

• **Who Can File**: Any woman who is or has been in a domestic relationship — includes wives, live-in partners, sisters, mothers, etc.`,
    punishment:
      "Breach of protection order: imprisonment up to 1 year and/or fine up to ₹20,000. The Act also enables civil remedies like protection orders, residence orders, and monetary relief.",
    awareness:
      "Domestic violence is not just physical — it includes emotional, verbal, sexual, and financial abuse. The DV Act gives comprehensive protection. You don't need to suffer in silence.",
  },
];

const helplines = [
  {
    name: "Women Helpline",
    number: "181",
    description: "24/7 toll-free helpline for women in distress",
    urgent: true,
  },
  {
    name: "Police Emergency",
    number: "100 / 112",
    description: "For immediate police assistance",
    urgent: true,
  },
  {
    name: "National Commission for Women (NCW)",
    number: "7827-170-170",
    description: "File complaints with NCW via phone or online portal",
    link: "http://ncw.nic.in/",
  },
  {
    name: "One Stop Centre (Sakhi)",
    number: "181",
    description:
      "Integrated support for women affected by violence — shelter, legal aid, medical help",
  },
  {
    name: "Legal Aid (NALSA)",
    number: "15100",
    description:
      "Free legal services for women and economically weaker sections",
    link: "https://nalsa.gov.in/",
  },
  {
    name: "Cyber Crime Helpline",
    number: "1930",
    description: "For online harassment, blackmail, and cyber crimes",
    link: "https://cybercrime.gov.in/",
  },
  {
    name: "Domestic Violence Helpline",
    number: "181 / 1091",
    description: "Report domestic violence and seek immediate protection",
  },
  {
    name: "NCW Online Complaint Portal",
    number: "Online",
    description: "File complaints online through the National Commission for Women",
    link: "http://ncwapps.nic.in/onlinecomplaintsv2/",
  },
];

function LegalSection({ section }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <motion.div
      layout
      className="card-flat overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-maroon to-maroon-light rounded-xl flex items-center justify-center shrink-0 shadow-md">
          <Icon className="w-6 h-6 text-cream" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-charcoal mb-1 pr-8">
            {section.title}
          </h3>
          <p className="text-sm text-charcoal-light">{section.description}</p>
        </div>
        <div className="shrink-0 mt-1">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-maroon" />
          ) : (
            <ChevronDown className="w-5 h-5 text-warm-gray" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5 border-t border-cream-dark/30 space-y-4">
              {/* Content */}
              <div className="prose prose-sm max-w-none">
                {section.content.split("\n").map((line, i) => {
                  if (line.trim().startsWith("**") && line.trim().endsWith("**:")) {
                    return (
                      <h4
                        key={i}
                        className="text-sm font-bold text-maroon mt-3 mb-1"
                      >
                        {line.replace(/\*\*/g, "").replace(/:$/, "")}
                      </h4>
                    );
                  }
                  if (line.trim().startsWith("•")) {
                    const text = line.replace("•", "").trim();
                    const parts = text.split("**");
                    return (
                      <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                        <span className="text-maroon mt-1.5 text-xs">●</span>
                        <p className="text-sm text-charcoal-light leading-relaxed">
                          {parts.map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-charcoal">
                                {part}
                              </strong>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                          )}
                        </p>
                      </div>
                    );
                  }
                  if (line.trim().startsWith("- ")) {
                    return (
                      <div key={i} className="flex items-start gap-2 ml-6 mb-1">
                        <span className="text-gold mt-1.5 text-xs">◦</span>
                        <p className="text-sm text-charcoal-light">
                          {line.replace("- ", "").replace(/\(.*?\)/g, (m) => m)}
                        </p>
                      </div>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p
                        key={i}
                        className="text-sm text-charcoal-light leading-relaxed"
                      >
                        {line}
                      </p>
                    );
                  }
                  return <div key={i} className="h-2" />;
                })}
              </div>

              {/* Punishment */}
              <div className="bg-maroon/5 border border-maroon/15 rounded-xl p-4">
                <p className="text-xs font-semibold text-maroon uppercase tracking-wider mb-1">
                  Punishment / Penalty
                </p>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {section.punishment}
                </p>
              </div>

              {/* Awareness */}
              <div className="bg-gradient-to-r from-gold/10 to-saffron/10 border border-gold/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-1">
                  💡 Awareness Message
                </p>
                <p className="text-sm text-charcoal font-medium leading-relaxed">
                  {section.awareness}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LegalAwareness() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-white to-cream-dark py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="section-title mb-3">Legal Awareness</h1>
          <p className="text-charcoal-light max-w-2xl mx-auto text-sm">
            Know your rights. Understand the laws that protect you. Education is
            the first step toward empowerment.
          </p>
        </motion.div>

        {/* Legal Sections */}
        <div className="space-y-4 mb-12">
          {legalSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <LegalSection section={section} />
            </motion.div>
          ))}
        </div>

        {/* Helpline & Complaint Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-maroon to-maroon-dark rounded-3xl p-8 text-cream mb-8">
            <div className="text-center mb-8">
              <Phone className="w-10 h-10 text-saffron mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">
                Need Help? Contact These Helplines
              </h2>
              <p className="text-cream/70 text-sm max-w-xl mx-auto">
                If you or someone you know is facing domestic violence, dowry
                harassment, or any form of abuse, please reach out immediately.
                Help is available 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helplines.map((helpline, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 ${
                    helpline.urgent
                      ? "bg-white/15 border border-saffron/30"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{helpline.name}</h4>
                    {helpline.urgent && (
                      <span className="bg-saffron text-charcoal text-xs px-2 py-0.5 rounded-full font-bold">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-saffron mb-1">
                    {helpline.number}
                  </p>
                  <p className="text-xs text-cream/60 leading-relaxed">
                    {helpline.description}
                  </p>
                  {helpline.link && (
                    <a
                      href={helpline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-saffron-light hover:text-saffron mt-2 transition-colors"
                    >
                      Visit Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final Awareness Message */}
          <div className="card-flat text-center">
            <Shield className="w-8 h-8 text-maroon mx-auto mb-3" />
            <h3 className="font-bold text-charcoal mb-2">
              You Are Not Alone
            </h3>
            <p className="text-sm text-charcoal-light leading-relaxed max-w-lg mx-auto">
              If you or someone you know is a victim of dowry harassment,
              domestic violence, or any form of abuse — please reach out for
              help. The law is on your side. Report, resist, and reclaim your
              rights.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
