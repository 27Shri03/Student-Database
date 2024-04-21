import { useState } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Signup() {
    const { createUser } = useFirebase();
    const [credentials, Setcredentials] = useState({ email: "", password: "", name: "" , phone : "" })
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5" >
            <h1>Let's Get You Signed Up :</h1>
            <div className="d-flex mt-3">
                <label htmlFor="username" className="form-label mr-2">Username:</label>
                <input value={credentials.name} onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, name: event.target.value }
                    })
                }} type="text" className="form-control" placeholder="Username" aria-label="Username" id="username" aria-describedby="addon-wrapping" />
            </div>
            <div className="d-flex mt-2">
                <label htmlFor="phone" className="form-label mr-4">Phone Number:</label>
                <input style={{ width: "206px" }} value={credentials.phone} onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, phone: event.target.value }
                    })
                }} type="text" className="form-control mr-5" placeholder="Mobile  No." aria-label="Username" id="phone" aria-describedby="addon-wrapping" />
            </div>
            <div className="d-flex flex-row m-2">
                <label htmlFor="exampleInputEmail1" className="form-label mr-2">Email address:</label>
                <input onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, email: event.target.value }
                    })
                }} value={credentials.email} style={{ width: "206px" }} type="email" className="form-control mr-4" placeholder="example@gmail.com" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="d-flex ml-1">
                <label htmlFor="exampleInputPassword1" className="form-label mr-2">Password:</label>
                <input onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, password: event.target.value }
                    })
                }} value={credentials.password} type="password" className="form-control" placeholder="Password" id="exampleInputPassword1" />
            </div>
            <button onClick={() => { createUser(credentials.email, credentials.password, credentials.name , credentials.phone) }} className="btn btn-primary mt-3">Submit</button>
            <h3 className="mt-4">Already have an account <a href="/login">Login</a> now</h3>
        </div>
    );
}