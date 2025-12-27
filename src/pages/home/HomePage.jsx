import { useEffect, useState } from 'react'
import './HomePage.css'
import Layout from '../../components/Layout/Layout'
import { searchVideos } from '../../utils/videoApi';
import VideoCard from '../../components/Feed/VideoCard';
import { useAppContext } from '../../context/AppContext';

export default function HomePage() {
  const { selectedCategory, searchQuery } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async() => {
      setLoading(true);

      const query = searchQuery || selectedCategory;
      const data = await searchVideos(query);
      if (data?.items) {
        setVideos(data.items);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <Layout>
      <div className='w-full max-w-550 mx-auto min-h-screen pt-5 px-6 sm:px-6 md:px-8 lg:px-12'>
        {/* Category filter */}


        {/* Videos Grid */}
        <div className="videos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <VideoCard
                key={video.id?.videoId || video.id}
                video={video}
              />
            ))
          ) : (
              <div className='no-videos h-screen flex flex-col items-center justify-center'>
              <h3>No videos found</h3>
              <p>Try searching for something else</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}