import DemoSection from "@/components/Home/DemoSection";
import HomeSection from "@/components/Home/HomeSection";
import HowItWorks from "@/components/Home/HowItWorks";
import BgGradient from "@/components/common/bgGradient";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HomeSection />
        <DemoSection />
        <HowItWorks />
      </div>
    </div>
  );
}
