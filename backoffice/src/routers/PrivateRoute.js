import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children, isAuisAuthenticated }) {
  return isAuisAuthenticated ? children : <Navigate to="/login" />;
}
