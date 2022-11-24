import * as ActionTypes from './ActionTypes';

export const Leaders = (state ={
    isLoading: true, 
    errMess: null,
    leaders: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}; //... is the spread operator from ES6. The everything after first term will be applied to a copy of the state. Hence a copy of the new state is returned. 


        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders: []};  //When we set up the state like this, then when the react component receives the info, it can display accordingly as per what the state contains

        default: 
            return state;
    }
}