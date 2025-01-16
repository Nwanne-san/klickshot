export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
    return (
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <video
          className="w-full h-full object-cover"
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
  
  