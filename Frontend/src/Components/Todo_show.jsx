import { useState } from "react";
import List_item from "./list_item";
import { useFirebase } from "../Context/Firebase";

export default function Show(props) {
    const [list, setList] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [formData, setformData] = useState({ name: "", roll: "", above_18: false });
    const {uuid} = useFirebase();

    function getVal(id){
        for (let index = 0; index < props.data.length; index++) {
            if(id === props.data[index]._id){
                return props.data[index];
            }
        }
    }
    const updatedItem = (list.length===0) ? "" : getVal(list[0]);
    const handleupdate = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id : list[0] , formData})
        };
        try {
            const response = await fetch(`http://localhost:5000/home/update?uuid=${uuid}`, requestOptions);
            if (response.ok) {
                props.Alert(`Successfully updated the data for ${updatedItem.name}` , "success");
                props.change();
            }
            else {
                console.log(response.error);
                props.Alert("Problem in updating the data..." , "danger");
            }
        } catch (error) {
            props.Alert("Update Error!" , "danger");
        }
    }

    const handledelete = async () => {
        try {
            let requestOptions = {
                method: 'DELETE',
                body: JSON.stringify({ ids: list}),
                headers: { 'Content-Type': 'application/json' },
            }
            const response = await fetch(`http://localhost:5000/home/delete?uuid=${uuid}`, requestOptions);
            if (response.ok) {
                props.Alert("Records deleted successfully" , "success");
                setList([]);
                props.change();
            }
            else {
                props.Alert("Error in deleting");
            }


        } catch (error) {
            props.Alert("Error in API delete" , "danger");
        }
    }


    return (
        <div className="container">
            <h1 className="display-1"> Records : </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Roll No</th>
                        <th scope="col">Above 18</th>
                        <th scope="col">Delete/Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((id) => (
                            <List_item key={id._id} main={id} setlist={setList} list={list} />
                        ))
                    }
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={handledelete}>Delete</button>
            <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={(event) => {
                if (list.length === 0) {
                    props.Alert("Please select one of the records.." , "warning");
                }
                else {
                    setformData({name : updatedItem.name , roll : updatedItem.roll , above_18 : updatedItem.above_18});
                    setToggle((prev) => {
                        return !prev;
                    })
                }
            }} data-toggle={toggle ? "modal" : ""} data-target={toggle ? "#exampleModalCenter" : ""}>Update</button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Update Record for {updatedItem.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                                setToggle((prev) => {
                                    return !prev;
                                })
                            }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form onSubmit={handleupdate}>
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{
                                setToggle((prev) => {
                                    return !prev;
                                })
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}