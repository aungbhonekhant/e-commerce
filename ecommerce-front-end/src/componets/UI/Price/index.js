import React from 'react'
import './style.css';

const Price = (props) => {
    return (
        <div
            style={{
                fontSize: props.fontSize ? props.fontSize : "14px",
                fontWeight: "bold",
                margin: "5px 0",
            }}
        >
            <span className="currency">MMK</span> 
            {props.value}
        </div>
    )
}

export default Price;
