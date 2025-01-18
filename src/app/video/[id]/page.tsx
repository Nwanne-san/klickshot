"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Navbar";
import { VideoPlayer } from "@/app/components/VideoPlayer";
import { VideoDetails } from "@/app/components/VideoDetails";
import { RecommendedVideos } from "@/app/components/RecommendedVideos";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "@/types";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/mock.json")
      .then((response) => response.json())
      .then((data) => {
        const foundVideo = data.videos.find((v: Video) => v.id === id);
        setVideo(foundVideo || null);

        const recommended = data.videos.filter((v: Video) => v.id !== id);
        setRecommendedVideos(recommended);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-[4rem]">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              {isLoading ? (
                <>
                  <Skeleton className="w-full aspect-w-16 aspect-h-9 rounded-lg mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                </>
              ) : video ? (
                <>
                  <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail}  />
                  <VideoDetails video={video} />
                </>
              ) : (
                <p className="text-gray-900 dark:text-white">Video not found</p>
              )}
            </div>
            <div className="lg:w-1/3">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex space-x-4">
                      <Skeleton className="w-40 h-24" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <RecommendedVideos
                  videos={recommendedVideos}
                  currentCategory={video?.category || ""}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
