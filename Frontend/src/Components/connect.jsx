import Show from "./Todo_show";
import Add from "./TODO_add";
import { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Connect(props) {
    const [data, setData] = useState([]);
    const { changeAlert, uuid, name_user } = useFirebase();
    const [count, setCount] = useState(1);
    const handleCount = () => {
        setCount(counter => counter + 1);
    }
    const API = import.meta.env.VITE_APP_API_URL;
    useEffect(() => {
        async function fetchData() {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                };
                const apicall = await fetch(`${API}home?uuid=${uuid}`, requestOptions);
                const files = await apicall.json();
                setData(files);
            } catch (error) {
                alert("Network response was not okay Bruh..")
                console.log(error);
            }
        }
        fetchData();
    }, [count])
    const [text, setText] = useState('');
    const [databaseText, setDatabaseText] = useState('');
    const targetText = 'Welcome ,';
    const targetDatabaseText = name_user;

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
        <div className="d-flex flex-column justify-content-center  mt-3 align-items-center">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
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
                        color: '#E64833',
                        whiteSpace: 'pre',
                        overflow: 'hidden',
                    }}
                >
                    {databaseText}
                </span>
            </div>
            <div className="d-flex flex-row mt-3" style={{width : "100%"}}>
                <Add data={data} Alert={changeAlert} change={handleCount} />
                <Show data={data} Alert={changeAlert} change={handleCount} />
            </div>
        </div>

    );
}