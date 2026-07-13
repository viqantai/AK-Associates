import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Approvals from '@/components/Approvals';
import Team from '@/components/Team';
import Consultation from '@/components/Consultation';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Consultation />
        <Services />
        <Approvals />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
