import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchCategory from '../queries/fetch_category';
import { Field, reduxForm } from 'redux-form';

const CategoryCreateForm = (props) => {
  function saveCategory(values) {
    const parentCategoryId = props.match.params.id;
    const { name, description, childOnly } = values;

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
  }
  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(saveCategory)}>
        <div>
          <label htmlFor="name">name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <Field name="description" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="childOnly">child only</label>
          <Field name="childOnly" component="input" type="checkbox" />
        </div>
        <button type="submit">Create</button>
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

export default reduxForm({
  form: 'category_create',
})(graphql(mutation)(CategoryCreateForm));
