import React from 'react'; 
import './box.css'; 

const box = (props) => {
    return (
        <div>
            <div className="GameBox" onClick={props.clicked}>{props.children}</div>
        </div>
    );
}

export default box; 