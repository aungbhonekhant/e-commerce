import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../componets/Layout';
import Card from '../../componets/UI/Card';
import CartItem from '../../componets/CartItem';
import './style.css';
import { addToCart, getCartItems, removeCartItem } from '../../actions';
import { MaterialButton, MaterialInput } from '../../componets/MaterialUI';
import PriceDetails from '../../componets/PriceDetails';
import SaceAndSecure from '../../componets/SaveAndSecure';

function CartPage(props) {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    //const getCartItems = useSelector(state =>  state.cart.cartItems);
    const [cartItems, setCartItems] = useState(getCartItems);
    const dispatch = useDispatch();

    //total cart item count
    const cartItemsCount = Object.keys(cart.cartItems).reduce(function (qty, key) {
        return qty + cart.cartItems[key].qty;
    }, 0)

    //add cartitems to state
    useEffect(() => {

        setCartItems(cart.cartItems);

    }, [cart.cartItems]);

    //if user login get cartitem from database
    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems())
        }
    }, [auth.authenticate])

    //cart qty increase when click + sign
    const onQuantityIncrement = (_id, qty) => {

        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));

    }

    //cart qty decrease when click - sign
    const onQuantityDecrement = (_id, qty) => {

        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));

    }

    //remove cart items
    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }))
    }

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                            onRemoveCartItem={onRemoveCartItem}
                        />
                    )
                }
            </>
        )
    }

    return (
        <Layout menuheader={false} more={false} cart={false} search={true} login={true}>
            <div className="cartContainer">
                <div className="cartContainerInner">
                    <div className="warp">
                        <div style={{ display:"flex", flexGrow: 1, overflow: 'visible', flexFlow: "column", width:"100%" }}>
                            <Card
                                headerleft={`My Cart ( ${cartItemsCount} )`}
                                headerright={<div> Deliver to </div>}
                                style={{ display:"flex", flexFlow: "column" }}
                            >

                                {
                                    Object.keys(cartItems).map((key, index) =>
                                        <CartItem
                                            key={index}
                                            cartItem={cartItems[key]}
                                            onQuantityInc={onQuantityIncrement}
                                            onQuantityDec={onQuantityDecrement}
                                            onRemoveCartItem={onRemoveCartItem}
                                        />
                                    )
                                }

                                <div className="placeOrder">
                                    <div>
                                        <MaterialButton
                                            title="PLACE ORDER"
                                            onClick={() => props.history.push(`/checkout`)}
                                        />
                                    </div>
                                </div>
                            </Card>

                        </div>
                        <div className="priceDetails">
                            <PriceDetails
                                totalItem={cartItemsCount}
                                totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                                    const { price, qty } = cart.cartItems[key];
                                    return totalPrice + price * qty
                                }, 0)}
                            />
                            <SaceAndSecure />
                        </div>

                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default CartPage
