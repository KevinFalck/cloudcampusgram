import { createContext, useContext, useEffect, useState } from 'react';
import { fetchHomeFeed, fetchMainUser, fetchUsers } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [mainUser, setMainUser] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [feedData, usersData, userData] = await Promise.all([
        fetchHomeFeed(),
        fetchUsers(),
        fetchMainUser(),
      ]);
      setFeedItems(feedData || []);
      setUsers(usersData);
      setMainUser(userData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AppContext.Provider
      value={{
        feedItems,
        users,
        mainUser,
        likedPosts,
        loading,
        isLoggedIn,
        toggleLike,
        setFeedItems,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
