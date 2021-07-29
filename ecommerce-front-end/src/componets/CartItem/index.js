import React, { useState } from 'react';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

function CartItem(props) {

    const [qty, setQty] = useState(props.cartItem.qty);
    const {
        _id, name, price, img,
    } = props.cartItem;
    const onQuantityIncrement = () => {
        setQty(qty + 1)
        props.onQuantityInc(_id, qty + 1);
    }

    const onQuantityDecrement = () => {
        if(qty <= 1) return;

        setQty(qty - 1)
        props.onQuantityDec(_id, qty - 1);
    }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">

                <div className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt={img} />
                </div>

                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>{price} MMK</p>
                    </div>
                    <div className="waitingTime"><p>delivery in 3 - 5 days</p> </div>
                </div>
            </div>
            <div className="flexRow qtyContainer">
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className="cartActionBtn">save for later</button>
                <button className="cartActionBtn" onClick={() => props.onRemoveCartItem(_id)}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem
