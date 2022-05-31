import axios from "../helpers/axios";
import { tagConstants } from "./constants";

const getAllTags = () => {
    return async dispatch => {

        dispatch({ type: tagConstants.GET_ALL_TAGS_REQUEST });
        try {
            const res = await axios.get(`/tags/gettags`);
            if (res.status === 200) {

                const { tags } = res.data;

                dispatch({
                    type: tagConstants.GET_ALL_TAGS_SUCCESS,
                    payload: { tags }
                })
            } else {
                dispatch({
                    type: tagConstants.GET_ALL_TAGS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {

            dispatch({
                type: tagConstants.GET_ALL_TAGS_FAILURE,
                payload: { error: "Something want wrong, try again!" }
            })
        }
    }
}

export const addTag = (form) => {
    return async dispatch => {
        // for (let [key, value] of form.entries()) {
        //     console.log(key, value);
        // }
        dispatch({ type: tagConstants.ADD_NEW_TAG_REQUEST });
        try {
            const res = await axios.post(`/tags/create`, form);

            if (res.status === 201) {
                dispatch({
                    type: tagConstants.ADD_NEW_TAG_SUCCESS,
                    payload: {
                        tag: res.data.tag,
                        message: "tag successfully created"
                    }
                })
                dispatch(getAllTags());
            } else {
                dispatch({
                    type: tagConstants.ADD_NEW_TAG_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {

            dispatch({
                type: tagConstants.ADD_NEW_TAG_FAILURE,
                payload: { error: "Something want wrong, Please check your input!" }
            })
        }
    }
}

export {
    getAllTags
};
