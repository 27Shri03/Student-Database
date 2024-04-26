import { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Login() {
    const [credentials, Setcredentials] = useState({ email: "", password: "" });
    const { loginUser } = useFirebase();
    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(credentials.email, credentials.password);
    }
    const [text, setText] = useState('');
    const [databaseText, setDatabaseText] = useState('');
    const targetText = 'Welcome ,';
    const targetDatabaseText = 'Please Log in...';

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            setText(targetText.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex > targetText.length) {
                clearInterval(typingInterval);
                startDatabaseTyping();
            }
        }, 200);

        const startDatabaseTyping = () => {
            let databaseIndex = 0;
            const databaseTypingInterval = setInterval(() => {
                setDatabaseText(targetDatabaseText.slice(0, databaseIndex + 1));
                databaseIndex++;
                if (databaseIndex > targetDatabaseText.length) {
                    clearInterval(databaseTypingInterval);
                }
            }, 100);
        };
        return () => {
            clearInterval(typingInterval);
        };
    }, [targetText, targetDatabaseText]);
    return (
        <>
            <div className="container mt-5">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '40px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '100px',
                            fontWeight: 'bold',
                            color: '#333',
                            whiteSpace: 'pre',
                            overflow: 'hidden',
                        }}
                    >
                        {text}
                        <span
                            style={{
                                animation: 'blink 0.5s step-end infinite',
                            }}
                        ></span>
                    </span>
                    <span
                        style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                            color: 'blue',
                            whiteSpace: 'pre',
                            overflow: 'hidden',
                        }}
                    >
                        {databaseText}

                    </span>
                </div>
                <form onSubmit={handleSubmit} className="container" style={{ width: "500px" }}>
                    <div className="form-group" >

                        <input value={credentials.email} onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, email: event.target.value }
                            })
                        }} type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, password: event.target.value }
                            })
                        }} value={credentials.password} type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
                <h2 className="text-center mt-5" >New to the app <a href="/">Sign up</a> for free</h2>
            </div>
        </>
    );
}