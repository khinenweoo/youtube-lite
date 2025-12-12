import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppContext } from "../../context/AppContext";

export default function Layout({ children }) {
    const {
        sidebar,
        setSidebar,
        selectedCategory,
        handleCategoryChange,
        handleSearch
    } = useAppContext();


    return (
        <>
            <div className="ytd-wrapper">
                <Navbar setSidebar={setSidebar} onSearch={handleSearch} />
                <Sidebar 
                    sidebarMenu={sidebar} 
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />

                <main className="app-main">
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