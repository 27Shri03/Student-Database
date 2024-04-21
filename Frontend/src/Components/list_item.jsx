export default function List_item(props) {
    const handlechange = (event) => {
        if (event.target.checked === true) {
            props.setlist((prev) => [...prev, props.main._id]);
        }
        else {
            let ind = null;
            for (let index = 0; index < props.list.length; index++) {1
                if (props.main._id === props.list[index]) {
                    ind = index;
                    break;
                }
            }
            props.setlist((prev) => prev.filter((_, index) => index !== ind));
        }
    }
    return (
        <tr>
            <th scope="row">{props.main._id}</th>
            <td>{props.main.name}</td>
            <td>{props.main.roll}</td>
            <td>{(props.main.above_18) ? "Yes" : "No"}</td>
            <td><input type="checkbox" onChange={handlechange} /></td>
        </tr>
    );
}