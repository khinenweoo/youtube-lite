import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const {
        sidebar,
        setSidebar,
        selectedCategory,
        handleCategoryChange,
        handleSearch
    } = useAppContext();
    const location = useLocation();
    const isVideoPage = location.pathname.includes('/video');

    const getContainerClass = () => {
        if (isVideoPage) {
            return 'ml-0';
        }
        return sidebar ? "small-container" : "large-container";
    }
    return (
        <>
            <div className="ytd-wrapper">
                <Navbar setSidebar={setSidebar} onSearch={handleSearch} />
                <Sidebar 
                    sidebarMenu={sidebar} 
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />
                <main className={`app-main transition-all duration-300 ${getContainerClass()}`}>
                    {children ?? (
                        <>
                            <p>Content goes here.</p>
                        </>
                    )}
                </main>

            </div>
        </>
    )
}