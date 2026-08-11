"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterBanner from "@/components/RegisterBanner";
import IllustrationLayer from "@/components/IllustrationLayer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ShieldCheck, User, Users, FileText, Send, Sparkles, UploadCloud, FileCheck, RefreshCw, Loader2
} from "lucide-react";

const PROBLEM_STATEMENTS = [
  "Smart Safety Helmet for Industrial Workers",
  "Smart Water Tank Health Monitoring System",
  "Smart Rubber Plantation Worker Safety System",
  "Machine Health Monitoring System Using Standard Industrial Protocols",
  "Smart Bridge Structural Health Monitoring System",
];

const SEMESTERS = ["S1 (1st Year)", "S2 (1st Year)", "S3 (2nd Year)", "S4 (2nd Year)", "S5 (3rd Year)", "S6 (3rd Year)", "S7 (4th Year)", "S8 (4th Year)"];

interface MemberData {
  name: string;
  college: string;
  semester: string;
  isIeeeMember: boolean;
  isComsocMember: boolean;
  membershipId: string;
  email: string;
  phone: string;
}

const emptyMember = (): MemberData => ({
  name: "",
  college: "",
  semester: SEMESTERS[4],
  isIeeeMember: true,
  isComsocMember: false,
  membershipId: "",
  email: "",
  phone: "",
});

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [problemStatement, setProblemStatement] = useState(PROBLEM_STATEMENTS[0]);
  const [teamSize, setTeamSize] = useState<number>(1);

  const [leader, setLeader] = useState<MemberData>(emptyMember());
  const [members, setMembers] = useState<MemberData[]>([
    emptyMember(),
    emptyMember(),
    emptyMember(),
  ]);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [declared, setDeclared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [restoredDraft, setRestoredDraft] = useState(false);

  const [uploadStep, setUploadStep] = useState("Encoding proposal PDF...");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("procomm26_registration_draft_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.teamName !== undefined) setTeamName(parsed.teamName);
        if (parsed.problemStatement !== undefined) setProblemStatement(parsed.problemStatement);
        if (parsed.teamSize !== undefined) setTeamSize(parsed.teamSize);
        if (parsed.leader) setLeader(parsed.leader);
        if (parsed.members) setMembers(parsed.members);
        if (parsed.declared !== undefined) setDeclared(parsed.declared);
        setRestoredDraft(true);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Auto-save draft on form input changes if not submitted
  useEffect(() => {
    if (submitted) return;
    try {
      const draft = {
        teamName,
        problemStatement,
        teamSize,
        leader,
        members,
        declared,
      };
      localStorage.setItem("procomm26_registration_draft_v2", JSON.stringify(draft));
    } catch {
      /* ignore storage errors */
    }
  }, [teamName, problemStatement, teamSize, leader, members, declared, submitted]);

  const clearDraft = () => {
    try {
      localStorage.removeItem("procomm26_registration_draft_v2");
    } catch {
      /* ignore */
    }
    setTeamName("");
    setProblemStatement(PROBLEM_STATEMENTS[0]);
    setTeamSize(1);
    setLeader(emptyMember());
    setMembers([emptyMember(), emptyMember(), emptyMember()]);
    setPdfFile(null);
    setDeclared(false);
    setRestoredDraft(false);
  };

  const handleTeamSizeChange = (newSize: number) => {
    setTeamSize(newSize);
    const requiredExtraMembers = newSize - 1;
    if (members.length < requiredExtraMembers) {
      const added = Array.from({ length: requiredExtraMembers - members.length }, emptyMember);
      setMembers([...members, ...added]);
    } else {
      setMembers(members.slice(0, requiredExtraMembers));
    }
  };

  const updateLeader = (field: keyof MemberData, value: any) => {
    setLeader((prev) => ({ ...prev, [field]: value }));
  };

  const updateMember = (index: number, field: keyof MemberData, value: any) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Please upload a valid PDF document.");
        return;
      }
      setPdfFile(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!declared) {
      alert("Please accept the Policy Declaration before submitting.");
      return;
    }
    if (!pdfFile) {
      alert("Please upload your project proposal PDF.");
      return;
    }

    setLoading(true);
    setUploadProgress(15);
    setUploadStep("Encoding project proposal PDF...");

    try {
      let fileBase64 = "";
      if (pdfFile) {
        fileBase64 = await fileToBase64(pdfFile);
      }

      setUploadProgress(45);
      setUploadStep("Transmitting team registration data...");

      const payload = {
        teamName,
        problemStatement,
        teamSize,
        leader,
        members: members.slice(0, teamSize - 1),
        fileName: pdfFile?.name || "",
        fileMimeType: pdfFile?.type || "application/pdf",
        fileBase64,
        declared,
      };

      const scriptUrl =
        process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
        "https://script.google.com/macros/s/AKfycbxkpzQMX_ubAd7UTBQE-HeGuMDM9IR3Qbkr0ryKyez8AnMaFJDMAr_IajR9hTV55znn/exec";

      setUploadProgress(85);
      setUploadStep("Saving registration submission...");

      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      } else {
        await new Promise((res) => setTimeout(res, 1400));
      }

      setUploadProgress(100);
      await new Promise((res) => setTimeout(res, 400));

      setLoading(false);
      setSubmitted(true);
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const card = document.getElementById("whatsapp-group-card");
          if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
      try {
        localStorage.removeItem("procomm26_registration_draft_v2");
      } catch {
        /* ignore */
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred during submission. Please try again.");
      setLoading(false);
    }
  };

  const renderMembershipQuestions = (
    data: MemberData,
    onChange: (field: keyof MemberData, value: any) => void,
    groupName: string
  ) => (
    <div className="flex flex-col gap-4 pt-3 border-t border-zinc-200/60 select-text">
      {/* Question 1: IEEE Member */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-body text-xs font-semibold text-ink-deep">
          Are you an IEEE member? <span className="text-red-500">*</span>
        </span>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-ink-deep select-none">
            <input
              type="radio"
              name={`ieee-${groupName}`}
              value="yes"
              checked={data.isIeeeMember === true}
              onChange={() => onChange("isIeeeMember", true)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-ink-deep select-none">
            <input
              type="radio"
              name={`ieee-${groupName}`}
              value="no"
              checked={data.isIeeeMember === false}
              onChange={() => {
                onChange("isIeeeMember", false);
                onChange("membershipId", "");
              }}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            No
          </label>
        </div>
      </div>

      {/* If IEEE Member Yes -> Ask for ID */}
      {data.isIeeeMember && (
        <div className="flex flex-col gap-1.5 pl-3 border-l-2 border-amber-600">
          <label className="font-body text-xs font-semibold text-ink-deep">
            IEEE Membership ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 98765432"
            value={data.membershipId}
            onChange={(e) => onChange("membershipId", e.target.value)}
            className="w-full sm:w-64 px-3.5 py-2 rounded-lg border text-xs font-mono-editorial text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
            style={{ borderColor: "var(--paper-dark)" }}
          />
        </div>
      )}

      {/* Question 2: ComSoc Member */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-100">
        <span className="font-body text-xs font-semibold text-ink-deep">
          Are you a ComSoc member? <span className="text-red-500">*</span>
        </span>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-ink-deep select-none">
            <input
              type="radio"
              name={`comsoc-${groupName}`}
              value="yes"
              checked={data.isComsocMember === true}
              onChange={() => onChange("isComsocMember", true)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-ink-deep select-none">
            <input
              type="radio"
              name={`comsoc-${groupName}`}
              value="no"
              checked={data.isComsocMember === false}
              onChange={() => onChange("isComsocMember", false)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            No
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">
        {/* Banner Section */}
        <RegisterBanner />

        {/* Form Section */}
        <section className="py-20 px-6 relative" style={{ backgroundColor: "var(--paper)" }}>
          <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.1} />

          <div className="max-w-4xl mx-auto relative z-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="organic-card p-10 sm:p-16 text-center flex flex-col items-center gap-6 select-text"
                  style={{
                    backgroundColor: "var(--moon)",
                    border: "1.5px solid var(--paper-dark)",
                    borderRadius: "2.5rem",
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <span className="font-mono-editorial text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
                      Registration Submitted
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-deep italic">
                      Welcome to PROCOMM &apos;26!
                    </h2>
                  </div>

                  <p className="font-body text-sm text-ink-mid max-w-md leading-relaxed">
                    Thank you for registering team <strong className="text-ink-deep font-semibold">&ldquo;{teamName}&rdquo;</strong> ({teamSize} {teamSize === 1 ? "Member" : "Members"}). Please join our official WhatsApp group for important announcements, evaluation schedules, and coordinator updates.
                  </p>

                  {/* WhatsApp Group Join Card */}
                  <div
                    id="whatsapp-group-card"
                    className="w-full max-w-md p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center gap-3"
                  >
                    <span className="font-mono-editorial text-[0.68rem] tracking-wider uppercase text-emerald-800 font-bold">
                      Official Announcement Group
                    </span>
                    <a
                      href="https://chat.whatsapp.com/FKiUc3a1AKf36IS29BLqow?s=cl&p=i&mlu=4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-body text-sm font-semibold flex items-center justify-center gap-2.5 shadow-lg transition-all hover-lift cursor-pointer"
                    >
                      <Image
                        src="/whatsapp-icon-white.png"
                        alt="WhatsApp"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                      Join WhatsApp Group
                    </a>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/60 w-full max-w-md flex flex-col gap-2 font-mono-editorial text-xs text-ink-soft text-left">
                    <div>Selected Track: <span className="text-ink-deep font-semibold">{problemStatement}</span></div>
                    <div>Leader Name: <span className="text-ink-deep font-semibold">{leader.name}</span> ({leader.college})</div>
                    <div>PDF Uploaded: <span className="text-emerald-700 font-semibold">{pdfFile ? pdfFile.name : "Attached"}</span></div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setTeamName("");
                      setLeader(emptyMember());
                      setMembers([emptyMember(), emptyMember(), emptyMember()]);
                      setTeamSize(4);
                      setPdfFile(null);
                      setDeclared(false);
                    }}
                    className="btn-outline-dark mt-2 text-xs cursor-pointer"
                  >
                    Submit Another Registration
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="organic-card p-6 sm:p-12 flex flex-col gap-10 select-text"
                  style={{
                    backgroundColor: "var(--moon)",
                    border: "1.5px solid var(--paper-dark)",
                    borderRadius: "2.5rem",
                  }}
                >
                  {/* Draft Restored Banner */}
                  {restoredDraft && (
                    <div className="p-3.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono-editorial text-amber-900">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: "6s" }} />
                        Restored your last saved progress!
                      </span>
                      <button
                        type="button"
                        onClick={clearDraft}
                        className="underline hover:text-amber-950 cursor-pointer font-bold"
                      >
                        Clear Draft
                      </button>
                    </div>
                  )}

                  {/* Header */}
                  <div className="border-b pb-6" style={{ borderColor: "var(--paper-dark)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-ochre" />
                      <span className="chapter-label">Official Registration</span>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-deep italic">
                      Team &amp; Member Registration
                    </h2>
                    <p className="font-body text-xs sm:text-sm text-ink-mid mt-2 leading-relaxed">
                      Configure your team size (1 to 4 members) and fill in member details, IEEE membership info, and your project proposal PDF.
                    </p>
                  </div>

                  {/* Section 1: Team Config & Problem Statement */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display font-bold text-lg text-ink-deep italic flex items-center gap-2 border-b pb-2" style={{ borderColor: "rgba(11,26,48,0.08)" }}>
                      <Users className="w-5 h-5 text-ochre" />
                      1. Team Configuration &amp; Problem Statement
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-body text-xs font-semibold text-ink-deep">
                          Team Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ComSoc Innovators"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border text-sm font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all"
                          style={{ borderColor: "var(--paper-dark)" }}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-body text-xs font-semibold text-ink-deep">
                          Number of Team Members (1 to 4) <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={teamSize}
                          onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border text-sm font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all cursor-pointer"
                          style={{ borderColor: "var(--paper-dark)" }}
                        >
                          <option value={1}>1 Member (Individual)</option>
                          <option value={2}>2 Members</option>
                          <option value={3}>3 Members</option>
                          <option value={4}>4 Members</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="font-body text-xs font-semibold text-ink-deep">
                          Select Problem Statement <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={problemStatement}
                          onChange={(e) => setProblemStatement(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border text-sm font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all cursor-pointer"
                          style={{ borderColor: "var(--paper-dark)" }}
                        >
                          {PROBLEM_STATEMENTS.map((statement, idx) => (
                            <option key={idx} value={statement}>
                              0{idx + 1}. {statement}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Team Leader */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display font-bold text-lg text-ink-deep italic flex items-center gap-2 border-b pb-2" style={{ borderColor: "rgba(11,26,48,0.08)" }}>
                      <User className="w-5 h-5 text-ochre" />
                      2. Team Leader Details (Member 01)
                    </h3>

                    <div className="p-6 rounded-2xl border bg-white/70 flex flex-col gap-5" style={{ borderColor: "var(--paper-dark)" }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-semibold text-ink-deep">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={leader.name}
                            onChange={(e) => updateLeader("name", e.target.value)}
                            className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                            style={{ borderColor: "var(--paper-dark)" }}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-semibold text-ink-deep">College / Institution *</label>
                          <input
                            type="text"
                            required
                            placeholder="College Name"
                            value={leader.college}
                            onChange={(e) => updateLeader("college", e.target.value)}
                            className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                            style={{ borderColor: "var(--paper-dark)" }}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-semibold text-ink-deep">Semester / Year *</label>
                          <select
                            value={leader.semester}
                            onChange={(e) => updateLeader("semester", e.target.value)}
                            className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600 cursor-pointer"
                            style={{ borderColor: "var(--paper-dark)" }}
                          >
                            {SEMESTERS.map((sem, i) => (
                              <option key={i} value={sem}>{sem}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-semibold text-ink-deep">WhatsApp Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={leader.phone}
                            onChange={(e) => updateLeader("phone", e.target.value)}
                            className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                            style={{ borderColor: "var(--paper-dark)" }}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="font-body text-xs font-semibold text-ink-deep">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="leader@college.edu"
                            value={leader.email}
                            onChange={(e) => updateLeader("email", e.target.value)}
                            className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                            style={{ borderColor: "var(--paper-dark)" }}
                          />
                        </div>
                      </div>

                      {/* Radio Membership Questions for Leader */}
                      {renderMembershipQuestions(leader, updateLeader, "leader")}
                    </div>
                  </div>

                  {/* Section 3: Additional Team Members */}
                  {teamSize > 1 && (
                    <div className="flex flex-col gap-6">
                      <h3 className="font-display font-bold text-lg text-ink-deep italic flex items-center gap-2 border-b pb-2" style={{ borderColor: "rgba(11,26,48,0.08)" }}>
                        <Users className="w-5 h-5 text-ochre" />
                        3. Additional Team Members ({teamSize - 1} {teamSize - 1 === 1 ? "Member" : "Members"})
                      </h3>

                      <div className="flex flex-col gap-5">
                        {members.map((member, idx) => (
                          <div key={idx} className="p-6 rounded-2xl border bg-white/70 flex flex-col gap-5" style={{ borderColor: "var(--paper-dark)" }}>
                            <div className="flex items-center justify-between border-b pb-2">
                              <span className="font-display font-bold text-sm text-ink-deep italic">
                                Team Member 0{idx + 2}
                              </span>
                              <span className="font-mono-editorial text-[0.65rem] font-bold text-amber-700 uppercase">
                                MEMBER 0{idx + 2}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="font-body text-xs font-semibold text-ink-deep">Full Name *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Full Name"
                                  value={member.name}
                                  onChange={(e) => updateMember(idx, "name", e.target.value)}
                                  className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                                  style={{ borderColor: "var(--paper-dark)" }}
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="font-body text-xs font-semibold text-ink-deep">College / Institution *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="College Name"
                                  value={member.college}
                                  onChange={(e) => updateMember(idx, "college", e.target.value)}
                                  className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                                  style={{ borderColor: "var(--paper-dark)" }}
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="font-body text-xs font-semibold text-ink-deep">Semester / Year *</label>
                                <select
                                  value={member.semester}
                                  onChange={(e) => updateMember(idx, "semester", e.target.value)}
                                  className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600 cursor-pointer"
                                  style={{ borderColor: "var(--paper-dark)" }}
                                >
                                  {SEMESTERS.map((sem, i) => (
                                    <option key={i} value={sem}>{sem}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="font-body text-xs font-semibold text-ink-deep">Email Address *</label>
                                <input
                                  type="email"
                                  required
                                  placeholder="member@college.edu"
                                  value={member.email}
                                  onChange={(e) => updateMember(idx, "email", e.target.value)}
                                  className="px-3.5 py-2.5 rounded-lg border text-xs font-body text-ink-deep bg-[#faf7e6] focus:outline-none focus:border-amber-600"
                                  style={{ borderColor: "var(--paper-dark)" }}
                                />
                              </div>
                            </div>

                            {/* Radio Membership Questions for Member */}
                            {renderMembershipQuestions(
                              member,
                              (field, val) => updateMember(idx, field, val),
                              `member-${idx + 2}`
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 4: PDF Proposal Upload */}
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display font-bold text-lg text-ink-deep italic flex items-center gap-2 border-b pb-2" style={{ borderColor: "rgba(11,26,48,0.08)" }}>
                      <FileText className="w-5 h-5 text-ochre" />
                      4. Project Proposal PDF Submission
                    </h3>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-body text-xs font-semibold text-ink-deep">
                          Upload Project Proposal Abstract (PDF format) <span className="text-red-500">*</span>
                        </label>
                        <p className="font-mono-editorial text-[0.68rem] text-amber-800 font-medium">
                          &bull; Please name your PDF file using your Team Name before uploading (e.g., <span className="font-bold underline">{teamName ? `${teamName.replace(/\s+/g, '')}.pdf` : 'teamname.pdf'}</span>).
                        </p>
                      </div>
                      <label className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-amber-600 bg-[#faf7e6]/60 flex flex-col items-center justify-center gap-2" style={{ borderColor: pdfFile ? "var(--ochre)" : "var(--paper-dark)" }}>
                        {pdfFile ? (
                          <>
                            <FileCheck className="w-10 h-10 text-emerald-600 mb-1" />
                            <span className="font-display font-bold text-sm text-ink-deep italic">{pdfFile.name}</span>
                            <span className="font-mono-editorial text-xs text-emerald-700 font-semibold">
                              {(pdfFile.size / 1024 / 1024).toFixed(2)} MB &bull; PDF File Attached
                            </span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-10 h-10 text-amber-600 mb-1" />
                            <span className="font-body text-xs font-semibold text-ink-deep">
                              Click here to choose or drag &amp; drop your project PDF
                            </span>
                            <span className="font-mono-editorial text-[0.65rem] text-zinc-500 font-medium">
                              File naming format: <strong className="text-amber-800">{teamName ? `${teamName.replace(/\s+/g, '')}.pdf` : 'teamname.pdf'}</strong> (Max 10MB)
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".pdf"
                          required
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Section 5: Policy Declaration */}
                  <div className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ backgroundColor: "rgba(200, 146, 58, 0.06)", borderColor: "rgba(200, 146, 58, 0.25)" }}>
                    <div className="flex items-center gap-2 text-ink-deep font-display font-bold text-base italic">
                      <ShieldCheck className="w-5 h-5 text-amber-600" />
                      Policy Declaration &amp; Honor Code
                    </div>
                    <p className="font-body text-xs text-ink-mid leading-relaxed">
                      By submitting this registration, our team declares that all information provided for the team leader and members is authentic. We agree to abide by the official PROCOMM &apos;26 competition guidelines, IEEE non-plagiarism rules, academic honor codes, and decisions made by the organizing jury.
                    </p>
                    <label className="flex items-start gap-3 mt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={declared}
                        onChange={(e) => setDeclared(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-amber-600 rounded border-zinc-300 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="font-body text-xs font-semibold text-ink-deep">
                        I agree to the Policy Declaration &amp; Honor Code <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-ochre text-sm px-10 py-4 flex items-center gap-3 shadow-xl hover-lift cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>Submitting Registration...</>
                      ) : (
                        <>
                          Complete Registration
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Uploading Animation Modal Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="organic-card max-w-md w-full p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden"
                style={{
                  backgroundColor: "var(--ink-deep)",
                  border: "1.5px solid rgba(245, 240, 232, 0.2)",
                  borderRadius: "2rem",
                }}
              >
                {/* Glowing Animated Icon Container */}
                <div className="relative w-20 h-20 rounded-full bg-[#e5c97a]/10 border border-[#e5c97a]/30 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-[#e5c97a] animate-spin" />
                  <UploadCloud className="w-6 h-6 text-[#e5c97a] absolute inset-0 m-auto" />
                </div>

                <div>
                  <span className="font-mono-editorial text-xs font-bold uppercase tracking-widest text-[#e5c97a] block mb-1">
                    Uploading Proposal
                  </span>
                  <h3 className="font-display font-bold text-2xl text-ivory italic">
                    Submitting Registration
                  </h3>
                </div>

                {/* Progress Bar & Status Text */}
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-mono-editorial text-ivory/80">
                    <span className="truncate pr-2">{uploadStep}</span>
                    <span className="font-bold text-[#e5c97a]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-[#e5c97a]"
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <p className="font-body text-xs text-ivory/60 leading-relaxed">
                  Please wait while we record your team details and upload your project proposal PDF.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
