import Navbar from "@/components/Navbar.jsx";
import HeroSection from "@/components/HeroSection.jsx";
import AboutSection from "@/components/AboutSection.jsx";
import SkillsSection from "@/components/SkillsSection.jsx";
import ProjectsSection from "@/components/ProjectsSection.jsx";
import ExperienceSection from "@/components/ExperienceSection.jsx";
import GitHubSection from "@/components/GitHubSection.jsx";
import ContactSection from "@/components/ContactSection.jsx";
import Footer from "@/components/Footer.jsx";
import { useScrollSpy } from "@/hooks/use-scroll-spy.jsx";

export default function Home() {
  const activeSection = useScrollSpy(["home", "about", "skills", "projects", "experience", "contact"], 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </div>
  );
}