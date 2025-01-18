export function VideoPlayer({
  videoUrl,
  thumbnail,
}: {
  videoUrl: string;
  thumbnail: string;
}) {
  return (
    <div className="aspect-w-16 aspect-h-6 mb-4">
      <video
        className="w-full h-[30vh] sm:h-[50vh] lg:h-[60vh] object-cover "
        controls
        preload="metadata"
        poster={thumbnail}
        autoPlay
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
