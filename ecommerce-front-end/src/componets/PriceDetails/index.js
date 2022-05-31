import React from "react";
import Card from "../UI/Card";
import './style.css'

const PriceDetails = (props) => {
    return (
        <Card headerleft="Price Details">
            <div className="priceDetailContainer">
                <div className="flexRow sb priceDetailItem">
                    <div className="priceDetailItemInner">
                        <div className="priceDetailItems">Price ( {props.totalItem} items )</div>
                    </div>
                    <span>{props.totalPrice} MMK</span>

                </div>
                <div className="flexRow sb priceDetailItem">
                    <div className="priceDetailItemInner">
                        <div className="priceDetailItems">Discount </div>
                    </div>
                    <span>0 MMK</span>

                </div>
                <div className="flexRow sb priceDetailItem">
                    <div className="priceDetailItemInner">
                        <div classNam="priceDetailItems">Delivery Charges</div>
                    </div>
                    <span>FREE</span>
                </div>
                <div className="priceDetailTotal">
                    <div className="flexRow sb priceDetailItem">
                        <div className="priceDetailItemInner">
                            <div className="priceDetailItems">Total Amount</div>
                        </div>
                        <span>{props.totalPrice} MMK</span>
                    </div>

                </div>

                {/* Show if discount */}
                <div className="priceDetailSave">
                    You will save 0 on this order
                </div>

            </div>
        </Card>
    );
};

export default PriceDetails;