import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Field, reduxForm } from 'redux-form';
import fetchCategory from '../queries/fetch_category';
import TextField from '../components/form/text_field';
import CheckBoxField from '../components/form/checkbox_field';

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
}
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
        <Field name="name" component={TextField} label="Category Name" />
        <Field name="description" component={TextField} label="Description" />
        <Field name="childOnly" component={CheckBoxField} label="Child Only" />
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
  validate,
})(graphql(mutation)(CategoryCreateForm));
