import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactBanner from "@/components/ContactBanner";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | PROCOMM '26",
  description: "Contact the PROCOMM '26 organizing team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">

        {/* ── Banner ── */}
        <ContactBanner />

        {/* ── Contact Details ── */}
        <ContactForm />

      </main>
      <Footer />
    </div>
  );
}
