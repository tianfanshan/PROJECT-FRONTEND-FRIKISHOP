const products = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case 'ADD_CART':
            return{
                ...state,
                cart:[action.payload, ...state.cart],
            };
            case 'ADD_FAVS':
                return{
                    ...state,
                    favs:[action.payload, ...state.favs],
                };
        case 'CLEAR_CART':
            return{
                ...state,
                cart:[]
            };
            case 'CLEAR_FAVS':
            return{
                ...state,
                favs:[]
            }
        default:
            return state;
    }
};
export default products;