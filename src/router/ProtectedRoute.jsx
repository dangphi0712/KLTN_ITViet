import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import config from '../config';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
	const user = useSelector(state => state?.user);

	if (!user?.accessToken) {
		return <Navigate to={config.routes.login} />;
	}

	return <>{children}</>;
};
