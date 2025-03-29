import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/Hero";
import AboutUs from "@/components/About";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div>
      
    <div>
      <NavBar/>
    </div>
      <HeroSection/>
      <AboutUs/>
      <Footer/>
    </div>

    
  );
}
