//action types
const ADD_TO_CART = 'cart/ADD_TO_CART';
const GET_CART_ITEMS = 'cart/GET_CART_ITEMS';
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM';
// const CHECK_OUT = 'cart/CHECK_OUT';

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    item,
});

export const getCartItems = (items) => ({
    type: GET_CART_ITEMS,
    items,
});

export const deleteCartItem = (itemId) => ({
    type: DELETE_CART_ITEM,
    itemId,
   });

// export const checkOut = (items) => ({
//     type: CHECK_OUT,
//     items,
// })


export const fetchCartItems = (shoppingCartId) => async (dispatch) => {
 const res = await fetch(`api/shopping_carts/${shoppingCartId}/cart_items`);
 if (res.ok) {
   const data = await res.json();
   dispatch(getCartItems(data.cart_items));
 } else {
    const error = await res.json();
    return error;
 }
};


export const addItemToCart = (productId, quantity) => async (dispatch) => {
 const res = await fetch(`/api/cart_items/add/${productId}`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({ quantity }),
 });
 if (res.ok) {
   const newItem = await res.json();
   dispatch(addToCart(newItem));
   return newItem
 } else {
    const error = await res.json();
    return error;
 }
};

export const removeItemFromCart = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${itemId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteCartItem(itemId));
    } else {
        const error = await res.json();
        return error;
    }
};



const initialState = {
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.item],
            };
        case GET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.items,
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.itemId),
            };
        default:
            return state;
    }
};

export default cartReducer;