import React, { useEffect } from'react';
import './row.css';

// const inputBox = (props) => {

//     useEffect(() => {

//     }, [props.value])

//     return (
//             <input 
//                 type="text" 
//                 value={props.value}
//                 onChange={() => {}}
//             />
//     );
// }

function Row({ children }) {
    return (
        <div className="row">
            {children}
        </div>
    );
}