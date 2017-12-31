import React from 'react';
import ProductListItem from './product_list_item';

export default (props) => {
  const { products } = props;
  const productListItems =
    products &&
    products.map((prod) => <ProductListItem key={prod.id} product={prod} />);
  return (
    <div>
      <h3> Products in this Category </h3>
      <ul>{productListItems}</ul>
    </div>
  );
};
