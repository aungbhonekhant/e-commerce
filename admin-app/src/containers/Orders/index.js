import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../actions/order.action';
import Layout from '../../components/layout';
import Card from '../../components/UI/Card';

import "./style.css";

function Orders() {
    const order = useSelector(state => state.order);
    const [type, setType] = useState("");
    const dispatch = useDispatch();

    const onOrderUpdate = (orderId) => {

        const payload = {
            orderId,
            type: type
        };
        dispatch(updateOrder(payload));
    }

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }

        return "";
    };

    return (
        <Layout sidebar>
            <div className="mt-5">
                {
                    order.order.map((orderItem, index) => (
                        <Card style={{ margin: "10px 0" }} key={index} headerleft={orderItem._id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "20px 50px",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <div className="title">Items</div>
                                    {orderItem.items.map((item, index) => (
                                        <div className="value" key={index}>
                                            {`${item.productId.name.substring(0, 50)}`}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <span className="title">Total Price</span>
                                    <br />
                                    <span className="value">{orderItem.totalAmount}</span>
                                </div>
                                <div>
                                    <span className="title">Payment Type</span> <br />
                                    <span className="value">{orderItem.paymentType}</span>
                                </div>
                                <div>
                                    <span className="title">Payment Status</span> <br />
                                    <span className="value">{orderItem.paymentStatus}</span>
                                </div>
                            </div>
                            <div
                                style={{
                                    boxSizing: "border-box",
                                    padding: "40px 100px",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div className="orderTrack">
                                    {
                                        orderItem.orderStatus.map(status => (
                                            <div className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
                                                <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                                                <div className="orderInfo">
                                                    <div className="status">{status.type}</div>
                                                    <div className="date">{formatDate(status.date)}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* select input to apply order action */}
                                <div
                                    style={{
                                        padding: "0 50px",
                                        boxSizing: "border-box"
                                    }}
                                >
                                    <select onChange={(e) => setType(e.target.value)}>
                                        <option value="">select status</option>
                                        {
                                            orderItem.orderStatus.map((status) => {
                                                return (
                                                    <>
                                                        {
                                                            !status.isCompleted ? <option key={status.type} value={status.type}>{status.type}</option> : null
                                                        }

                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/* button to confirm action */}
                                <div
                                    style={{
                                        padding: "0 50px",
                                        boxSizing: "border-box"
                                    }}
                                >
                                    <button onClick={() => onOrderUpdate(orderItem._id)}>confirm</button>
                                </div>
                            </div>
                        </Card>
                    )

                    )}

            </div>

        </Layout>
    )
}

export default Orders
