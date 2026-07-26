"use client";

import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterBanner from "@/components/RegisterBanner";
import WaveDivider from "@/components/WaveDivider";
import IllustrationLayer from "@/components/IllustrationLayer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, CheckCircle2, AlertCircle, FileText, 
  ChevronRight, Laptop, Send, UserCheck, Shield 
} from "lucide-react";

// Form validation schema using Zod
const registrationSchema = z.object({
  leaderName: z.string().min(2, { message: "Team Leader Name must be at least 2 characters." }),
  college: z.string().min(5, { message: "College/Institution full name must be at least 5 characters." }),
  collegeId: z.string().min(3, { message: "College ID / Student ID / Roll Number is required." }),
  email: z.string().email({ message: "Please enter a valid official/institution email." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
});

type RegistrationFormFields = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegistrationFormFields>({
    leaderName: "",
    college: "",
    collegeId: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationFormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus("idle");
    setApiErrorMessage("");

    // Validate using Zod
    const validation = registrationSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof RegistrationFormFields, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof RegistrationFormFields] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.leaderName,
          email: formData.email,
          institution: formData.college,
          role: "PROCOMM Team Registrant",
          message: `College ID: ${formData.collegeId}\nPhone: ${formData.phone}`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          leaderName: "",
          college: "",
          collegeId: "",
          email: "",
          phone: "",
        });
        
        // Trigger success confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#c8923a", "#2a4030", "#ffffff"]
        });
      } else {
        setSubmitStatus("error");
        setApiErrorMessage(data.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setApiErrorMessage("A network error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: "Form Submission", desc: "Fill out your student details and official contacts." },
    { title: "Jury Screening", desc: "The expert panel evaluates team details and projects." },
    { title: "24-Hour Hack", desc: "Compete in the flagship 24-hour design and code sprint." },
    { title: "Grand Finale", desc: "Present final working prototypes physically at Saintgits." },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">
        
        {/* Banner Section */}
        <RegisterBanner />

        {/* 1. Registration Process Stepper */}
        <section className="py-20 px-6 select-text" style={{ backgroundColor: "var(--ivory)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Roadmap</span>
              <h2 className="editorial-headline mt-3">
                Registration Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 select-text">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className="organic-card hover-lift flex flex-col justify-between"
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    borderRadius: `${1.5 + (idx % 3) * 0.4}rem ${1 + (idx % 2) * 0.5}rem ${2 - (idx % 4) * 0.2}rem ${0.8 + (idx % 3) * 0.4}rem`
                  }}
                >
                  <div>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center font-mono-editorial text-xs font-bold mb-4" style={{ backgroundColor: "var(--moon)", border: "1.5px solid var(--paper-dark)", color: "var(--ochre)" }}>
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>{step.title}</h3>
                    <p className="font-body text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-mid)" }}>{step.desc}</p>
                  </div>
                  
                  {idx < 3 && (
                    <ChevronRight className="hidden sm:block absolute right-[-15px] top-[40%] w-6 h-6 text-retro-brown/40 z-10" style={{ color: "var(--paper-dark)" }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* Form & Sidebar Grid */}
        <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
          <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.1} />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            {/* Registration Form (Left side) */}
            <div 
              className="lg:col-span-8 organic-card hover-lift p-6 sm:p-10 relative select-text"
              style={{
                borderRadius: "2.5rem 1.8rem 2.2rem 1.5rem",
                backgroundColor: "var(--moon)",
                border: "1.5px solid var(--paper-dark)"
              }}
            >
              
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />

              {submitStatus === "success" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-retro-brown mb-4 stroke-[1.5]" style={{ color: "var(--moss)" }} />
                  <h3 className="font-display font-bold text-xl sm:text-2xl" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>
                    Registration Success!
                  </h3>
                  <p className="font-body text-sm mt-2 max-w-sm" style={{ color: "var(--ink-mid)" }}>
                    Your team details have been recorded. A confirmation email has been sent to the Team Leader. Please check your inbox for instructions to upload your project proposal PDF.
                  </p>
                  <motion.button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 px-5 py-2.5 btn-ochre cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Another Team
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
                  
                  {submitStatus === "error" && (
                    <div className="border-2 rounded-xl p-4 flex items-start gap-3" style={{ borderColor: "var(--rust)", backgroundColor: "rgba(184, 74, 42, 0.05)", color: "var(--rust)" }}>
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm font-body">
                        <span className="font-bold">Error:</span> {apiErrorMessage}
                      </div>
                    </div>
                  )}

                  {/* Leader Name & College Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="leaderName" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                        Team Leader Name
                      </label>
                      <input
                        type="text"
                        id="leaderName"
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="px-4 py-3 rounded-xl text-sm"
                        style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                        placeholder="Leader full name"
                      />
                      {errors.leaderName && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono-editorial">* {errors.leaderName}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="college" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                        College / Institution Full Name
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="px-4 py-3 rounded-xl text-sm"
                        style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                        placeholder="Saintgits College of Engineering"
                      />
                      {errors.college && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono-editorial">* {errors.college}</span>
                      )}
                    </div>
                  </div>

                  {/* College ID & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="collegeId" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                        College ID / Student ID / Roll Number
                      </label>
                      <input
                        type="text"
                        id="collegeId"
                        name="collegeId"
                        value={formData.collegeId}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="px-4 py-3 rounded-xl text-sm"
                        style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                        placeholder="e.g. SGI-UG-2026"
                      />
                      {errors.collegeId && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono-editorial">* {errors.collegeId}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                        Official / Leader Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="px-4 py-3 rounded-xl text-sm"
                        style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                        placeholder="leader@institution.edu"
                      />
                      {errors.email && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono-editorial">* {errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="px-4 py-3 rounded-xl text-sm"
                      style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono-editorial">* {errors.phone}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 px-6 py-4 btn-primary cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Registering..." : "Submit Registration"}</span>
                  </motion.button>

                </form>
              )}

            </div>

            {/* Sidebar (Right side) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Important Dates */}
              <div 
                className="organic-card hover-lift p-6"
                style={{
                  borderRadius: "1.8rem 1.2rem 1.5rem 1rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Calendar className="w-4 h-4" style={{ color: "var(--ochre)" }} />
                  Important Dates
                </h3>
                <div className="flex flex-col gap-3 font-body text-xs select-text" style={{ color: "var(--ink-mid)" }}>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Reg Closes:</span>
                    <span className="font-mono-editorial font-bold">Aug 25, 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Abstract Review:</span>
                    <span className="font-mono-editorial font-bold">Aug 28, 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Jury Presentations:</span>
                    <span className="font-mono-editorial font-bold">Sept 5-6, 2026</span>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.2rem 1.8rem 1rem 1.5rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <FileText className="w-4 h-4" style={{ color: "var(--moss)" }} />
                  Required Files
                </h3>
                <ul className="list-disc pl-4 font-body text-xs leading-relaxed flex flex-col gap-2" style={{ color: "var(--ink-mid)" }}>
                  <li>Valid Student ID card scans of all members.</li>
                  <li>IEEE/ComSoc membership card PDF (if applicable, for verification).</li>
                  <li>2-page project proposal in standard format.</li>
                </ul>
              </div>

              {/* Portal Info */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.5rem 1rem 1.8rem 1.2rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Laptop className="w-4 h-4" style={{ color: "var(--teal-soft)" }} />
                  Submission Portal
                </h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  Upon registration, leaders will receive dashboard credentials to track evaluation reports, feedback channels, and final presentation scheduling.
                </p>
              </div>

              {/* Contact Support */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.2rem 1.5rem 1.1rem 1.8rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <UserCheck className="w-4 h-4" style={{ color: "var(--lavender)" }} />
                  Registration Support
                </h3>
                <div className="font-mono-editorial text-xs flex flex-col gap-1" style={{ color: "var(--ink-mid)" }}>
                  <span>Tel: +91 98765 43210</span>
                  <span>Email: comsoc@ieeekerala.org</span>
                </div>
              </div>

              {/* Declaration policies */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.8rem 1.4rem 1.6rem 1.2rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Shield className="w-4 h-4" style={{ color: "var(--rust)" }} />
                  Policy Declaration
                </h3>
                <p className="font-body text-[10px] sm:text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  By registering, teams agree to the non-plagiarism rules, academic honor codes, and publication/licensing conditions of the parent society.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
