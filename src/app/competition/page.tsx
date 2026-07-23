"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Trophy, BookOpen, Layers, CheckSquare, Award, 
  HelpCircle, Download, FileText, ChevronDown, ChevronUp, Clock, HelpCircle as HelpIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompetitionPage() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tracks = [
    {
      title: "5G/6G & Next-Gen Wireless",
      desc: "Develop prototypes focusing on network architectures, protocol optimization, or cognitive radio designs.",
      domains: ["SDR & RF Frontend Prototyping", "Dynamic Spectrum Access", "Cooperative MIMO Designs"],
      projects: ["Software Defined Transceiver for 5G NR", "Cognitive Spectrum Allocation Engine"],
    },
    {
      title: "IoT & Smart Systems",
      desc: "Implement low-power sensor nodes, smart energy grids, or edge automation architectures.",
      domains: ["LoRaWAN & NB-IoT Applications", "Energy Harvesting Nodes", "Intelligent Edge Gateways"],
      projects: ["Autonomous Air Quality Mesh Network", "Smart Building Predictive Climate node"],
    },
    {
      title: "Network Security & Cryptography",
      desc: "Build mechanisms for secure data routing, blockchain consensus protocols, or threat intelligence.",
      domains: ["Zero Trust Architectures", "Post-Quantum Key Exchange Protocols", "Secure IoT Firmware Booting"],
      projects: ["Decentralized Edge Identity Vault", "Plagiarism-Free Secure Mesh Packet Router"],
    },
    {
      title: "AI & ML in Communications",
      desc: "Train models for predictive channel allocation, anomaly detection, or dynamic resource planning.",
      domains: ["Deep Learning for Channel Estimation", "Predictive Bandwidth Management", "Network Intrusion detection"],
      projects: ["Jury Scoring Predictive QoS Engine", "SDR-Based Radio Anomaly Classifier"],
    },
    {
      title: "Optical & Satellite Communications",
      desc: "Focus on optical transport, laser communications, or satellite constellation routing.",
      domains: ["Free-Space Optical (FSO) links", "High-Throughput Satellite protocols", "Inter-Satellite Link routing"],
      projects: ["Laser-Based FSO Mesh Bridge", "Constellation Routing Simulator"],
    },
  ];

  const workflowSteps = [
    { title: "Registration", desc: "Teams register and submit basic institution info." },
    { title: "Proposal", desc: "Submit a 2-page project abstract and block diagram." },
    { title: "Screening", desc: "Technical jury selects top concepts for mentoring." },
    { title: "Mentoring", desc: "Spend 2 weeks working with assigned industry experts." },
    { title: "Final Submit", desc: "Upload final reports, demo video, and code repositories." },
    { title: "Grand Finale", desc: "Present physical demos and slides to the jury at Saintgits." },
  ];

  const judgingCriteria = [
    { title: "Innovation", score: "25%", desc: "Novelty of the concept, engineering approach, and originality." },
    { title: "Technical Excellence", score: "25%", desc: "Quality of prototype, robust testing, and mathematical/code rigor." },
    { title: "Impact & Feasibility", score: "20%", desc: "Practical usability, market viability, and ease of deployment." },
    { title: "Presentation & Demo", score: "15%", desc: "Clarity of slides, live physical demonstration, and technical Q&A response." },
    { title: "Scalability", score: "15%", desc: "Extensibility of architecture to larger client loads or wider bandwidths." },
  ];

  const faqs = [
    { q: "Is there a registration fee for PROCOMM '26?", a: "No, registration is completely free for all eligible engineering student teams." },
    { q: "What is the maximum team size?", a: "Teams can have a minimum of 1 and a maximum of 4 members. Inter-departmental teams are allowed, but all members must be from the same institution." },
    { q: "Are simulation projects allowed?", a: "Yes, but projects incorporating physical hardware validation (e.g., using microcontrollers, SDRs, or optical kits) will score significantly higher under the Technical Excellence criteria." },
    { q: "Who should I contact for technical support?", a: "You can write to comsoc@ieeekerala.org or reach out to your local student volunteer coordinators listed on the Register page." },
  ];

  const handleDownload = (fileName: string) => {
    alert(`Downloading ${fileName} template...`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-retro-cream select-none">
        
        {/* Banner Section */}
        <section className="relative w-full py-16 px-6 border-b-[3px] border-retro-brown text-center retro-grid-bg">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="bg-retro-brown text-retro-cream px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase rounded-full border border-retro-brown shadow-sm mb-4">
              GUIDELINES & CRITERIA
            </span>
            <h1 className="retro-text-3d text-4xl sm:text-6xl md:text-[68px] leading-tight select-text">
              COMPETITION
            </h1>
            <p className="font-syne text-xs sm:text-sm md:text-base font-bold tracking-widest text-retro-brown uppercase mt-6 max-w-3xl">
              IEEE COMMUNICATIONS PROJECT COMPETITION RULES
            </p>
          </div>
        </section>

        {/* 1. Overview, 2. Eligibility, 3. Team Formation */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Project Scope ]</span>
                <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-retro-brown mt-2">
                  Competition Overview
                </h2>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-3">
                  PROCOMM &apos;26 challenges engineering students to build systems solving networking, wireless, security, or signal processing problems. Submissions should showcase practical applications.
                </p>
              </div>

              <div className="border-t border-retro-brown/15 pt-6">
                <h3 className="font-syne text-base font-extrabold text-retro-brown">Eligibility Guidelines</h3>
                <ul className="list-disc pl-4 font-outfit text-xs text-retro-brown/80 leading-relaxed mt-2 flex flex-col gap-2">
                  <li>Active undergraduate (B.Tech/BE) or postgraduate (M.Tech/MCA/M.Sc) engineering students.</li>
                  <li>Open to colleges across all sections in India (IEEE membership is encouraged but not mandatory).</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-8 shadow-[5px_5px_0px_rgba(93,58,26,0.1)] flex flex-col justify-between">
              <div>
                <h3 className="font-syne text-lg font-bold text-retro-brown flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5" />
                  Team Formation Rules
                </h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed">
                  Teams must consist of 1 to 4 members. Inter-departmental collaborations within the same institution are encouraged. All team members must be enrolled in the same college. Every team must nominate a Team Leader who will handle submission file uploads.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-retro-cream border-2 border-retro-brown rounded-xl text-[10px] sm:text-xs font-mono text-retro-brown">
                <strong>Important:</strong> Project submissions must not contain plagiarized code or design schematics. Plagiarism screening is conducted in Round 1.
              </div>
            </div>

          </div>
        </section>

        {/* 4. Competition Tracks (Interactive Selector) */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Domain Specialties ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Competition Tracks
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Track Selector Links */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {tracks.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTrack(idx)}
                    className={`text-left p-4 rounded-xl border-2 border-retro-brown font-syne text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer ${
                      activeTrack === idx 
                        ? "bg-retro-brown text-retro-white shadow-[2px_2px_0px_#e3d5c1]" 
                        : "bg-retro-cream text-retro-brown hover:bg-retro-cream/80"
                    }`}
                  >
                    Track {idx + 1}: {track.title}
                  </button>
                ))}
              </div>

              {/* Active Track Details Card */}
              <div className="lg:col-span-8 bg-retro-cream border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-8 shadow-[4px_4px_0px_rgba(93,58,26,0.1)]">
                <h3 className="font-syne text-lg sm:text-xl font-bold text-retro-brown border-b border-retro-brown/15 pb-2 mb-4">
                  {tracks[activeTrack].title}
                </h3>
                
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mb-6">
                  {tracks[activeTrack].desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-syne text-xs font-black uppercase tracking-widest text-retro-brown/70 mb-2">Suggested Domains</h4>
                    <ul className="list-disc pl-4 font-mono text-[10px] sm:text-xs text-retro-brown/85 flex flex-col gap-1.5">
                      {tracks[activeTrack].domains.map((dom, dIdx) => (
                        <li key={dIdx}>{dom}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-syne text-xs font-black uppercase tracking-widest text-retro-brown/70 mb-2">Example Projects</h4>
                    <ul className="list-disc pl-4 font-outfit text-xs text-retro-brown/85 flex flex-col gap-1.5">
                      {tracks[activeTrack].projects.map((proj, pIdx) => (
                        <li key={pIdx}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 5. Competition Workflow Stepper */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Operational Phases ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Competition Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 relative shadow-[3px_3px_0px_#5d3a1a]">
                  <div className="absolute top-[-12px] left-4 bg-retro-brown text-retro-cream px-2.5 py-0.5 text-[10px] font-mono font-bold rounded">
                    Step 0{idx + 1}
                  </div>
                  <h3 className="font-syne text-base font-extrabold text-retro-brown mt-2">{step.title}</h3>
                  <p className="font-outfit text-xs text-retro-brown/70 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Complete Timeline Calendar */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Timeline Dates ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Milestone Schedule
              </h2>
            </div>

            <div className="border-[3px] border-retro-brown rounded-[24px] bg-retro-cream p-4 sm:p-8 shadow-[5px_5px_0px_rgba(93,58,26,0.1)]">
              <table className="w-full text-left font-outfit text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-retro-brown/20 font-syne font-black uppercase text-retro-brown/80 tracking-wider">
                    <th className="pb-3">Event Phase</th>
                    <th className="pb-3 text-right">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-retro-brown/10 text-retro-brown font-semibold">
                  <tr>
                    <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Registration Closes</td>
                    <td className="py-3 text-right font-mono">October 15, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Round 1: Proposal Screening</td>
                    <td className="py-3 text-right font-mono">October 18, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Shortlisted Teams Mentoring</td>
                    <td className="py-3 text-right font-mono">Oct 20 - Oct 25, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Final Report & Video Submission</td>
                    <td className="py-3 text-right font-mono">October 26, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Grand Finale at Saintgits</td>
                    <td className="py-3 text-right font-mono">October 28-29, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* 7. Rules, 8. Submission Guidelines, 9. Judging Criteria */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Rules & Submission Guides */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <h3 className="font-syne text-lg font-extrabold text-retro-brown flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Submission Guidelines
                </h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-3">
                  Teams must upload a PDF report detailing block diagrams, algorithms, component selections, and empirical result charts. A public Git link is required for software submissions, and a 3-minute video showing the working prototype is mandatory.
                </p>
              </div>

              <div className="border-t border-retro-brown/15 pt-6">
                <h3 className="font-syne text-base font-extrabold text-retro-brown">Rules & Regulations</h3>
                <ul className="list-disc pl-4 font-outfit text-xs text-retro-brown/80 leading-relaxed mt-2 flex flex-col gap-2">
                  <li>Original engineering designs only (no pre-fabricated kits).</li>
                  <li>Jury decision on scores and winner shortlists is final.</li>
                  <li>Plagiarized reports trigger instant team disqualification.</li>
                </ul>
              </div>
            </div>

            {/* Judging Criteria */}
            <div className="lg:col-span-7 bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-8 shadow-[5px_5px_0px_rgba(93,58,26,0.1)]">
              <h3 className="font-syne text-lg font-bold text-retro-brown flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5" />
                Judging Criteria
              </h3>

              <div className="flex flex-col gap-4">
                {judgingCriteria.map((item, idx) => (
                  <div key={idx} className="border-b border-retro-brown/10 pb-3 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown">{item.title}</h4>
                      <p className="font-outfit text-[11px] sm:text-xs text-retro-brown/70 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="font-mono text-xs font-black text-retro-brown bg-retro-cream px-2 py-0.5 rounded border border-retro-brown">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 10. Deliverables Checklist */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-xl mx-auto bg-retro-cream border-2 border-retro-brown rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#5d3a1a]">
            
            <h3 className="font-syne text-lg font-bold text-retro-brown flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 stroke-[2]" />
              Submission Deliverables Checklist
            </h3>
            
            <ul className="font-outfit text-xs sm:text-sm text-retro-brown/90 leading-relaxed flex flex-col gap-3">
              <li className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-retro-brown" /> PDF Project Proposal Abstract (max 2 pages)</li>
              <li className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-retro-brown" /> Schematic Diagram / Flowcharts</li>
              <li className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-retro-brown" /> Live Working Prototype Demo Video (mp4 link, max 3 mins)</li>
              <li className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-retro-brown" /> Final Project Codebase Link (GitHub/GitLab)</li>
              <li className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-retro-brown" /> PDF Final Presentation Slide Deck</li>
            </ul>
          </div>
        </section>

        {/* 11. Prize Pool */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown text-center select-text">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Prize Breakdown ]</span>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
              Prize Structure
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-12 text-left">
              {[
                { title: "Winner Award", val: "₹50,000", note: "Best overall prototype execution and presentation." },
                { title: "First Runner-Up", val: "₹30,000", note: "Second best engineering setup and documentation." },
                { title: "Best Innovation", val: "₹20,000", note: "Awarded for the most novel design category concept." },
                { title: "Certificates", val: "E-Cert", note: "IEEE ComSoc Kerala participation certificates for all teams." },
              ].map((prize, idx) => (
                <div key={idx} className="bg-retro-white border-2 border-retro-brown rounded-xl p-5 shadow-[3px_3px_0px_#5d3a1a] flex flex-col justify-between">
                  <div>
                    <h4 className="font-syne text-xs font-black text-retro-brown/60 uppercase tracking-widest">{prize.title}</h4>
                    <div className="font-syne text-xl sm:text-2xl font-black text-retro-brown mt-2">{prize.val}</div>
                  </div>
                  <p className="font-outfit text-[11px] sm:text-xs text-retro-brown/70 mt-3 border-t border-retro-brown/10 pt-2">{prize.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Resources & Downloads */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Template Resources ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Downloads & Assets
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "PROCOMM '26 Official Rulebook", file: "rulebook.pdf", desc: "PDF detailing all criteria, timelines, and venues." },
                { title: "Project Abstract Template", file: "proposal_template.docx", desc: "Standard 2-page Word template for proposal submissions." },
                { title: "Jury Presentation Slide Deck", file: "slides_template.pptx", desc: "Standardized PowerPoint layout for Finale pitches." },
              ].map((res, idx) => (
                <div key={idx} className="bg-retro-cream border-2 border-retro-brown rounded-xl p-5 flex flex-col justify-between shadow-[2px_2px_0px_#5d3a1a]">
                  <div>
                    <FileText className="w-6 h-6 text-retro-brown mb-3" />
                    <h4 className="font-syne text-sm font-extrabold text-retro-brown select-text">{res.title}</h4>
                    <p className="font-outfit text-xs text-retro-brown/70 mt-1 select-text">{res.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(res.file)}
                    className="mt-6 w-full py-2 bg-retro-brown text-retro-cream font-syne text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 13. FAQ Accordion */}
        <section className="py-20 px-6 bg-retro-cream select-text">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ FAQ Portal ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-retro-white border-2 border-retro-brown rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left font-syne text-xs sm:text-sm font-extrabold text-retro-brown cursor-pointer hover:bg-retro-cream/35"
                  >
                    <span className="flex items-center gap-2">
                      <HelpIcon className="w-4 h-4 text-retro-brown/65 flex-shrink-0" />
                      {faq.q}
                    </span>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-retro-brown/10"
                      >
                        <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 p-5 leading-relaxed bg-retro-cream/10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
