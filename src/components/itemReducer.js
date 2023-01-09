const initState = {
    items: [],
    clickedProducts: {},
    totalPrice: 0
};

function itemReducer (state = initState, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            let newState = {...state};
            let index = newState.items.findIndex(item => item.id === action.data.id);
            if (index >= 0) {
                newState.items[index].counter = action.data.counter;
                newState.items[index].price += action.data.price;
            } else {
                let newItem = {...action.data};
                newItem.singleItemPrice = action.data.price;
                newState.items.push(newItem);
            }
            newState.totalPrice += action.data.price;
            return newState;
        }
        case "REMEMBER_CLICKED": {
            let newState = {...state};
            newState.clickedProducts[action.data.id] = action.data.counter;
            return newState;
        }
        case "DELETE_ITEM": {
            let newState = {...state};
            let newItems = newState.items.filter(item => item.id != action.data.id);
            newState.items = newItems;
            newState.totalPrice -= action.data.price;
            Reflect.deleteProperty(newState.clickedProducts, action.data.id)
            return newState;
        }
        case "CHANGE_QTY": {
            let newState = {...state};
            let index = newState.items.findIndex(item => item.id === action.data.id);
            newState.totalPrice -= newState.items[index].price;
            newState.totalPrice += action.data.price;
            newState.items[index].counter = action.data.counter;
            newState.items[index].price = action.data.price;
            newState.clickedProducts[action.data.id] = action.data.counter;
            if (action.data.counter == 0) {
                Reflect.deleteProperty(newState.clickedProducts, action.data.id)
            }
            return newState;
        }
        case "CLEAN_CART": {
            let newState = {...state};
            newState.items.length = 0;
            newState.totalPrice = 0;
            newState.clickedProducts = {};
            return newState;
        }
        default: 
            return state;
    }
}

export default itemReducer;