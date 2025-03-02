import { Navigate, RouteProps } from 'react-router-dom';
import { FC } from 'react';

interface Props extends RouteProps {
  component: React.FC<RouteProps>;
  loggedIn: boolean;
}

const ProtectedRoute: FC<Props> = ({ component: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// const ProtectedRoute = ({ loggedIn, ...props }: ProtectedRouteProps) => {
//   return loggedIn ? <Route {...props} /> : <Navigate to="/login" replace />;
// };
//
// export default ProtectedRoute;
