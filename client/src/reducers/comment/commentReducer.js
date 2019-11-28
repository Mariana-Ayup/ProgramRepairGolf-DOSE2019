import {
    FETCH_RESPONSES_REQUEST,
    FETCH_RESPONSES_SUCCESS,
    FETCH_RESPONSES_FAILURE,
    ADD_RESPONSE,
    FETCH_ADD_RESPONSE_FAILURE,
} from '../../constants/ActionTypes'

const initCommentState = {
      data: {},
      loading: false,
      responses:[],
      error:''
}

const commentReducer = (state = initCommentState, action) => {
    switch(action.type) {
        case FETCH_RESPONSES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_RESPONSES_SUCCESS:
            return {
                ...state,
                loading: false,
                responses: action.payload,
                error: ''
            }

        case FETCH_RESPONSES_FAILURE:
            return {
                ...state,
                loading: false,
                responses: [],
                error: action.payload,
            }
            case ADD_RESPONSE:
              return{
                    ...state,
                    loading:false,
                    responses: [...state.responses, action.payload],
            }
            case FETCH_ADD_RESPONSE_FAILURE:
              return{
                ...state,
                loading: false,
                responses: [],
                error: action.payload,
            }

        default:
            return state
    }
}

export default commentReducer;
