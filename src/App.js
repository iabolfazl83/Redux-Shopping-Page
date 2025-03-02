import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitialized = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector(state => state.uiSlice.isVisible);
  const cart = useSelector(state => state.cartSlice);
  const notification = useSelector(state => state.uiSlice.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }))
      const response = await fetch("https://redux-shopping-page-d6ecb-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw Error('Sending cart data failed!');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Successfully saved cart data!',
      }))

    }

    if (isInitialized) {
      isInitialized = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Failed to send cart data!',
        message: `Failed to send cart data! more info: ${error.message}`,
      }))
    });

  }, [cart])

  return (
    <>
      {
        notification &&
        <Notification status={notification.status} title={notification.title} message={notification.message}/>
      }
      <Layout>
        {
          cartVisible && <Cart/>
        }
        <Products/>
      </Layout>
    </>
  );
}

export default App;
