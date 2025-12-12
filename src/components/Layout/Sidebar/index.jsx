import './Sidebar.css'
import { categories } from '../../../utils/constants'
import vinh from '../../../assets/vinh.jpg'
import simon from '../../../assets/simon.png'
import tom from '../../../assets/tom.png'
import maria from '../../../assets/maria.jpg'
import nastya from '../../../assets/nastya.jpg'
import { useAppContext } from '../../../context/AppContext'

const Sidebar = () => {
    const { sidebar, selectedCategory, handleCategoryChange } = useAppContext();
  return (
    <div className={`sidebar ${sidebar? "": "small-sidebar"}`}>
        <div id="guide-content" className='sidebar-content'>
              <div id="guide-inner-content" className='content-wrapper'>
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
                                <p className='flex justify-start items-center flex-wrap'>
                                    <Icon className="cat-icon text-lg md:text-xl xl:text-xl text-white" />
                                    <span className='cat-name'>{category.name}</span>
                                </p>
                            </button>
                        )
                    })}
                  </div>
                  <hr />
                  <div className="subscriptions">
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
        </div>
    </div>
  )
}

export default Sidebar