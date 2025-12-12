import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../../components/Feed/VideoCard';
import { getVideoDetails, getRelatedVideos } from '../../utils/videoApi';

const VideoPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      const details = await getVideoDetails(id);
      const related = await getRelatedVideos(id);

      if (details?.items?.[0]) {
        setVideoDetails(details.items[0]);
      }
      if (related?.items) {
        setRelatedVideos(related.items);
      }
      setLoading(false);
    };

    fetchVideoData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <div className="ml-64 mt-16 p-8">
        <div className="text-center text-gray-600">Video not found</div>
      </div>
    );
  }

  const { snippet, statistics } = videoDetails;

  return (
    <div className="ml-64 mt-16 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative pb-[56.25%] bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={snippet?.title}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{snippet?.title}</h1>
            <div className="flex items-center justify-between mt-4">
              <p className="font-semibold text-lg">{snippet?.channelTitle}</p>
              <div className="flex space-x-4 text-gray-600">
                <span>{parseInt(statistics?.viewCount || 0).toLocaleString()} views</span>
                <span>{parseInt(statistics?.likeCount || 0).toLocaleString()} likes</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{snippet?.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Related Videos</h2>
          {relatedVideos.map((video, index) => (
            <VideoCard key={`${video.id?.videoId || video.id}-${index}`} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;