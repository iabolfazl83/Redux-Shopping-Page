import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
  const cartVisible = useSelector(state => state.uiSlice.isVisible);
  const cart = useSelector(state => state.cartSlice);

  useEffect(() => {
    fetch("https://redux-shopping-page-d6ecb-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
      method: 'PUT',
      body: JSON.stringify(cart),
    })
  }, [cart])
  return (
    <Layout>
      {
        cartVisible && <Cart/>
      }
      <Products/>
    </Layout>
  );
}

export default App;
