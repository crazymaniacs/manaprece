import React from 'react';
import CategoryListItem from './category_list_item';

export default (props) => {
  const { categories } = props;
  const categoryListItems =
    categories &&
    categories.map((cat) => <CategoryListItem key={cat.id} category={cat} />);
  return (
    <div>
      <h3> Sub Categories </h3>
      <ul>{categoryListItems}</ul>
    </div>
  );
};
