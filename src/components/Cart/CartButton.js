import classes from './CartButton.module.css';
import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(uiSliceActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
