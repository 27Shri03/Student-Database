import { useState , useEffect } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Add(props) {
    const { uuid, changeAlert } = useFirebase();
    const [formData, setformData] = useState({ name: "", roll: "", above_18: false });
    const handlesubmit = async (event) => {
        event.preventDefault();
        for (let index = 0; index < props.data.length; index++) {
            if (props.data[index].roll == formData.roll) {
                changeAlert("Duplicate roll numbers are not allowed", "warning");
                return;
            }
        }
        if ((/\d/.test(formData.name))) {
            changeAlert("Number is not allowed in the name field");
            return;
        }
        const body = { ...formData, uuid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        try {
            console.log(formData);
            const response = await fetch('http://localhost:5000/home', requestOptions);
            if (response.ok) {
                props.change();
                setformData({ name: "", roll: "", above_18: false })
            }
            else {
                changeAlert("Problem in adding the data...", "danger");
            }
        } catch (error) {
            changeAlert("Submit Error!", "danger");
        }
    }
    const [text, setText] = useState('');
    const targetText = 'Add Data :';
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            setText(targetText.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex > targetText.length) {
                clearInterval(typingInterval);
            }
        }, 100);
        return () => {
            clearInterval(typingInterval);
        };
    }, [targetText]);
    return (
        <div className="container" style={{ width: "40%" }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width : "500px"
                }}
            >
                <span
                    style={{
                        fontSize: '75px',
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
            </div>
            <form onSubmit={handlesubmit}>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name : </label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={(event) => {
                            setformData((prev) => {
                                return { ...prev, name: event.target.value };
                            })
                        }} value={formData.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roll" className="form-label">Roll No : </label>
                        <input type="number" className="form-control" id="roll" aria-describedby="emailHelp" name="roll" onChange={(event) => {
                            setformData((prev) => {
                                return { ...prev, roll: event.target.value };
                            })
                        }} value={formData.roll} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="above_18" className="form-label">Are you above 18 ? : </label>
                        <input type="checkbox" checked={formData.above_18} className=" m-1 border border-danger" id="above_18" name="above_18" onChange={(event) => {
                            setformData((prev) => {
                                return { ...prev, above_18: event.target.checked };
                            })
                        }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );

}