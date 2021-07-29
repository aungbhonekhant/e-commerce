import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from "./user.reducers";
import productReducer from './product.reducers';
import orderReducer from './order.reducers';
import categoryReducer from './category.reducers';
import pageReducer from './page.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    page: pageReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
});

export default rootReducer;