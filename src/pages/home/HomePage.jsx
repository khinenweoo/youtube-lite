import { useEffect, useState } from 'react'
import './HomePage.css'
import Layout from '../../components/Layout/Layout'
import { searchVideos } from '../../utils/videoApi';
import VideoCard from '../../components/Feed/VideoCard';
import { useAppContext } from '../../context/AppContext';


export default function HomePage() {
  const { sidebar, selectedCategory, searchQuery } = useAppContext();
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
      <div className={`container ${sidebar? "": "large-container"}`}>

        {/* Category filter */}


        {/* Videos Grid */}
        <div className="videos-grid">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <VideoCard
                key={video.id?.videoId || video.id}
                video={video}
              />
            ))
          ) : (
            <div className='no-videos'>
              <h3>No videos found</h3>
              <p>Try searching for something else</p>
            </div>
          )}
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {videos? videos.map((video) => (
            <VideoCard key={`${video.id?.videoId || video.id}`} video={video}/>
          )) : (
            <>No videos found</>
          )}
        </div>
      </div>
    </Layout>
  )
}