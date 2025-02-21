import classes from './CartButton.module.css';
import {useDispatch} from "react-redux";
import {toggleCartActions} from "../../store/toggleCart";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(toggleCartActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
