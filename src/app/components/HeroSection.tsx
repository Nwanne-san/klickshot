"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingVideo } from "@/types";
import Image from "next/image";

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
    <div className="relative h-[50vh] sm:h-[80vh] lg:[90vh] py-5 bg-gray-50 dark:bg-gray-900 overflow-hidden pt-[4rem] bg-[url'/5427576.mp4')] ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/5427576.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-transparent dark:bg sm:pb-16 md:pb-20 lg:flex lg:w-full lg:pb-28 xl:pb-32">
          <div className="sm:w-2/3 lg:z-20 relative py-5">
            <main className="mt-28 mx-auto max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-16 lg:mt-28 lg:px-8 xl:mt-36 flex sm:block flex-col h-full justify-end items-center w-full">
              <div className="sm:text-cnter lg:text-left">
                <h1 className="mt-5 text-3xl md:text-6xl sm:leading-[50px] font-extrabold text-white dark:text-white sm:text-5xl ">
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
                  className="mt-3 text-base text-center sm:text-start flex justify-center text-white max-w-72 sm:text-lg sm:max-w-md sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: sentence.length * 0.07 }}
                >
                  {subSentence}
                </motion.p>
                <div className="mt-4 flex sm:block justify-center lg:justify-start">
                  <div className="rounded-md sm:shadow">
                    <button
                      onClick={scrollToPopularVideos}
                      className="w-fit flex items-center gap-2 justify-center px-4 py-1.5 sm:px-8 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Watch Videos
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="hidden sm:absolute t-8  inset-y-0 right-0 sm:w-1/2">
            <div className="relative h-52 w-full sm:h-72 md:h-80 lg:w-full  overflow-hidden">
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
                      <Image
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
