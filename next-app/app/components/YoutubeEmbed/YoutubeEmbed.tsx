import React from 'react'

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    return (
        <div className="aspect-w-16 aspect-h-9 m-5 ">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}?origin=http://localhost:3000&showinfo=0&video-id=${videoId}&enablejsapi=1&widgetid=1&color=white&modestbranding=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default YouTubeEmbed