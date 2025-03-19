import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-actions";

let isInitialized = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector(state => state.uiSlice.isVisible);
  const cart = useSelector(state => state.cartSlice);
  const notification = useSelector(state => state.uiSlice.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitialized) {
      isInitialized = false;
      return;
    }

    cart.changed && dispatch(sendCartData(cart));
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
