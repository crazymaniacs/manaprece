import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchCategory from '../queries/fetch_category';

const ProductCreate = (props) => {
  const submitForm = (evt) => {
    evt.preventDefault();
    const name = document.getElementById('product_name').value;
    const description = document.getElementById('product_description').value;
    const price = document.getElementById('product_price').value || 0;
    const categoryId = props.match.params.id;

    props
      .mutate({
        variables: {
          name,
          description,
          price,
          categoryId,
        },
        refetchQueries: [
          { query: fetchCategory, variables: { id: categoryId } },
        ],
      })
      .then(() => props.history.goBack());
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="product_name">name</label>
          <input id="product_name" type="text" />
        </div>
        <div>
          <label htmlFor="product_description">description</label>
          <input id="product_description" type="text" />
        </div>
        <div>
          <label htmlFor="product_price">price</label>
          <input id="product_price" type="number" />
        </div>
        <button onClick={submitForm}>Create</button>
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddProduct(
    $name: String!
    $description: String
    $price: Float
    $categoryId: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      categoryId: $categoryId
    ) {
      id
    }
  }
`;

export default graphql(mutation)(ProductCreate);
