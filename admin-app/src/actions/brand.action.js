import axios from "../helpers/axios";
import { brandConstants } from "./constants";

const getAllBrands = () => {
    return async dispatch => {

        dispatch({ type: brandConstants.GET_ALL_BRAND_REQUEST });
        try {
            const res = await axios.get(`/brand/getbrands`);
            if (res.status === 200) {

                const { brands } = res.data;

                dispatch({
                    type: brandConstants.GET_ALL_BRAND_SUCCESS,
                    payload: { brands }
                })
            } else {
                dispatch({
                    type: brandConstants.GET_ALL_BRAND_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {

            dispatch({
                type: brandConstants.GET_ALL_BRAND_FAILURE,
                payload: { error: "Something want wrong, try again!" }
            })
        }
    }
}

export const addBrand = (form) => {
    return async dispatch => {
        dispatch({ type: brandConstants.ADD_NEW_BRAND_REQUEST });
        try {
            const res = await axios.post(`/brand/create`, form);

            if (res.status === 201) {
                dispatch({
                    type: brandConstants.ADD_NEW_BRAND_SUCCESS,
                    payload: {
                        brand: res.data.brand,
                        message: "brand successfully created"
                    }
                })
                dispatch(getAllBrands());
            } else {
                dispatch({
                    type: brandConstants.ADD_NEW_BRAND_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {

            dispatch({
                type: brandConstants.ADD_NEW_BRAND_FAILURE,
                payload: { error: "Something want wrong, Please check your input!" }
            })
        }
    }
}

export const updateBrand = (form) => {
    return async dispatch => {
        dispatch({ type: brandConstants.UPDATE_BRAND_REQUEST });
        try {
            const res = await axios.post(`/brand/update`, form);
            if (res.status === 201) {
                dispatch({
                    type: brandConstants.UPDATE_BRAND_SUCCESS,
                    payload: { message: "brand successfully updated" }
                })
                dispatch(getAllBrands());
            } else {
                dispatch({
                    type: brandConstants.UPDATE_BRAND_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {

            dispatch({
                type: brandConstants.UPDATE_BRAND_FAILURE,
                payload: { error: "Something want wrong, Please check your input!" }
            })
        }
    }
}

export const deleteBrand = (payload) => {
    return async dispatch => {
        dispatch({ type: brandConstants.DELETE_BRAND_REQUEST });
        try {
            const res = await axios.post(`/brand/delete`, { payload });
            if (res.status === 202) {
                dispatch({
                    type: brandConstants.DELETE_BRAND_SUCCESS,
                    payload: { message: "brand successfully Deleted!" }
                })
                dispatch(getAllBrands());
            } else {
                dispatch({
                    type: brandConstants.DELETE_BRAND_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            dispatch({
                type: brandConstants.DELETE_BRAND_FAILURE,
                payload: { error: "Something want wrong, Please check your input!" }
            })
        }
    }
}

export {
    getAllBrands
};