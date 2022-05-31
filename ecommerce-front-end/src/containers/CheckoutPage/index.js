import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAddress, getCartItems } from '../../actions';
import Layout from '../../componets/Layout';
import { MaterialButton, MaterialInput, Anchor } from '../../componets/MaterialUI';
import { Login, signup as _signup } from '../../actions';
import Card from '../../componets/UI/Card';
import AddressForm from './AddressForm';
import CartPage from '../CartPage';
import PriceDetails from '../../componets/PriceDetails';
import SaceAndSecure from '../../componets/SaveAndSecure';
import { ImTruck } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { IoMdStar } from "react-icons/io";

import './style.css';

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
}

// address detail 
const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName"> {adr.name} </span>
                                <span className="addressType"> {adr.addressType} </span>
                                <span className="addressMobileNumber"> {adr.mobileNumber} </span>
                            </div>
                            {
                                adr.selected && (
                                    <Anchor
                                        name="EDIT"
                                        onClick={() => enableAddressEditForm(adr)}
                                        style={{ fontWeight: "500", color: '#2874f0' }}
                                    />
                                )
                            }
                        </div>
                        <div className="fullAddress">
                            {adr.address} <br /> {" "}
                            {`${adr.state} - ${adr.pinCode}`}
                        </div>
                        {adr.selected && (
                            adr.selected &&
                            <MaterialButton
                                onClick={() => confirmDeliveryAddress(adr)}
                                title="DELIVERY HERE"
                                style={{ width: '250px' }}
                            />
                        )}

                    </div>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => { }}
                    />
                )
                    // { adr.edit && <div>edit</div> }
                }
            </div>
        </div>
    )
}

const CheckoutPage = (props) => {
    const user = useSelector(state => state.user); //getting user data from redux state
    const cart = useSelector(state => state.cart); //getting cart items from redux state
    const auth = useSelector(state => state.auth); //getting auth credentials from redux state
    const [newAddress, setNewAddress] = useState(false); //for add new address form show
    const [address, setAddress] = useState([]);   //set state for deli address 
    const [confirmAddress, setConfirmAddress] = useState(false); //user confirmed address or not for deli address
    const [selectedAddress, setSelectedAddress] = useState(null); //for store address when user is selected address
    const [orderSummary, setOrderSummary] = useState(false); //if true to show the user's items 
    const [orderConfirmation, setOrderConfirmation] = useState(false); //if user's items are every thind ok set true to go next step
    const [paymentOption, setPaymentOption] = useState(false); // if payment option is chosed, will true and go next step
    const [confirmOrder, setConfirmOrder] = useState(false); //final order
    const dispatch = useDispatch();

    //user login and signup
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false);
    const payload = {
        email,
        password,
    };

    const userSignup = () => {
        const payload = { firstName, lastName, email, password };
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            return
        }
        dispatch(_signup(payload));
    }

    const userLogin = () => {
        if (signup) {
          userSignup();
        } else {
          dispatch(Login(payload));
        };
    }

    const onAddressSubmit = (addr) => { //choose address for deli
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    // when delivery address choose run this function for showing btn and edit
    const selectAddress = (addr) => {
        console.log(addr);
        const updatedAddress = address.map(adr => adr._id === addr._id ?
            { ...adr, selected: true } : { ...adr, selected: false });
        setAddress(updatedAddress);
    }

    //when Click Deliever HERE btn run this function ro confirm user address
    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    //show edit from 
    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        )

        setAddress(updatedAddress)
    }

    //confirm order
    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true)
    }

    //when order confirm, make order.
    const onConfirmOrder = () => {
        //total order amount
        const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty
        }, 0);

        //orderd items
        const items = Object.keys(cart.cartItems).map(key => ({
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty
        }));

        //argument to save order in api 
        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: "pending",
            paymentType: "cod",
        }
        console.log(payload);
        dispatch(addOrder(payload));
        setConfirmOrder(true)
    }

    useEffect(() => {
        auth.authenticate && dispatch(getAddress()); //if uder login gett deli address
        auth.authenticate && dispatch(getCartItems()); // if uder login gett user's cart items
    }, [auth.authenticate]);

    useEffect(() => {
        const address = user.address.map(adr => ({ ...adr, selected: false, edit: false })); // add new extera field selected and edit to address object
        setAddress(address);
    }, [user.address])


    if (confirmOrder) { //order success page
        return (
            <Layout>
                <Card>
                    <div>Thank You</div>
                </Card>
            </Layout>
        )
    }


    return (
        <Layout menuheader={false} more={false} cart={false} search={false} login={false}>
            <div className="checkoutContainer row">
                {/* user input and checkout steps */}
                <div className="checkout">
                    {/* check if user logged in */}
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ?
                                <div className="loggedInId">
                                    <span className="loggedInIdName">{auth.user.fullName}</span>
                                    <span className="loggedInIdEmail"> {auth.user.email}</span>
                                </div> :
                                <div className="checkoutPageLogin">
                                    <div>
                                        <div className="checkoutPageLoginContainer row">

                                            <div className="checkoutPageLoginForm col">
                                                <div className="checkoutPageLoginFormInput">
                                                    {
                                                        signup && (
                                                            <MaterialInput
                                                                type="text"
                                                                label="Enter First Name"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        signup && (
                                                            <MaterialInput
                                                                type="text"
                                                                label="Enter Last Name"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                            />
                                                        )
                                                    }
                                                    <MaterialInput
                                                        type="text"
                                                        label="Enter Email/Enter Mobile Number"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <MaterialInput
                                                        type="password"
                                                        label="Enter Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        rightElement={!signup && <a href="#">Forgot?</a>}
                                                    />
                                                </div>

                                                <div className="userAggrement">
                                                    By continuing, you agree to Flipkart's
                                                    <a href="#" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                                                    and
                                                    <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                                                    .
                                                </div>
                                                <div className="checkoutPageSignup">
                                                    <span>{signup ? "Already Registered?" : "New Customer?"}</span>
                                                    <a onClick={() => { signup? setSignup(false) : setSignup(true) }}>{signup ? "Login" : "Sign up"}</a>
                                                </div>
                                                <div className="checkoutPageLoginButton">
                                                    <MaterialButton onClick={userLogin} title={signup ? "Register" : "Login"} />
                                                </div>

                                            </div>

                                            <div className="loginAdvantages col">
                                                <div className="loginAdvantagesContainer">
                                                    <span>Advantages of our secure login</span>
                                                    <ul>
                                                        <li className="loginAdvantagesList">
                                                            <ImTruck className="advantagesIcon" />
                                                            <span>Easily Track Orders, Hassle free Returns</span>
                                                        </li>
                                                        <li className="loginAdvantagesList">
                                                            <IoMdNotifications className="advantagesIcon" />
                                                            <span>Get Relevant Alerts and Recommendation</span>
                                                        </li>
                                                        <li className="loginAdvantagesList">
                                                            <IoMdStar className="advantagesIcon" />
                                                            <span>Wishlist, Reviews, Ratings and more.</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }

                    />


                    <CheckoutStep //
                        stepNumber={'2'}
                        title={'DELIVER ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {
                                    confirmAddress ? (
                                        <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                                    ) : (
                                        address.map((adr) => (

                                            <Address
                                                selectAddress={selectAddress}
                                                enableAddressEditForm={enableAddressEditForm}
                                                confirmDeliveryAddress={confirmDeliveryAddress}
                                                onAddressSubmit={onAddressSubmit}
                                                adr={adr}
                                            />

                                        ))
                                    )
                                }
                            </>
                        }
                    />

                    {/* address form */}

                    {
                        confirmAddress ? null :
                            newAddress ?
                                <AddressForm
                                    onClick={() => setNewAddress(false)}
                                    onSubmitForm={onAddressSubmit}
                                    onCancel={() => { }}
                                /> :
                                <CheckoutStep
                                    stepNumber={'+'}
                                    title={'ADD NEW ADDRESS'}
                                    active={false}
                                    onClick={() => setNewAddress(true)}
                                />
                    }


                    <CheckoutStep
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ? <CartPage onlyCartItems={true} /> : orderConfirmation ? <div className="stepCompleted">{Object.keys(cart.cartItems).length} items</div> : null
                        }
                    />
                    {
                        orderSummary &&
                        <Card style={{ margin: "10px 0" }}>
                            <div className="flexRow sb orderConfirm">
                                <p>Order Confirmation email will be sent to <strong>{auth.user.email}</strong></p>
                                <MaterialButton onClick={userOrderConfirmation} title="CONTINUE" style={{ width: "200px" }} />
                            </div>
                        </Card>
                    }

                    <CheckoutStep
                        stepNumber={'4'}
                        title={'PAYMENT OPTIONS'}
                        active={paymentOption}
                        body={
                            paymentOption &&
                            <div className="stepCompleted">
                                <div className="flexRow" style={{ alignItems: 'center', padding: '20px' }}>
                                    <input type="radio" name="paymentOption" value="cod" />
                                    <div>Cash on delivery</div>
                                </div>
                                <MaterialButton
                                    onClick={onConfirmOrder}
                                    title="CONFIRM ORDER"
                                    style={{ width: '200px', margin: '0 0 20px 20px' }}
                                />
                            </div>
                        }
                    />
                </div>

                {/* order details and total amount */}
                <div className="checkoutPriceDetial">
                    <PriceDetails
                        totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                            return qty + cart.cartItems[key].qty;
                        }, 0)}
                        totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                            const { price, qty } = cart.cartItems[key];
                            return totalPrice + price * qty
                        }, 0)}
                    />
                    {/* Showing services */}
                    <SaceAndSecure />
                </div>


            </div>

        </Layout>
    )
}

export default CheckoutPage
