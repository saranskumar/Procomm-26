"use client";

import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import { Mail, CheckCircle2, AlertCircle, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  institution: z.string().min(3, { message: "Institution must be at least 3 characters." }),
  role: z.string().min(1, { message: "Please select your role." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormFields = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    institution: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormFields]) {
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
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormFields, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormFields] = err.message;
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        // Clear form
        setFormData({
          name: "",
          email: "",
          institution: "",
          role: "",
          message: "",
        });
        
        // Trigger high-fidelity success confetti
        confetti({
          particleCount: 100,
          spread: 70,
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

  return (
    <section id="contact" className="w-full py-20 px-6 select-none" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Contact Details */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="select-text">
            <span className="chapter-label">Queries</span>
            <h2 className="editorial-headline mt-3">
              Get in Touch
            </h2>
            <p className="font-body text-xs sm:text-sm mt-3 leading-relaxed" style={{ color: "var(--ink-mid)" }}>
              Have questions about student participation, track criteria, or want to explore partner/sponsorship opportunities?
            </p>
          </div>

          <div className="flex flex-col gap-4 select-text">
            {[
              { icon: Mail, label: "Email support", val: "comsoc@ieeekerala.org" },
              { icon: Phone, label: "Phone helpline", val: "+91 98765 43210" },
              { icon: MapPin, label: "Office venue", val: "Saintgits College of Engineering (Autonomous), Kottayam, Kerala" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="organic-card hover-lift flex gap-4 items-center p-4"
                style={{
                  borderRadius: `${1.2 + (idx % 3) * 0.3}rem ${0.8 + (idx % 2) * 0.4}rem ${1.5 - (idx % 3) * 0.2}rem ${1 + (idx % 2) * 0.3}rem`,
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)" }}>
                  <item.icon className="w-4 h-4" style={{ color: "var(--ochre)" }} />
                </div>
                <div>
                  <span className="font-mono-editorial text-[9px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>{item.label}</span>
                  <p className="font-display font-bold text-sm" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Double Border Form Card */}
        <div 
          className="lg:col-span-8 organic-card hover-lift p-6 sm:p-10 relative"
          style={{
            borderRadius: "2rem 1.5rem 2.5rem 1.2rem",
            backgroundColor: "var(--moon)",
            border: "1.5px solid var(--paper-dark)"
          }}
        >
          
          {submitStatus === "success" ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-16 h-16 text-retro-brown mb-4 stroke-[1.5]" style={{ color: "var(--moss)" }} />
              <h3 className="font-display font-bold text-xl sm:text-2xl" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>
                Thank You!
              </h3>
              <p className="font-body text-sm mt-2 max-w-sm" style={{ color: "var(--ink-mid)" }}>
                Your inquiry has been submitted successfully. The PROCOMM &apos;26 coordinating team will contact you shortly.
              </p>
              <motion.button
                onClick={() => setSubmitStatus("idle")}
                className="mt-6 px-5 py-2.5 btn-ochre cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
              
              {submitStatus === "error" && (
                <div className="border-2 rounded-xl p-4 flex items-start gap-3" style={{ borderColor: "var(--rust)", backgroundColor: "rgba(184,74,42,0.05)", color: "var(--rust)" }}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-body">
                    <span className="font-bold">Submission Error:</span> {apiErrorMessage}
                  </div>
                </div>
              )}

              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono-editorial">
                      * {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                    Email Address
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
                    placeholder="name@institution.edu"
                  />
                  {errors.email && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono-editorial">
                      * {errors.email}
                    </span>
                  )}
                </div>

              </div>

              {/* Institution & Role Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Institution */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="institution" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                    Institution / College
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                    placeholder="College name"
                  />
                  {errors.institution && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono-editorial">
                      * {errors.institution}
                    </span>
                  )}
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer bg-white"
                    style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                  >
                    <option value="">Select your role</option>
                    <option value="Student Representative">Student Representative</option>
                    <option value="Faculty Sponsor">Faculty Sponsor</option>
                    <option value="HOD / Department Chair">HOD / Department Chair</option>
                    <option value="Principal / Dean">Principal / Dean</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono-editorial">
                      * {errors.role}
                    </span>
                  )}
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono-editorial text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
                  Message / Expressions of Interest
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-xl text-sm resize-none"
                  style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)", color: "var(--ink-deep)" }}
                  placeholder="Tell us about your campus hosting capabilities or general competition inquiries..."
                />
                {errors.message && (
                  <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono-editorial">
                    * {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-4 btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </motion.button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
