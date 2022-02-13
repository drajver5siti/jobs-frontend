import { useUserContext } from '../context/auth';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, redirect }) => {
    const { token } = useUserContext();
    return token ? children : <Navigate to='/login' state={redirect} />
}

export default PrivateRoute;