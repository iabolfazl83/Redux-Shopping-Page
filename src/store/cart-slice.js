import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const initialState = {
    cartItems: [],
    totalItems: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            );
            state.totalItems += 1;
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.totalPrice + item.price;
            } else {
                state.cartItems.push({
                    ...item,
                    totalPrice: item.price,
                    quantity: 1,
                });
            }
        },

        removeFromCart(state, action) {
            const itemId = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === itemId);

            if (!existingItem) return;

            state.totalItems -= 1;

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            } else {
                existingItem.quantity -= 1;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },

        clearCart(state) {
            state.cartItems = [];
        },
    },
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        }));

        const sendRequest = async () => {
            const response = await fetch("https://redux-shopping-page-d6ecb-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw Error('Sending cart data failed!');
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Successfully saved cart data!',
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Failed to send cart data!',
                message: `Failed to send cart data! more info: ${error.message}`,
            }));
        }

    }
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
