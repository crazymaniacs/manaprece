import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import CategoryList from '../components/category/category_list';
import ProductList from '../components/product/product_list';
import fetchCategory from '../queries/fetch_category';

const Category = (props) => {
  const { category, loading } = props.data;
  if (loading) {
    return <h3> Loading</h3>;
  }

  if (category.childOnly) {
    return (
      <div>
        <h1> {(category && category.name) || 'No Categories yet'}</h1>
        <CategoryList categories={category.categories} />
        <Link to={`/category/${category.id}/create_category`}>
          <button>Add Category</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1> {(category && category.name) || 'No Categories yet'}</h1>
      <ProductList products={category.products} />
      <Link to={`/category/${category.id}/create_product`}>
        <button>Add Product</button>
      </Link>
    </div>
  );
};

export default graphql(fetchCategory, {
  options: (props) => ({ variables: { id: props.match.params.id } }),
})(Category);
