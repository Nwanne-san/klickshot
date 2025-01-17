/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Play } from "lucide-react";
import { Video } from "@/types";

interface RecommendedVideosProps {
  videos: Video[];
  currentCategory: string;
}

export function RecommendedVideos({
  videos,
  currentCategory,
}: RecommendedVideosProps) {
  const filteredVideos = videos
    .filter((video) => video.category === currentCategory)
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-black shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        More from {currentCategory}
      </h2>
      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="flex space-x-4 group relative"
          >
            <div className="flex-shrink-0 w-40 group relative">
              <img
                src={video.thumbnail || "/placeholder.svg?height=90&width=160"}
                alt={video.title}
                className="w-full h-auto object-cover rounded transition-opacity group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {video.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {video.views.toLocaleString()} views •{" "}
                {new Date(video.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
