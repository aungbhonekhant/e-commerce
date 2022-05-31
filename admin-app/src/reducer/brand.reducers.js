import { brandConstants } from "../actions/constants";

const initState = {
    brands: [],
    loading: false,
    error: null,
    message: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case brandConstants.GET_ALL_BRAND_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null,
            }
            break;
        case brandConstants.GET_ALL_BRAND_SUCCESS:
            state = {
                ...state,
                brands: action.payload.brands,
                loading: false,
            }
            break;
        case brandConstants.GET_ALL_BRAND_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case brandConstants.ADD_NEW_BRAND_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null,
            }
            break;
        case brandConstants.ADD_NEW_BRAND_SUCCESS:
            const category = action.payload.brand;

            state = {
                ...state,
                brands: category,
                loading: false,
                message: action.payload.message,
                error: null,
            }
            break;
        case brandConstants.ADD_NEW_BRAND_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case brandConstants.UPDATE_BRAND_REQUEST:
            state = {
                ...state,
                loading : true,
                error: null,
            }
            break;
        case brandConstants.UPDATE_BRAND_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: null,
            }
            break;
        case brandConstants.UPDATE_BRAND_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
            break;

        case brandConstants.DELETE_BRAND_REQUEST:
            state = {
                ...state,
                loading : true,
                error: null,
            }
            break;
        case brandConstants.DELETE_BRAND_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: null,
            }
            break;
        case brandConstants.DELETE_BRAND_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }   
    return state;
};