import { tagConstants } from "../actions/constants";

const initState = {
    tags: [],
    loading: false,
    error: null,
    message: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case tagConstants.GET_ALL_TAGS_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null,
            }
            break;
        case tagConstants.GET_ALL_TAGS_SUCCESS:
            state = {
                ...state,
                tags: action.payload.tags,
                loading: false,
                error: null,
                message: null
            }
            break;
        case tagConstants.GET_ALL_TAGS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case tagConstants.ADD_NEW_TAG_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null,
            }
            break;
        case tagConstants.ADD_NEW_TAG_SUCCESS:
            const tag = action.payload.tag;

            state = {
                ...state,
                //tags: tag,
                loading: false,
                message: action.payload.message,
                error: null,
            }
            break;
        case tagConstants.ADD_NEW_TAG_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }   
    return state;
};