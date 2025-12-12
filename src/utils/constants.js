// export const categories = [
//     { id: 1, name: 'Home', query: 'new' },
//     { id: 2, name: 'Trending', query: 'trending' },
//     { id: 3, name: 'Music', query: 'music' },
//     { id: 4, name: 'Gaming', query: 'gaming' },
//     { id: 5, name: 'News', query: 'news' },
//     { id: 6, name: 'Sports', query: 'sports' },
//     { id: 7, name: 'Movies', query: 'movies' },
//     { id: 8, name: 'Live', query: 'live' },
// ]

import { FiHome, FiTrendingUp, FiMusic, FiFilm, FiRadio } from 'react-icons/fi';
import { MdSports, MdGames, MdNewspaper } from 'react-icons/md';
export const categories = [
    { id: 1, name: 'Home', icon: FiHome, query: 'new' },
    { id: 2, name: 'Trending', icon: FiTrendingUp, query: 'trending' },
    { id: 3, name: 'Music', icon: FiMusic, query: 'music' },
    { id: 4, name: 'Gaming', icon: MdGames, query: 'gaming' },
    { id: 5, name: 'News', icon: MdNewspaper, query: 'news' },
    { id: 6, name: 'Sports', icon: MdSports, query: 'sports' },
    { id: 7, name: 'Movies', icon: FiFilm, query: 'movies' },
    { id: 8, name: 'Live', icon: FiRadio, query: 'live' },
];