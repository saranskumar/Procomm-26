import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, BarChart3, Image as ImageIcon, Milestone, BookOpen, Target, Sparkles } from "lucide-react";

export default function AboutPage() {
  const objectives = [
    "Foster a culture of hands-on systems design and validation among engineering students.",
    "Introduce students to standard specifications and protocols (IEEE 802.11, 3GPP, IETF RFCs).",
    "Identify high-potential prototypes and guide them towards commercial incubation or academic publication.",
    "Cultivate academic excellence and networking by engaging IEEE student branches across the region.",
  ];

  const committee = {
    advisors: [
      { name: "Dr. Elizabeth Varghese", role: "Chairperson, IEEE ComSoc Kerala Chapter" },
      { name: "Prof. Manoj Kumar P.", role: "Vice-Chair, IEEE Kerala Section" },
      { name: "Dr. Mathew J. Joseph", role: "Principal Advisor, Saintgits College" },
    ],
    core: [
      { name: "Ms. Anjana Harikrishnan", role: "General Program Chair, PROCOMM '26" },
      { name: "Mr. Ranjith R. Nair", role: "Technical Program Chair" },
      { name: "Ms. Parvathy S. Kumar", role: "Finance Chair" },
      { name: "Mr. Sidharth G. Nair", role: "Operations Coordinator" },
    ],
    volunteers: [
      "Anoop S. (Saintgits SB)", "Riya Mathews (KIT SB)", "Rahul R. (GEC SB)", "Sandra K. (TKM SB)", "George K. (MEC SB)"
    ],
  };

  const historyEditions = [
    { year: "2022", host: "Govt. Engineering College, Barton Hill", milestone: "Inaugural edition with 40+ project teams in wireless communications." },
    { year: "2023", host: "TKM College of Engineering, Kollam", milestone: "Expanded to include IoT & smart city grids, drawing 75+ registrations." },
    { year: "2024", host: "Model Engineering College, Thrikkakara", milestone: "Focused on AI/ML in networking and protocol optimization." },
    { year: "2025", host: "Government Engineering College, Thrissur", milestone: "Hosted cybersecurity audits and threat intelligence showcases." },
  ];

  const stats = [
    { value: "400+", label: "Participants" },
    { value: "45+", label: "Colleges" },
    { value: "180+", label: "Projects Submitted" },
    { value: "25+", label: "Industry Judges" },
    { value: "12+", label: "Sponsors & Partners" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-retro-cream select-none">
        
        {/* Banner Section */}
        <section className="relative w-full py-16 px-6 border-b-[3px] border-retro-brown text-center retro-grid-bg">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="bg-retro-brown text-retro-cream px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase rounded-full border border-retro-brown shadow-sm mb-4">
              ABOUT US
            </span>
            <h1 className="retro-text-3d text-4xl sm:text-6xl md:text-[68px] leading-tight select-text">
              ORGANIZATION
            </h1>
            <p className="font-syne text-xs sm:text-sm md:text-base font-bold tracking-widest text-retro-brown uppercase mt-6 max-w-3xl">
              IEEE COMMUNICATIONS SOCIETY KERALA CHAPTER
            </p>
          </div>
        </section>

        {/* 1. About PROCOMM (Introduction, Vision, Mission, Objectives) */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70 flex items-center gap-2">
                <Target className="w-4 h-4" />
                [ Vision & Mission ]
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown">
                Core Directives
              </h2>
              <div className="w-20 h-1 bg-retro-brown my-2" />
              
              <div className="mt-4">
                <h4 className="font-syne text-sm font-bold text-retro-brown uppercase tracking-wider">Vision</h4>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-1">
                  To establish Kerala as a hub of systems engineering and protocol innovation by training the next generation of communications engineers.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-syne text-sm font-bold text-retro-brown uppercase tracking-wider">Mission</h4>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-1">
                  To provide engineering students with resources, mentorship, and industrial platforms to build prototypes that solve societal connectivity challenges.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-10 shadow-[5px_5px_0px_rgba(93,58,26,0.1)]">
              <h3 className="font-syne text-lg font-bold text-retro-brown flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 stroke-[2]" />
                PROCOMM Objectives
              </h3>
              
              <ul className="flex flex-col gap-4">
                {objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-3 items-start font-outfit text-xs sm:text-sm text-retro-brown/90 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-retro-cream border border-retro-brown flex items-center justify-center font-mono text-[10px] font-bold text-retro-brown flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* 2. Theme of PROCOMM'26 */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Focal Area ]</span>
            
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
              Theme of PROCOMM &apos;26
            </h2>
            
            <div className="border-2 border-retro-brown bg-retro-cream p-6 rounded-2xl shadow-[4px_4px_0px_#5d3a1a] mt-8 text-left">
              <h3 className="font-syne text-lg font-bold text-retro-brown flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-retro-brown" />
                Next-Gen Communication Systems
              </h3>
              <p className="font-outfit text-xs sm:text-sm text-retro-brown/85 leading-relaxed mt-4">
                The rapid convergence of AI with telecommunications, the deployment of 5G Non-Public Networks, and the design of low-power IoT networks are shifting the paradigms of networking. Under this light, the theme for this edition challenges students to construct systems utilizing Software Defined Radios, secure cryptographic key exchanges, or network telemetry platforms.
              </p>
            </div>
          </div>
        </section>

        {/* 3. About IEEE Communications Society */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Parent Organizations ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                About IEEE & ComSoc
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                <h3 className="font-syne text-base font-bold text-retro-brown uppercase tracking-wide">IEEE</h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4">
                  The Institute of Electrical and Electronics Engineers is the world&apos;s largest technical professional organization dedicated to advancing technology for the benefit of humanity.
                </p>
              </div>

              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                <h3 className="font-syne text-base font-bold text-retro-brown uppercase tracking-wide">IEEE ComSoc</h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4">
                  The IEEE Communications Society promotes technological innovation and fosters international technical exchanges in the area of communications and information networking.
                </p>
              </div>

              <div className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                <h3 className="font-syne text-base font-bold text-retro-brown uppercase tracking-wide">ComSoc Kerala</h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4">
                  The local chapter provides local student and professional members in Kerala with technical lectures, symposia, research exposure, and specialized workshops like PROCOMM.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Organizing Committee */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Organizers ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3 animate-pulse">
                Organizing Committee
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Faculty Advisors */}
              <div>
                <h3 className="font-syne text-lg font-bold text-retro-brown border-b border-retro-brown pb-2 mb-6">
                  Faculty Advisors
                </h3>
                <div className="flex flex-col gap-4">
                  {committee.advisors.map((member, idx) => (
                    <div key={idx} className="bg-retro-cream border-2 border-retro-brown rounded-xl p-4 shadow-sm">
                      <div className="font-syne text-sm font-extrabold text-retro-brown">{member.name}</div>
                      <div className="font-outfit text-xs text-retro-brown/70 mt-1">{member.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Executive Team */}
              <div>
                <h3 className="font-syne text-lg font-bold text-retro-brown border-b border-retro-brown pb-2 mb-6">
                  Core Executive Team
                </h3>
                <div className="flex flex-col gap-4">
                  {committee.core.map((member, idx) => (
                    <div key={idx} className="bg-retro-cream border-2 border-retro-brown rounded-xl p-4 shadow-sm">
                      <div className="font-syne text-sm font-extrabold text-retro-brown">{member.name}</div>
                      <div className="font-outfit text-xs text-retro-brown/70 mt-1">{member.role}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Student Volunteers */}
            <div className="mt-12 border-t-2 border-retro-brown/15 pt-8">
              <h3 className="font-syne text-base font-bold text-retro-brown mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Student Volunteers
              </h3>
              <div className="flex flex-wrap gap-2">
                {committee.volunteers.map((vol, idx) => (
                  <span key={idx} className="bg-retro-cream border border-retro-brown rounded-full px-3 py-1 text-xs font-mono text-retro-brown">
                    {vol}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 5. Past Editions */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Legacy ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Past Editions
              </h2>
            </div>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {historyEditions.map((edition, idx) => (
                <div key={idx} className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 shadow-[3px_3px_0px_#5d3a1a] flex gap-4 items-start">
                  <div className="w-12 h-12 rounded bg-retro-cream border border-retro-brown flex items-center justify-center font-syne text-lg font-black text-retro-brown flex-shrink-0">
                    {edition.year}
                  </div>
                  <div>
                    <h3 className="font-syne text-sm sm:text-base font-extrabold text-retro-brown flex items-center gap-2">
                      <Milestone className="w-4 h-4" />
                      Host: {edition.host}
                    </h3>
                    <p className="font-outfit text-xs sm:text-sm text-retro-brown/70 mt-1">
                      {edition.milestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Statistics */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white select-text">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Impact Data ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Competition History Statistics
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-retro-cream border-2 border-retro-brown rounded-xl p-6 text-center shadow-[3px_3px_0px_#5d3a1a]">
                  <div className="font-syne text-3xl sm:text-4xl font-black text-retro-brown">{stat.value}</div>
                  <div className="font-mono text-[9px] font-bold text-retro-brown/60 uppercase tracking-widest mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. Gallery */}
        <section className="py-20 px-6 bg-retro-cream">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Media Highlights ]</span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                Event Gallery
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((val) => (
                <div key={val} className="aspect-video bg-retro-white border-[3px] border-retro-brown rounded-[20px] shadow-[4px_4px_0px_#5d3a1a] flex flex-col items-center justify-center p-4">
                  <ImageIcon className="w-10 h-10 text-retro-brown/40 mb-3" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-retro-brown/50">Highlight Photo 0{val}</span>
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
