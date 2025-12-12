import './VideoCard.css'
import { useNavigate } from 'react-router-dom';

const VideoCard = ({video}) => {
const navigate = useNavigate();
const videoId = video.id?.videoId || video.id;
const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url;
const title = video.snippet?.title;
const channelTitle = video.snippet?.channelTitle;
const publishedAt =video.snippet?.publishedAt;
const duration = video.contentDetails?.duration || '';


  return (
    <div
      className='video-card'
      onClick={() => navigate(`/video/${videoId}`)} 
    >
      <div className="thumbnail-container">
        <img 
          src={thumbnail}
          alt={title}
          className='thumbnail'
        />
        {duration && (
          <span className='duration'>{duration}</span>
        )}
      </div>
      <div className="video-details">
        <div className="channel-icon">
          <div className="channel-avatar">
            {channelTitle?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="channel-name">{channelTitle}</p>
          <div className="video-metada">
            <span>3 view</span>
            {publishedAt && (
              <>
                <span className='dot'>.</span>
                <span>{publishedAt}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;