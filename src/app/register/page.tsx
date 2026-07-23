"use client";

import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Calendar, CheckCircle2, AlertCircle, FileText, 
  HelpCircle, ChevronRight, Laptop, Send, UserCheck, Shield 
} from "lucide-react";

// Form validation schema using Zod
const registrationSchema = z.object({
  teamName: z.string().min(3, { message: "Team Name must be at least 3 characters." }),
  leaderName: z.string().min(2, { message: "Team Leader Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid institution email." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  college: z.string().min(5, { message: "College/Institution name must be at least 5 characters." }),
  membersCount: z.string().min(1, { message: "Please select team member count." }),
  track: z.string().min(1, { message: "Please select a competition track." }),
  abstractTitle: z.string().min(10, { message: "Abstract Title must be at least 10 characters." }),
});

type RegistrationFormFields = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegistrationFormFields>({
    teamName: "",
    leaderName: "",
    email: "",
    phone: "",
    college: "",
    membersCount: "",
    track: "",
    abstractTitle: "",
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
          message: `Team Name: ${formData.teamName}\nTrack: ${formData.track}\nMembers: ${formData.membersCount}\nAbstract: ${formData.abstractTitle}\nPhone: ${formData.phone}`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          teamName: "",
          leaderName: "",
          email: "",
          phone: "",
          college: "",
          membersCount: "",
          track: "",
          abstractTitle: "",
        });
        
        // Trigger high-fidelity success confetti
        confetti({
          particleCount: 150,
          spread: 80,
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

  const steps = [
    { title: "Form Submission", desc: "Fill out the registration details including member names and track category choice." },
    { title: "Document Upload", desc: "Upload college ID scans and a 2-page project proposal in PDF format." },
    { title: "Jury Screening", desc: "The expert panel reviews abstracts to evaluate innovation and feasibility." },
    { title: "Mentorship", desc: "Shortlisted teams match with assigned industry mentors for design refactoring." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-retro-cream select-none">
        
        {/* Banner Section */}
        <section className="relative w-full py-16 px-6 border-b-[3px] border-retro-brown text-center retro-grid-bg">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="bg-retro-brown text-retro-cream px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase rounded-full border border-retro-brown shadow-sm mb-4">
              SUBMISSION PORTAL
            </span>
            <h1 className="retro-text-3d text-4xl sm:text-6xl md:text-[68px] leading-tight select-text">
              REGISTRATION
            </h1>
            <p className="font-syne text-xs sm:text-sm md:text-base font-bold tracking-widest text-retro-brown uppercase mt-6 max-w-3xl">
              SUBMIT YOUR PROJECT TO PROCOMM &apos;26
            </p>
          </div>
        </section>

        {/* 1. Registration Process Stepper */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Roadmap ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Registration Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 select-text">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 shadow-[3px_3px_0px_#5d3a1a] relative flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 bg-retro-cream border border-retro-brown rounded-full flex items-center justify-center font-mono text-xs font-bold text-retro-brown mb-4">
                      {idx + 1}
                    </span>
                    <h3 className="font-syne text-sm sm:text-base font-bold text-retro-brown">{step.title}</h3>
                    <p className="font-outfit text-xs text-retro-brown/70 mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {idx < 3 && (
                    <ChevronRight className="hidden sm:block absolute right-[-15px] top-[40%] w-6 h-6 text-retro-brown/40 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & Sidebar Grid */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Registration Form (Left side) */}
            <div className="lg:col-span-8 bg-retro-cream border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-10 shadow-[5px_5px_0px_rgba(93,58,26,0.1)] relative select-text">
              
              <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />

              {submitStatus === "success" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-retro-brown mb-4 stroke-[1.5]" />
                  <h3 className="font-syne text-xl sm:text-2xl font-bold text-retro-brown">
                    Registration Success!
                  </h3>
                  <p className="font-outfit text-sm text-retro-brown/80 mt-2 max-w-sm">
                    Your team details have been recorded. A confirmation email has been sent to the Team Leader. Please check your inbox for instructions to upload your project proposal PDF.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 px-5 py-2.5 bg-retro-brown text-retro-cream font-syne text-xs font-extrabold tracking-widest rounded-lg uppercase cursor-pointer"
                  >
                    Submit Another Team
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
                  
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border-2 border-retro-brown rounded-xl p-4 flex items-start gap-3 text-retro-brown">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold">Error:</span> {apiErrorMessage}
                      </div>
                    </div>
                  )}

                  {/* Team Details Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="teamName" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="e.g. Spectral Mesh Leaders"
                      />
                      {errors.teamName && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.teamName}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="leaderName" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Team Leader Name
                      </label>
                      <input
                        type="text"
                        id="leaderName"
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="Leader full name"
                      />
                      {errors.leaderName && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.leaderName}</span>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Official/Leader Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="leader@institution.edu"
                      />
                      {errors.email && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.email}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* College & Members Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="college" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        College / Institution Name
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="Enter full college name"
                      />
                      {errors.college && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.college}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="membersCount" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Total Team Members
                      </label>
                      <select
                        id="membersCount"
                        name="membersCount"
                        value={formData.membersCount}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm appearance-none bg-white cursor-pointer"
                      >
                        <option value="">Select team size</option>
                        <option value="1 Member">1 Member (Solo)</option>
                        <option value="2 Members">2 Members</option>
                        <option value="3 Members">3 Members</option>
                        <option value="4 Members">4 Members</option>
                      </select>
                      {errors.membersCount && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.membersCount}</span>
                      )}
                    </div>
                  </div>

                  {/* Competition Track */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="track" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                      Select Competition Track
                    </label>
                    <select
                      id="track"
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="retro-input px-4 py-3 rounded-xl text-sm appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Select track category</option>
                      <option value="5G/6G & Next-Gen Wireless">Track 1: 5G/6G & Next-Gen Wireless</option>
                      <option value="IoT & Smart Systems">Track 2: IoT & Smart Systems</option>
                      <option value="Network Security & Cryptography">Track 3: Network Security & Cryptography</option>
                      <option value="AI & ML in Communications">Track 4: AI & ML in Communications</option>
                      <option value="Optical & Satellite Communications">Track 5: Optical & Satellite Communications</option>
                    </select>
                    {errors.track && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.track}</span>
                    )}
                  </div>

                  {/* Project Abstract Title */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="abstractTitle" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                      Proposed Project Abstract Title
                    </label>
                    <textarea
                      id="abstractTitle"
                      name="abstractTitle"
                      rows={3}
                      value={formData.abstractTitle}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="retro-input px-4 py-3 rounded-xl text-sm resize-none"
                      placeholder="Briefly state your project name and abstract focus..."
                    />
                    {errors.abstractTitle && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.abstractTitle}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 px-6 py-4 bg-retro-brown text-retro-white font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded-xl uppercase retro-button-shadow cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Registering..." : "Submit Registration"}</span>
                  </button>

                </form>
              )}

            </div>

            {/* Sidebar (Right side) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Important Dates */}
              <div className="bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 shadow-sm">
                <h3 className="font-syne text-sm font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown/15 pb-2 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Important Dates
                </h3>
                <div className="flex flex-col gap-3 font-outfit text-xs text-retro-brown select-text">
                  <div className="flex justify-between border-b border-retro-brown/10 pb-1">
                    <span className="font-semibold">Reg Closes:</span>
                    <span className="font-mono font-bold">Oct 15, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-retro-brown/10 pb-1">
                    <span className="font-semibold">Abstract Review:</span>
                    <span className="font-mono font-bold">Oct 18, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-retro-brown/10 pb-1">
                    <span className="font-semibold">Jury Presentations:</span>
                    <span className="font-mono font-bold">Oct 28-29, 2026</span>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 shadow-sm select-text">
                <h3 className="font-syne text-sm font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown/15 pb-2 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Required Files
                </h3>
                <ul className="list-disc pl-4 font-outfit text-xs text-retro-brown/80 leading-relaxed flex flex-col gap-2">
                  <li>Valid Student ID card scans of all members.</li>
                  <li>IEEE/ComSoc membership card PDF (if applicable, for verification).</li>
                  <li>2-page project proposal in standard format.</li>
                </ul>
              </div>

              {/* Portal Info */}
              <div className="bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 shadow-sm select-text">
                <h3 className="font-syne text-sm font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown/15 pb-2 mb-4 flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  Submission Portal
                </h3>
                <p className="font-outfit text-xs text-retro-brown/80 leading-relaxed">
                  Upon registration, leaders will receive dashboard credentials to track evaluation reports, feedback channels, and final presentation scheduling.
                </p>
              </div>

              {/* Contact Support */}
              <div className="bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 shadow-sm select-text">
                <h3 className="font-syne text-sm font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown/15 pb-2 mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Registration Support
                </h3>
                <div className="font-mono text-xs text-retro-brown flex flex-col gap-1">
                  <span>Tel: +91 98765 43210</span>
                  <span>Email: comsoc@ieeekerala.org</span>
                </div>
              </div>

              {/* Declaration policies */}
              <div className="bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 shadow-sm select-text">
                <h3 className="font-syne text-sm font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown/15 pb-2 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Policy Declaration
                </h3>
                <p className="font-outfit text-[10px] sm:text-xs text-retro-brown/70 leading-relaxed">
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
