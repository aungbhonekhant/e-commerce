import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

function CartItem(props) {
    const [qty, setQty] = useState(props.cartItem.qty);
    const {
        _id, name, price, img, slug
    } = props.cartItem;
    const onQuantityIncrement = () => {
        setQty(qty + 1)
        props.onQuantityInc(_id, qty + 1);
    }

    const onQuantityDecrement = () => {
        if (qty <= 1) return;

        setQty(qty - 1)
        props.onQuantityDec(_id, qty - 1);
    }

    return (
        <div className="cartItemContainer">
            <div className="cartItemContainerInner">
                <div className="cartItemWarp">
                    <Link
                        to={`/${slug}/${_id}/p`}
                        className="cartProImgContainer"
                    >
                        <img src={generatePublicUrl(img)} alt={img} />
                    </Link>

                    <div className="cartItemDetails">
                        <div className="cartItemDetailsName">
                            <Link to={`/${slug}/${_id}/p`}>{name}</Link>
                        </div>
                        <div className="cartItemDetailsOptions">
                            <div className="cartItemDetailsOptionsInner">
                                15.6 inch, Natural Silver, 1.76 kg, With MS Office
                            </div>
                        </div>
                        <div className="cartItemDetailsSellerStatus">
                            Seller:PETILANTE Online
                        </div>
                        <div className="cartItemDetailsPrice">
                            {price} MMK
                        </div>
                        <div className="cartItemDetailsDisPrice">
                            2000
                        </div>
                        <div className="cartItemDetailsPerOff">
                            5% off
                        </div>
                    </div>
                    <div className="waitingTime">
                        <ul className="waitingTimeList">
                            <li className="waitingTimeListItems">
                                <div className="waitingTimedeliDay">
                                    delivery in 3 - 5 days  | &nbsp;
                                    <span className="waitingTimedeliFee">
                                        Free
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="qtyContainer">
                    <div className="quantityControl">
                        <div className="quantityControlBtnContainer">
                            <button onClick={onQuantityDecrement}>-</button>
                            <div className="quantityShow">
                                <input value={qty} readOnly />
                            </div>
                            <button onClick={onQuantityIncrement}>+</button>
                        </div>
                    </div>
                    <div className="cartActionBtnContainer">
                        <div className="cartActionBtn">save for later</div>
                        <div className="cartActionBtn" onClick={() => props.onRemoveCartItem(_id)}>Remove</div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CartItem
