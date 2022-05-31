import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from '../../actions/user.actions';
import Layout from '../../componets/Layout';
import Card from "../../componets/UI/Card";
import './style.css';

const OrderDetailsPage = (props) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.user.orderDetails);

    useEffect(() => {
        const payload = {
            orderId: props.match.params.orderId,
        }
        dispatch(getOrder(payload));
    }, []);

    if (!(orderDetails && orderDetails.address)) {
        return null
    }

    return (
        <Layout menuheader={true} more={true} cart={true} search={true} login={true}>
            <div
                style={{
                    width: "1160px",
                    margin: "10px auto"
                }}
            >
                <Card>
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">
                                Phone Number - {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Action</div>
                            <div className="delName">Download Invoice</div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="">
                        <div>items</div>
                        <div>order status</div>
                        <div>order status</div>
                    </div>
                </Card>

            </div>
        </Layout>
    )
}

export default OrderDetailsPage
