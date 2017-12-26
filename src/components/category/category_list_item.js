import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchCategory from '../../queries/fetch_category';

const CategoryListItem = (props) => {
  const { category } = props;
  const deleteCategory = () => {
    props.mutate({
      variables: { id: category.id },
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
      <Link to={`/category/${category.id}`}>{category.name} </Link>
      <button onClick={deleteCategory}>delete</button>
    </li>
  );
};

const mutation = gql`
  mutation DeleteCategory($id: String) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(CategoryListItem);
