import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchCategory from '../../queries/fetch_category';

const ProductListItem = (props) => {
  const { product } = props;
  const deleteProduct = () => {
    props.mutate({
      variables: { id: product.id },
      refetchQueries: [
        {
          query: fetchCategory,
          variables: { id: (props.match && props.match.params.id) || null },
        },
      ],
    });
  };
  return (
    <li>
      {' '}
      <div>{product.name} </div>
      <button onClick={deleteProduct}>delete</button>
    </li>
  );
};

const mutation = gql`
  mutation DeleteProduct($id: String) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(ProductListItem);
