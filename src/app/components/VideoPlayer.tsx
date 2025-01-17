export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
    return (
      <div className="aspect-w-16 aspect-h-6 mb-4">
        <video
          className="w-full h-[50vh] lg:h-[70vh] object-cover "
          controls
          preload="metadata"
          poster="/placeholder.svg?height=720&width=1280"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
  
  