import Header from "@/components/Header";
import AboutAndTracks from "@/components/AboutAndTracks";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AboutAndTracks />
      </main>
      <Footer />
    </div>
  );
}
