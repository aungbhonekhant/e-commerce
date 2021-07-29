import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../componets/Layout';
import Card from '../../componets/UI/Card';
import CartItem from '../../componets/CartItem';
import './style.css';
import { addToCart, getCartItems, removeCartItem } from '../../actions';
import { MaterialButton, MaterialInput } from '../../componets/MaterialUI';
import PriceDetails from '../../componets/PriceDetails';

function CartPage(props) {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    //const getCartItems = useSelector(state =>  state.cart.cartItems);
    const [cartItems, setCartItems] = useState(getCartItems);
    const dispatch = useDispatch();

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

    const onQuantityIncrement = (_id, qty) => {

        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));

    }

    const onQuantityDecrement = (_id, qty) => {

        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));

    }

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({productId: _id}))
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
                        />
                    )
                }
            </>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card
                    headerleft={`My Cart`}
                    headerright={<div> Deliver to </div>}
                    style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}
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
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CartPage
