import Hero from "../Home/Hero";
import ImageSlider from "../Home/ImageSlider";
import CommunitiesSection from "../Home/CommunitiesSection";
import StatsSection from "../Home/StatsSection";
import VisionSection from "../Home/VisionSection";
import AmenitiesSection from "../Home/AmenitiesSection";
import UltraModernSection from "../Home/UltraModernSection";



export default function Home() {
  return (
    <div>
      {/* Section 1 */}
       <Hero/>
      {/* Section 2 */}
       <ImageSlider/>
      {/* Section 3 */}
       <CommunitiesSection/>
      {/* Section 4 */}
       <StatsSection/>
      {/* Section 5 */}
       <VisionSection/>
      {/* Section 6 */}
       <AmenitiesSection/>
      {/* Section 7 */}
       <UltraModernSection/>



    </div>
  )
}
