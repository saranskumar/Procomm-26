"use client";

import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import HostCTA from "@/components/HostCTA";
import Footer from "@/components/Footer";
import { CheckCircle2, AlertCircle, Calendar, ShieldCheck, MapPin } from "lucide-react";

// Form validation schema for host applications
const hostSchema = z.object({
  collegeName: z.string().min(5, { message: "College/Institution name must be at least 5 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person's name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid academic/work email." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  capacity: z.string().min(1, { message: "Please specify auditorium capacity." }),
  infrastructure: z.string().min(10, { message: "Please detail available lab infrastructure (min 10 chars)." }),
  facilities: z.string().min(10, { message: "Please detail dining/accommodation facilities (min 10 chars)." }),
});

type HostFormFields = z.infer<typeof hostSchema>;

export default function HostPage() {
  const [formData, setFormData] = useState<HostFormFields>({
    collegeName: "",
    contactPerson: "",
    email: "",
    phone: "",
    capacity: "",
    infrastructure: "",
    facilities: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HostFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof HostFormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus("idle");
    setApiErrorMessage("");

    const validation = hostSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof HostFormFields, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof HostFormFields] = err.message;
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
          name: formData.contactPerson,
          email: formData.email,
          institution: formData.collegeName,
          role: "Campus Host Applicant",
          message: `Auditorium Capacity: ${formData.capacity}\nPhone: ${formData.phone}\nInfrastructure: ${formData.infrastructure}\nFacilities: ${formData.facilities}`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          collegeName: "",
          contactPerson: "",
          email: "",
          phone: "",
          capacity: "",
          infrastructure: "",
          facilities: "",
        });
        
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-retro-cream">
        
        {/* Poster representation component */}
        <HostCTA />

        {/* Detailed Hosting Guidelines */}
        <section className="py-16 px-6 border-b-[3px] border-retro-brown">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
                [ Host Requirements & Selection ]
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Venue Guidelines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Box 1: Infrastructure */}
              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#5d3a1a]">
                <div className="w-10 h-10 bg-retro-cream border-2 border-retro-brown rounded-lg flex items-center justify-center text-retro-brown mb-6">
                  <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight">
                  1. Venue Specification
                </h3>
                <ul className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4 list-disc pl-4 flex flex-col gap-2">
                  <li>Main auditorium with at least 250+ seating capacity.</li>
                  <li>Power backups and audio-visual projections setup.</li>
                  <li>At least 2 breakout rooms for jury interviews.</li>
                  <li>Dedicated high-speed Wi-Fi access for participants.</li>
                </ul>
              </div>

              {/* Box 2: Timeline */}
              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#5d3a1a]">
                <div className="w-10 h-10 bg-retro-cream border-2 border-retro-brown rounded-lg flex items-center justify-center text-retro-brown mb-6">
                  <Calendar className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight">
                  2. Selection Timeline
                </h3>
                <ul className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4 list-disc pl-4 flex flex-col gap-2">
                  <li><strong>Expression of Interest:</strong> Till 2nd July 2026.</li>
                  <li><strong>First Shortlisting:</strong> July 5, 2026.</li>
                  <li><strong>Venue Inspections:</strong> July 10 to July 15, 2026.</li>
                  <li><strong>Host Announcement:</strong> July 20, 2026.</li>
                </ul>
              </div>

              {/* Box 3: Hospitality */}
              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#5d3a1a]">
                <div className="w-10 h-10 bg-retro-cream border-2 border-retro-brown rounded-lg flex items-center justify-center text-retro-brown mb-6">
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight">
                  3. Hospitality
                </h3>
                <ul className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4 list-disc pl-4 flex flex-col gap-2">
                  <li>Local logistics support for jury and coordinating members.</li>
                  <li>Dining area and catering facilities for participants.</li>
                  <li>Basic accommodation details for distant teams.</li>
                  <li>Ample parking spaces for incoming campus buses.</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Dedicated Host Application Form */}
        <section id="apply-form" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
                [ Host Application Portal ]
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Apply to Host
              </h2>
              <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 max-w-lg mx-auto">
                Submit details about your campus venue. We will evaluate your application and inspect your campus.
              </p>
            </div>

            <div className="bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-10 shadow-[5px_5px_0px_rgba(93,58,26,0.1)]">
              
              {submitStatus === "success" ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-retro-brown mb-4 stroke-[1.5]" />
                  <h3 className="font-syne text-xl sm:text-2xl font-bold text-retro-brown">
                    Application Submitted!
                  </h3>
                  <p className="font-outfit text-sm text-retro-brown/80 mt-2 max-w-sm">
                    Thank you for applying. Your host request has been recorded. Our inspection team will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 px-5 py-2.5 bg-retro-brown text-retro-cream font-syne text-xs font-extrabold tracking-widest rounded-lg uppercase cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border-2 border-retro-brown rounded-xl p-4 flex items-start gap-3 text-retro-brown">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold">Error:</span> {apiErrorMessage}
                      </div>
                    </div>
                  )}

                  {/* College Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="collegeName" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                      College / Institution Name
                    </label>
                    <input
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="retro-input px-4 py-3 rounded-xl text-sm"
                      placeholder="e.g. Government Engineering College, Thrissur"
                    />
                    {errors.collegeName && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.collegeName}</span>
                    )}
                  </div>

                  {/* Contact Person & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contactPerson" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="Faculty / HOD Name"
                      />
                      {errors.contactPerson && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.contactPerson}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="capacity" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Auditorium Capacity
                      </label>
                      <select
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm appearance-none bg-white cursor-pointer"
                      >
                        <option value="">Select capacity range</option>
                        <option value="200-300 seats">200 - 300 seats</option>
                        <option value="300-500 seats">300 - 500 seats</option>
                        <option value="500+ seats">500+ seats</option>
                      </select>
                      {errors.capacity && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.capacity}</span>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                        Official Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="retro-input px-4 py-3 rounded-xl text-sm"
                        placeholder="hodece@college.edu"
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
                        placeholder="10-digit number"
                      />
                      {errors.phone && (
                        <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Infrastructure Details */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="infrastructure" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                      Lab & Breakout Room Facilities
                    </label>
                    <textarea
                      id="infrastructure"
                      name="infrastructure"
                      rows={3}
                      value={formData.infrastructure}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="retro-input px-4 py-3 rounded-xl text-sm resize-none"
                      placeholder="Detail laboratory setups, Wi-Fi bandwidth, breakout spaces available..."
                    />
                    {errors.infrastructure && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.infrastructure}</span>
                    )}
                  </div>

                  {/* Hospitality Details */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="facilities" className="font-syne text-[11px] font-extrabold uppercase tracking-widest text-retro-brown">
                      Dining & Accommodation Support
                    </label>
                    <textarea
                      id="facilities"
                      name="facilities"
                      rows={3}
                      value={formData.facilities}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="retro-input px-4 py-3 rounded-xl text-sm resize-none"
                      placeholder="Describe dining capacities, parking areas, guest rooms, etc..."
                    />
                    {errors.facilities && (
                      <span className="text-xs font-bold text-red-700 mt-1 font-mono">* {errors.facilities}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 px-6 py-4 bg-retro-brown text-retro-white font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded-xl uppercase retro-button-shadow cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting Request..." : "Submit Host Application"}
                  </button>

                </form>
              )}

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
