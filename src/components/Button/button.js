import React from 'react'; 
import "./button.css"; 

const button = (props) => (
    <div>
        <button className="Button" onClick={props.clicked}>{props.children}</button>
    </div>
)

export default button; 