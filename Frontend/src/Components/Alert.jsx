import { useFirebase } from "../Context/Firebase";

export default function Alert() {
    const { alerttoggle } = useFirebase();
    return (
        <>
            {alerttoggle.show && <div className={`alert alert-${alerttoggle.type} fw-medium`} role="alert">
                {alerttoggle.msg}
            </div>}
        </>
    );
}