import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import './Navbar.css'
import menu_icon from '../../../assets/menu.png'
import logo from '../../../assets/utube-logo.png'
import noti_icon from '../../../assets/notification.png'
import profile_icon from '../../../assets/jack.png'
import { useAppContext } from '../../../context/AppContext';

const Navbar = () => {
    const { setSidebar, handleSearch, handleCategoryChange, searchQuery } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchTerm(searchQuery);
    }, [searchQuery])

    const onSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            handleSearch(searchTerm);
            setShowMobileSearch(false); // Close mobile search after submit
            navigate('/');
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        handleCategoryChange('new'); // Reset to default category
    }

    return (
        <nav className="navbar">
            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="mobile-search-overlay">
                    <button
                        className="close-search-btn"
                        onClick={() => setShowMobileSearch(false)}
                    >
                        <FiX className="text-2xl" />
                    </button>
                    <div className='search-box mobile-search-box'>
                        <form onSubmit={onSearch}>
                            <input
                                type="text"
                                name='search'
                                placeholder="Search videos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    type='button'
                                    className='clear-search-btn'
                                    onClick={handleClearSearch}
                                >
                                    <Fix className="text-lg" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="search-button"
                            >
                                <FiSearch className="search-icon" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Regular Navbar */}
            <div className='navbar-left'>
                <img
                    src={menu_icon}
                    onClick={() => setSidebar(prev => !prev)}
                    alt="menu"
                    className='menu-icon'
                />
                <Link to="/" className="logo-container">
                    <img src={logo} alt="logo" className='logo' />
                    <span className="logo-text">KTube</span>
                </Link>
            </div>

            <div className='navbar-middle'>
                <div className='search-box desktop-search-box'>
                    <form onSubmit={onSearch}>
                        <input
                            type="text"
                            name='search'
                            placeholder="Search videos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="clear-search-btn"
                                onClick={handleClearSearch}
                            >
                                <FiX className="text-lg" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="search-button"
                        >
                            <FiSearch className="search-icon" />
                        </button>
                    </form>
                </div>
            </div>

            <div className='navbar-right'>
                <button
                    className="mobile-search-btn"
                    onClick={() => setShowMobileSearch(true)}
                >
                    <FiSearch className="text-xl" />
                </button>
                <img src={noti_icon} alt="notifications" className="desktop-icon" />
                <img src={profile_icon} alt="profile" className='user-icon' />
            </div>
        </nav>
    );
};

export default Navbar;