import { useState } from "react";
import { useFirebase } from "../Context/Firebase";
import imageFile from "../assets/database.png"
import { useEffect } from "react";
import logo from "../assets/logo.png"


export default function Signup() {
    const { createUser, changeAlert } = useFirebase();
    const [credentials, Setcredentials] = useState({cf : "" ,  email: "", password: "", First_name: "", Last_name : "",  phone: "" , age : "" })
    const handleSubmit = () => {
        if (credentials.phone.length !== 10 || !(/^\d+$/.test(credentials.phone)) ) {
            changeAlert("Phone number is not valid", "warning");
            return;
        }
        if(credentials.password!== credentials.cf){
            changeAlert("Passwords does not match!!", "warning");
            return;
        }
        const name = credentials.First_name + " " + credentials.Last_name;
        console.log(name);
        if((/^\d+$/.test(name))){
            changeAlert("Username is not valid..", "warning");
            return;
        }
        createUser(credentials.email, credentials.password, name, credentials.phone,credentials.age);
    }
    const [text, setText] = useState('');
    const [databaseText, setDatabaseText] = useState('');
    const targetText = 'Student';
    const targetDatabaseText = 'Database';

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
            }, 200);
        };
        return () => {
            clearInterval(typingInterval);
        };
    }, [targetText, targetDatabaseText]);
    return (
        <div className="d-flex">
            <div className="container mt-5" style={{ position: "relative", left: "5%", width: "max-content", padding: 0 }}>
                <h1 className="ml-3" style={{ fontSize: "50px" }}>Let's Get You Signed Up :</h1>
                <div className="container mt-4 ml">
                    <div className="container d-flex">
                        <input value={credentials.First_name} onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, First_name: event.target.value }
                            })
                        }} type="text" className="form-control-lg rounded mr-3" style={{ width: "29%" }} placeholder="First Name" aria-label="Username" aria-describedby="addon-wrapping" />
                        <input value={credentials.Last_name} onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, Last_name: event.target.value }
                            })
                        }} type="text" className="form-control-lg rounded" style={{ width: "29%" }} placeholder="Last Name" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="container d-flex mt-4">
                        <input value={credentials.phone} onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, phone: event.target.value }
                            })
                        }} type="text" className="form-control-lg rounded mr-3" style={{ width: "29%" }} placeholder="Phone No." aria-label="Username" aria-describedby="addon-wrapping" />
                        <input value={credentials.age} onChange={(event) => {
                            Setcredentials((prev) => {
                                return { ...prev, age: event.target.value }
                            })
                        }} type="text" className="form-control-lg rounded" style={{ width: "29%" }} placeholder="Age" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>

                <input value={credentials.email} onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, email: event.target.value }
                    })
                }} type="text" className="form-control-lg rounded mt-4" style={{ width: "56%", marginLeft: "30px" }} placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" />
                <input value={credentials.password} onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, password: event.target.value }
                    })
                }} type="password" className="form-control-lg rounded mt-4" style={{ width: "56%", marginLeft: "30px" }} placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" />
                <input value={credentials.cf} onChange={(event) => {
                    Setcredentials((prev) => {
                        return { ...prev, cf: event.target.value }
                    })
                }} type="password" className="form-control-lg rounded mt-4" style={{ width: "56%", marginLeft: "30px" }} placeholder="Confirm Password" aria-label="Username" aria-describedby="addon-wrapping" />

                <button className="btn btn-danger btn-lg mt-4" style={{ width: "56%", marginLeft: "30px" }} onClick={handleSubmit} >Sign up</button>
                <h2 className="mt-3">Already have an account ? <a href="/login">Log in </a></h2>
            </div>
            <div className="container d-flex flex-column" style={{ width: '750px' }}>
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
                            marginRight: '70px'
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
                            fontSize: '100px',
                            fontWeight: 'bold',
                            color: '#333',
                            whiteSpace: 'pre',
                            overflow: 'hidden',
                        }}
                    >
                        {databaseText}
                        
                    </span>
                </div>
                <img src={logo} width={400} height={200} style={{ position: 'fixed', top: '60%', right: '8%' }} alt="Error" />
            </div>
        </div>
    );
}