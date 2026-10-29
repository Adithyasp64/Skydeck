import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpcomingEvents from "@/components/UpcomingEvents";
import Experience from "@/components/Experience";
import Ambience from "@/components/Ambience";
import CuisineShowcase from "@/components/CuisineShowcase";
import EventsSection from "@/components/EventsSection";
import MenuPreview from "@/components/MenuPreview";
import ReservationSection from "@/components/ReservationSection";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import EventPopup from "@/components/EventPopup";
import { getUpcomingEvents } from "@/lib/sanityEvents";
import InstagramFloat from "@/components/InstagramFloat";

export default async function Home() {
  const events = await getUpcomingEvents();

  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <UpcomingEvents events={events} />
      <Experience />
      <Ambience />
      <CuisineShowcase />
      <EventsSection />
      <MenuPreview />
      <ReservationSection />
      <Gallery />
      <Location />
      <Footer />
      <EventPopup />
      <InstagramFloat />
    </main>
  );
}