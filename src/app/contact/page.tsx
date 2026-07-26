import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactBanner from "@/components/ContactBanner";
import WaveDivider from "@/components/WaveDivider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | PROCOMM '26",
  description: "Contact the IEEE Communications Project Competition organizing committee with any inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">
        <ContactBanner />
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />
        <div style={{ backgroundColor: "var(--paper)" }} className="py-2">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
