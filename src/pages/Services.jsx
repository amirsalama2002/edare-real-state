import ServerSection from "../Server/ServerSection";
import BinghattiStyleServer from "../Server/BinghattiStyleServer"; 
import FuturisticServerSection from "../Server/FuturisticServerSection";
import LuxuryEstateSection from "../Server/LuxuryEstateSection";
import LuxuryHero from "../Server/LuxuryHero";
import PhilosophySection from "../Server/PhilosophySection";
import VisionaryTeam from "../Server/VisionaryTeam";
import HeritageAjmanProperties from "../components/HeritageAjmanProperties";



export default function Services() {
  return (
    <div>
      <LuxuryHero/>
      <PhilosophySection/>
      <ServerSection />
      <BinghattiStyleServer />
      <FuturisticServerSection/>
      <LuxuryEstateSection/>
      <VisionaryTeam/>

    </div>
  )
}
