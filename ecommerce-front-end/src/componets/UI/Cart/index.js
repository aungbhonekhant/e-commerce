import React from "react";
import { IoIosCart } from "react-icons/io";
import "./style.css";

const Cart = (props) => {
    return (
        <div className="cartIconContainer">
            <span className="count">
                {props.count}
            </span>
            <IoIosCart />
        </div>
    )
}

export default Cart
