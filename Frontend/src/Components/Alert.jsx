import { useFirebase } from "../Context/Firebase";

export default function Alert() {
    const { alerttoggle } = useFirebase();
    return (
        <>
            {alerttoggle.show && <div className={`alert alert-${alerttoggle.type} fw-medium fixed-top`} role="alert" style={{zIndex  : 1000}}>
                {alerttoggle.msg}
            </div>}
        </>
    );
}