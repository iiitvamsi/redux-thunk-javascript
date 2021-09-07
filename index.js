const { createStore, applyMiddleware } = require("redux")
const logger = require("redux-logger").default
const initialState = {
    numberofLaptops: 100
}


const buyLaptop = () => {
    return {
        type: "BUY_LAPTOP"
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "BUY_LAPTOP":
            return { numberofLaptops: state.numberofLaptops - 1 }
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(logger));
console.log(store);

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(buyLaptop());

