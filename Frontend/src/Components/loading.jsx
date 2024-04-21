import React from "react";
import ReactLoading from "react-loading";
import { useFirebase } from "../Context/Firebase";

export default function Loader() {
    const { isLoading } = useFirebase();
    return (
        <>
            {isLoading && (
                <div style={styles.loaderContainer}>
                    <ReactLoading 
                        type="bars" 
                        color="#007bff" 
                        height={64}  
                        width={64}  
                    />
                </div>
            )}
        </>
    );
}

const styles = {
    loaderContainer: {
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
};
