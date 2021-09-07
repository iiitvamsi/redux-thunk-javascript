const { createStore, applyMiddleware } = require("redux")
const thunk = require('redux-thunk').default
const axios = require('axios')

const FETCH_USERS = "FETCH_USERS"
const USERS_SUCCESS = "USERS_SUCCESS"
const USERS_FAIL = "USERS_FAIL"

const initialState = {
    users: [],
    error: '',
    isLoading: false
}

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: USERS_SUCCESS,
        data: users
    }
}

const fetchUsersFail = (error) => {
    return {
        type: USERS_FAIL,
        data: error
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchUsersRequest:
            return {
                isLoading: true,
            }
        case fetchUsersSuccess:
            return {
                isLoading: false,
                users: action.data,
                error: '' 
            }
        case fetchUsersFail:
            return {
                isLoading: false,
                users: [],
                error: action.data
            }
        default:
            return state;
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            let users = response.data;
            console.log(users);
            dispatch(fetchUsersSuccess(users))
        }).catch(e => {
            dispatch(fetchUsersFail(e))
        })
    }
}

const store = createStore(usersReducer, applyMiddleware(thunk));
store.subscribe(() => {
    console.log(store.getState())
})


store.dispatch(fetchUsers())