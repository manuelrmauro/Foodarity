import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, isAuisAuthenticated }) => {
  return isAuisAuthenticated ? <Navigate to="/" /> : children;
};
