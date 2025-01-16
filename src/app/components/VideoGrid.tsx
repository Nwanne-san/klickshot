import Link from "next/link";
import { Play } from "lucide-react";
// import Image from "next/image";
import { Video } from "@/types";

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Popular Videos
        </h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              className="group relative"
            >
              <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-center object-cover transition-opacity group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                {video.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {video.views.toLocaleString()} views • {video.uploadDate}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
