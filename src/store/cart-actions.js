import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch("https://redux-shopping-page-d6ecb-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json")

      if (!response.ok) {
        throw Error('Could not fetch cart data!');
      }

      return await response.json();
    }

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        cartItems: cartData.cartItems ?? [],
        totalItems: cartData.totalItems
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: `Fetching cart  data failed!`,
      }));
    }
  }
}

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
        body: JSON.stringify({cartItems: cart.cartItems, totalItems: cart.totalItems}),
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