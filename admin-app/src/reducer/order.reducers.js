import { orderConstants } from "../actions/constants";

const initState = {
    order: []
};

export default (state = initState, action) => {
    switch(action.type){
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                order: action.payload.orders
            };
            break;
    }

    return state;
}