"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "@/types";
import { categories } from "@/data";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }

    fetch("/mock.json")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos);
        setFilteredVideos(data.videos);
        setIsLoading(false);
      });
  }, [searchParams]);

  const filterVideos = () => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((video) => video.category === category);
    }

    if (uploadDate && uploadDate !== "any") {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - parseInt(uploadDate));

      filtered = filtered.filter(
        (video) => new Date(video.uploadDate) >= dateThreshold
      );
    }

    setFilteredVideos(filtered);
  };

  useEffect(() => {
    if (videos.length > 0) {
      filterVideos();
    }
  }, [searchTerm, category, uploadDate, videos]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (value === "all") {
      router.push("/search");
    } else {
      router.push(`/search?category=${value}`);
    }
  };

  const handleUploadDateChange = (value: string) => {
    setUploadDate(value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setUploadDate("any");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-2rem">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Search Videos
          </h1>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search for videos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow"
              />
              <div className="flex gap-2">
                  
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={uploadDate} onValueChange={handleUploadDateChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Upload Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Time</SelectItem>
                      <SelectItem value="1">Last 24 hours</SelectItem>
                      <SelectItem value="7">Last week</SelectItem>
                      <SelectItem value="30">Last month</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
              <Button className="text-nowrap" onClick={resetFilters}>Reset Filters</Button>

              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="w-full aspect-w-16 aspect-h-9 rounded-lg" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
              : filteredVideos.map((video) => (
                  <Link
                    key={video.id}
                    href={`/video/${video.id}`}
                    className="group"
                  >
                    <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {video.views.toLocaleString()} views •{" "}
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SearchPage;
