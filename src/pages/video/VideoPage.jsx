import React, { useState, useEffect } from 'react';
import './VideoPage.css'
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, MessageSquare } from 'lucide-react';
import { getVideoDetails, getRelatedVideos, getVideoComments } from '../../utils/videoApi';
import VideoCard from '../../components/Feed/VideoCard';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Layout from '@/components/Layout/Layout';
import { useAppContext } from '@/context/AppContext';

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [videoComments, setVideoComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSidebar } = useAppContext();

  useEffect(() => {
    // Set sidebar to close whenever we enter the Video Page
    setSidebar(false);

    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const [details, related, comments] = await Promise.all([
          getVideoDetails(videoId),
          getRelatedVideos(videoId),
          getVideoComments(videoId),
        ]);

        if (details?.items?.[0]) setVideoDetails(details.items[0]);
        if (related?.items) setRelatedVideos(related.items);
        if (comments?.items) setVideoComments(comments.items);
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    window.scrollTo(0, 0);
  }, [videoId, setSidebar]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!videoDetails) return <div className="text-white text-center mt-20">Video not found.</div>;

  const { snippet, statistics } = videoDetails;

  return (
    <Layout>
      <div className="w-full max-w-450 mx-auto pt-4 pb-10 px-6 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* LEFT COLUMN: Player & Info */}
          <div className="lg:col-span-8">
            {/* Video Player */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-zinc-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={snippet?.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Title and Channel Section */}
            <div className="mt-4 space-y-4 text-white">
              <h1 className="text-xl font-bold line-clamp-2">{snippet?.title}</h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-zinc-700">
                    <AvatarImage src={snippet?.thumbnails?.default?.url} />
                    <AvatarFallback>{snippet?.channelTitle[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base leading-tight">{snippet?.channelTitle}</p>
                    <p className="text-sm text-zinc-400">1.2M subscribers</p>
                  </div>
                  <Button className="ml-4 bg-white text-black hover:bg-zinc-200 rounded-full font-medium px-4">
                    Subscribe
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden">
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-zinc-700 px-4 py-2 border-r border-zinc-700 rounded-none">
                      <ThumbsUp size={20} />
                      <span>{parseInt(statistics?.likeCount || 0).toLocaleString()}</span>
                    </Button>
                    <Button variant="ghost" className="hover:bg-zinc-700 px-4 py-2 rounded-none">
                      <ThumbsDown size={20} />
                    </Button>
                  </div>
                  <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-full gap-2">
                    <Share2 size={18} /> Share
                  </Button>
                  <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-full h-10 w-10 p-0">
                    <MoreHorizontal size={20} />
                  </Button>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 text-sm cursor-pointer transition-colors">
                <div className="font-bold mb-1">
                  {parseInt(statistics?.viewCount || 0).toLocaleString()} views • {new Date(snippet?.publishedAt).toLocaleDateString()}
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {snippet?.description}
                </p>
                <button className="font-bold mt-2">...more</button>
              </div>

              {/* Comments Placeholder */}
              <div className="mt-6">
                <div className="flex items-center gap-6 mb-6">
                  <h3 className="text-xl font-bold"><span className='total-comments'>{videoComments.length}</span> Comments</h3>
                  <span className="text-zinc-400">Sort by</span>
                </div>
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-zinc-700 focus:border-white focus:outline-none pb-2 text-sm"
                  />
                </div>
              </div>
              {/* Comments Section */}
              <div className='my-6'>
                {videoComments.length === 0 ? (
                  <p className="text-zinc-400">No comments available.</p>
                ) : (
                  videoComments.map((commentItem, index) => {
                    const comment = commentItem.snippet.topLevelComment.snippet;
                    return (
                      <div key={index} className="flex mb-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={comment.authorProfileImageUrl} />
                          <AvatarFallback>{comment.authorDisplayName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="font-bold">{comment.authorDisplayName}</div>
                          <div className="text-sm">{comment.textOriginal}</div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>


            </div>
          </div>

          {/* RIGHT COLUMN: Related Videos */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Related', 'Recently uploaded', 'Watched'].map((chip) => (
                <Button key={chip} variant="secondary" size="sm" className="rounded-lg bg-zinc-800 whitespace-nowrap">
                  {chip}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {relatedVideos.map((video, index) => (
                <VideoCard
                  key={`${video.id?.videoId || video.id}-${index}`}
                  video={video}
                  variant="horizontal" // You might need to update VideoCard to support a smaller side layout
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPage;