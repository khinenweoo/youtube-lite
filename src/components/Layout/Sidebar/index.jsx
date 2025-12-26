import './Sidebar.css'
import { categories } from '../../../utils/constants'
import vinh from '../../../assets/vinh.jpg'
import simon from '../../../assets/simon.png'
import tom from '../../../assets/tom.png'
import maria from '../../../assets/maria.jpg'
import nastya from '../../../assets/nastya.jpg'
import { useAppContext } from '../../../context/AppContext'
import { useLocation } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const Sidebar = () => {
  const { sidebar, setSidebar, selectedCategory, handleCategoryChange } = useAppContext();
  const location = useLocation();
  // check if we are currently on a video page
  const isVideoPage = location.pathname.includes('/video');

  const getSidebarClass = () => {
    if (isVideoPage) {
      return sidebar ? "sidebar video-overlay" : "sidebar sidebar-hidden";
    }
    return sidebar ? "sidebar" : "sidebar small-sidebar";
  }

  return (
    <>
      {/* Backdrop: only renders on video page when sidebar is open */}
      {isVideoPage && sidebar && (
        <div
          className='fixed inset-0 bg-black/50 z-40 transition-opacity duration-300'
          onClick={() => setSidebar(false)}
        />
      )}
      <div className={getSidebarClass()}>
        <ScrollArea className="h-full">
          <div className="sidebar-content">
            <div className="categories">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.query}
                    onClick={() => handleCategoryChange(category.query)}
                    className={`cat-link
                      ${selectedCategory === category.query
                        ? 'bg-zinc-900'
                        : 'hover:bg-zinc-900'
                      }`}
                  >
                    <p className='flex justify-center items-center flex-wrap'>
                      <Icon className="cat-icon text-lg md:text-xl xl:text-xl text-white" />
                      <span className='cat-name'>{category.name}</span>
                    </p>
                  </button>
                )
              })}
            </div>
            <Separator className='my-2 bg-[#535353]' />
            <div className="subscriptions py-2">
              <h3 className='text-sm xl:text-md text-white'>Subscriptions</h3>
              <div className="user-link">
                <div className="profile-icon flex justify-start items-center">
                  <img src={maria} alt="" /> <p>Maria Trapper</p>
                </div>
              </div>
              <div className="user-link">
                <div className="profile-icon flex justify-start items-center">
                  <img src={nastya} alt="" /> <p>Nastya Swan</p>
                </div>
              </div>
              <div className="user-link">
                <div className="profile-icon flex justify-start items-center">
                  <img src={vinh} alt="" /> <p>Vinh Giang</p>
                </div>
              </div>
              <div className="user-link">
                <div className="profile-icon flex justify-start items-center">
                  <img src={simon} alt="" /> <p>Simon</p>
                </div>
              </div>
              <div className="user-link">
                <div className="profile-icon flex justify-start items-center">
                  <img src={tom} alt="" /> <p>Jason Stephen</p>
                </div>
              </div>
            </div>
          </div>
          {/* Dark backdrop when sidebar is open on Video Page */}
          {isVideoPage && sidebar && (
            <div className="fixed inset-0 bg-black/50 z-[-1]" onClick={() => {/* toggle sidebar off */ }} />
          )}
        </ScrollArea>
      </div>
    </>
  )
}

export default Sidebar