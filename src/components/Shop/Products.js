import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMY_PRODUCTS = [
    {
      id: 'p1',
      title: 'My First Book',
      price: 6,
      description: 'The first book I ever wrote',
    },
    {
      id: 'p2',
      title: 'My Second Book',
      price: 4,
      description: 'The second book I ever wrote',
    },
  ]

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;
