import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Video } from "@/types";

export function VideoDetails({ video }: { video: Video }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {video.title}
      </h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          {video.views.toLocaleString()} views •{" "}
          {new Date(video.uploadDate).toLocaleDateString()}
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <ThumbsUp className="w-5 h-5 mr-1" />
            Like
          </button>
          <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <MessageCircle className="w-5 h-5 mr-1" />
            Comment
          </button>
          <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Share2 className="w-5 h-5 mr-1" />
            Share
          </button>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
    </div>
  );
}
