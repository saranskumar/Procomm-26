"use client";

import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

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
          colors: ["#5d3a1a", "#e3d5c1", "#ffffff"]
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
    <section id="contact" className="w-full bg-retro-cream py-20 px-6 border-b-[3px] border-retro-brown select-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
            [ Inquiries & Hosting Interest ]
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
            Inquire Now
          </h2>
          <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 max-w-lg mx-auto">
            Have questions about student participation or want to pitch your campus as a venue? Fill out the form below.
          </p>
        </div>

        {/* Double Border Form Card */}
        <div className="bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-10 shadow-[5px_5px_0px_rgba(93,58,26,0.1)] relative">
          
          {submitStatus === "success" ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-16 h-16 text-retro-brown mb-4 stroke-[1.5]" />
              <h3 className="font-syne text-xl sm:text-2xl font-bold text-retro-brown">
                Thank You!
              </h3>
              <p className="font-outfit text-sm text-retro-brown/80 mt-2 max-w-sm">
                Your inquiry has been submitted successfully. The PROCOMM &apos;26 coordinating team will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="mt-6 px-5 py-2.5 bg-retro-brown text-retro-cream font-syne text-xs font-extrabold tracking-widest rounded-lg uppercase cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
              
              {submitStatus === "error" && (
                <div className="bg-red-50 border-2 border-retro-brown rounded-xl p-4 flex items-start gap-3 text-retro-brown">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold">Submission Error:</span> {apiErrorMessage}
                  </div>
                </div>
              )}

              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="retro-input px-4 py-3 rounded-xl text-sm"
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono">
                      * {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="retro-input px-4 py-3 rounded-xl text-sm"
                    placeholder="name@institution.edu"
                  />
                  {errors.email && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono">
                      * {errors.email}
                    </span>
                  )}
                </div>

              </div>

              {/* Institution & Role Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Institution */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="institution" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                    Institution / College
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="retro-input px-4 py-3 rounded-xl text-sm"
                    placeholder="College name"
                  />
                  {errors.institution && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono">
                      * {errors.institution}
                    </span>
                  )}
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="retro-input px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer bg-white"
                  >
                    <option value="">Select your role</option>
                    <option value="Student Representative">Student Representative</option>
                    <option value="Faculty Sponsor">Faculty Sponsor</option>
                    <option value="HOD / Department Chair">HOD / Department Chair</option>
                    <option value="Principal / Dean">Principal / Dean</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role && (
                    <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono">
                      * {errors.role}
                    </span>
                  )}
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                  Message / Expressions of Interest
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="retro-input px-4 py-3 rounded-xl text-sm resize-none"
                  placeholder="Tell us about your campus hosting capabilities or general competition inquiries..."
                />
                {errors.message && (
                  <span className="text-xs font-bold text-red-700 mt-1 flex items-center gap-1 font-mono">
                    * {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-4 bg-retro-brown text-retro-white font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded-xl uppercase retro-button-shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
