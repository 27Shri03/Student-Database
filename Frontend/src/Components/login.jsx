import { useState } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Login() {
    const [credentials , Setcredentials] = useState({email : "" , password : ""});
    const {loginUser} = useFirebase();
    const handleSubmit = (event)=>{
        event.preventDefault();
        loginUser(credentials.email , credentials.password);
    }
    return (
        <div className="container mt-5">
            <h2 style={{marginLeft : "20%"}}>Welcome , please log in with suitable credentials</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={credentials.email} onChange={(event)=>{
                        Setcredentials((prev)=>{
                            return {...prev , email : event.target.value}
                        })
                    }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(event)=>{
                        Setcredentials((prev)=>{
                            return {...prev , password : event.target.value}    
                        })
                    }} value={credentials.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h3 style={{marginLeft : "30%" , marginTop : "3%"}} >New to the app <a href="/">Sign up</a> from here</h3>
        </div>
    );
}