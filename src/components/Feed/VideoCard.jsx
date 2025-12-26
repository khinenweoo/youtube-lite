import './VideoCard.css'
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({video}) => {
  const navigate = useNavigate();
  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url;
  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const publishedAt = video.snippet?.publishedAt;

  const getTimeAgo = (date) => {
    if (!date) return '';
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return '';
    }
  }

  const handleNavigateToVideo = (e) => {
    e.preventDefault();
    if (videoId) {
      navigate(`/video/${videoId}`);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNavigateToVideo(e);
    }
  }

  return (
    <div
      className='video-card'
      onClick={handleNavigateToVideo}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Watch ${title}`}
    >
      <div className="thumbnail-container">
        <img 
          src={thumbnail}
          alt={title}
          className='thumbnail'
        />
      </div>
      <div className="video-details">
        <div className="channel-icon">
          <div className="channel-avatar">
            {channelTitle?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <div className="video-metadata">
            <p className="channel-name">{channelTitle}</p>
            {publishedAt && (
              <>
                <span className="dot">•</span>
                <span>{getTimeAgo(publishedAt)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;