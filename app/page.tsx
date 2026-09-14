import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Ambience from "@/components/Ambience";
import CuisineShowcase from "@/components/CuisineShowcase";
import EventsSection from "@/components/EventsSection";
import MenuPreview from "@/components/MenuPreview";
import ReservationSection from "@/components/ReservationSection";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Ambience />
      <CuisineShowcase />
      <EventsSection />
      <MenuPreview />
      <ReservationSection />
      <Gallery />
      <Location />
      <Footer />
    </main>
  );
}
