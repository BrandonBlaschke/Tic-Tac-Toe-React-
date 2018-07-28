import React from 'react';
import './popUp.css'
import Backdrop from '../Backdrop/backdrop';
import Button from '../Button/button';

const popUp = (props) => (
    <div>
        <div className='PopUp'>
            <p>{props.children}</p>
            <Button clicked={props.clicked}>Reset Game</Button>            
        </div>
        <Backdrop/>
    </div>
)

export default popUp; 