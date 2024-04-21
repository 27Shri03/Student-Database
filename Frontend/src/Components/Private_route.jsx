import { Navigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

export default function Protected({children}){
    const {login} = useFirebase();
    return login ? children : <Navigate to='/login' replace/>;
}