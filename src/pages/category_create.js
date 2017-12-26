import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchCategory from '../queries/fetch_category';

const CategoryCreate = (props) => {
  const submitForm = (evt) => {
    evt.preventDefault();
    const name = document.getElementById('category_name').value;
    const description = document.getElementById('category_description').value;
    const childOnly = document.getElementById('category_childOnly').checked;
    const parentCategoryId = props.match.params.id;

    props
      .mutate({
        variables: {
          name,
          description,
          childOnly,
          parentCategoryId,
        },
        refetchQueries: [
          { query: fetchCategory, variables: { id: parentCategoryId } },
        ],
      })
      .then(() => props.history.goBack());
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="category_name">name</label>
          <input id="category_name" type="text" />
        </div>
        <div>
          <label htmlFor="category_name">description</label>
          <input id="category_description" type="text" />
        </div>
        <div>
          <label htmlFor="category_name">child only</label>
          <input id="category_childOnly" type="checkbox" />
        </div>
        <button onClick={submitForm}>Create</button>
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddCategory(
    $name: String!
    $description: String
    $parentCategoryId: String!
    $childOnly: Boolean
  ) {
    addCategory(
      name: $name
      description: $description
      parentCategoryId: $parentCategoryId
      childOnly: $childOnly
    ) {
      id
    }
  }
`;

export default graphql(mutation)(CategoryCreate);
