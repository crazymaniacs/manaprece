import gql from 'graphql-tag';

export default gql`
  query CategoryQuery($id: ID) {
    category(id: $id) {
      id
      name
      childOnly
      categories {
        name
        id
      }
      products {
        name
        id
      }
    }
  }
`;
