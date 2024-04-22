import { useState } from "react";
import { useFirebase } from "../Context/Firebase";

export default function Add(props) {
    const {uuid , changeAlert} = useFirebase();
    const [formData, setformData] = useState({ name: "", roll: "", above_18: false });
    const handlesubmit = async (event) => {
        event.preventDefault();
        for (let index = 0; index < props.data.length; index++) {
            if (props.data[index].roll == formData.roll) {
                changeAlert("Duplicate roll numbers are not allowed" , "warning");
                return;
            }
        }
        const body = {...formData , uuid};
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
                changeAlert("Problem in adding the data...","danger");
            }
        } catch (error) {
            changeAlert("Submit Error!" , "danger");
        }
    }
    return (
        <div className="container">
            <h1 className="display-1"> Add Data : </h1>
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