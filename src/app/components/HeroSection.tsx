"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingVideo } from "@/types";

const HeroSection: React.FC = () => {
  const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const popularVideosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/mock.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedVideos = data.videos
          .sort((a: TrendingVideo, b: TrendingVideo) => b.views - a.views)
          .slice(0, 4);
        setTrendingVideos(sortedVideos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trending videos:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (trendingVideos.length > 0) {
      const timer = setInterval(() => {
        nextVideo();
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [currentVideoIndex, trendingVideos]);

  const nextVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % trendingVideos.length
    );
  };

  const scrollToPopularVideos = () => {
    popularVideosRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sentence = "Welcome to Klickshot";
  const subSentence =
    "Discover and share amazing videos from creators around the world.";

  return (
    <div className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 dark:bg-gray-800 sm:pb-16 md:pb-20 lg:flex lg:w-full lg:pb-28 xl:pb-32">
          <div className="lg:w-1/2 lg:z-20 relative">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  {sentence.split("").map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
                <motion.p
                  className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: sentence.length * 0.07 }}
                >
                  {subSentence}
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={scrollToPopularVideos}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Trending Videos
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="relative h-52 w-full sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden">
              <AnimatePresence initial={false}>
                {!isLoading && trendingVideos.length > 0 && (
                  <motion.div
                    key={currentVideoIndex}
                    className="absolute inset-0"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.5,
                    }}
                  >
                    <Link
                      href={`/video/${trendingVideos[currentVideoIndex].id}`}
                    >
                      <img
                        src={
                          trendingVideos[currentVideoIndex].thumbnail ||
                          "/placeholder.svg"
                        }
                        alt={trendingVideos[currentVideoIndex].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <h2 className="text-white text-2xl font-bold text-center px-4">
                          {trendingVideos[currentVideoIndex].title}
                        </h2>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
              )}
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={popularVideosRef} />
    </div>
  );
};
export default HeroSection;
