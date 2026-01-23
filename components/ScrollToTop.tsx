import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * This component listens for route changes and automatically scrolls
 * the window to the top of the page when navigating between routes.
 *
 * How it works:
 * - useLocation() returns an object with the current URL info
 * - pathname is the URL path (e.g., "/about", "/contact")
 * - useEffect() runs whenever pathname changes
 * - window.scrollTo(0, 0) scrolls to coordinates (x: 0, y: 0) - the top-left
 *
 * This component renders nothing (null) - it only provides behavior.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top-left corner of the page
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array: re-run effect when pathname changes

  return null; // This component doesn't render any UI
};

export default ScrollToTop;
