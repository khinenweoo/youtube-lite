import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedCategory(''); // Clear category when searching
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery(''); // Clear search when selecting category
    };

    const value = {
        sidebar,
        setSidebar,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        handleSearch,
        handleCategoryChange,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

