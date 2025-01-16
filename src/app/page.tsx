import Header from "@/components/layout/Navbar";
import HeroSection from "./components/HeroSection";
import { VideoGrid } from "./components/VideoGrid";
import { sampleVideos } from "@/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <HeroSection />
      <VideoGrid videos={sampleVideos} />
    </div>
  );
}
