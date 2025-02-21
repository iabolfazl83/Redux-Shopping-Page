import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = (props) => {
  const cartItems = useSelector(state => state.cartSlice.totalItems)
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(uiActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default CartButton;
