import { Navigate } from 'react-router-dom';


export default function PrivateRoute({ children, Auth }) {

    const userAuth = () => {
        if (Auth) {
            return true;
        } else {
            return false;
        }
    }

    return userAuth() ? children : <Navigate to={"/"} />
}
