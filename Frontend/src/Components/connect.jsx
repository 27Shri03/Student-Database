import Show from "./Todo_show";
import Add from "./TODO_add";
import { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Connect(props) {
    const [data, setData] = useState([]);
    const { changeAlert } = useFirebase();
    const [count, setCount] = useState(1);
    const handleCount = () => {
        setCount(counter => counter + 1);
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const apicall = await fetch('http://localhost:5000/home');
                const files = await apicall.json();
                setData(files);
            } catch (error) {
                alert("Network response was not okay Bruh..")
                console.log(error);
            }
        }
        fetchData();
    }, [count])
    return (
        <div className="d-flex flex-row m-3">
            <Add data={data} Alert={changeAlert} change={handleCount} />
            <Show data={data} Alert={changeAlert} change={handleCount} />
        </div>
    );
}