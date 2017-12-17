const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    categoryId: {
      type: GraphQLInt,
    },
    category: {
      type: CategoryType,
      resolve: (root, args) => FakeDB.category[root.categoryId],
    },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    icon: {
      type: GraphQLString,
    },
    products: {
      type: GraphQLList(ProductType),
      args: {
        size: { type: GraphQLInt },
      },
      resolve: (root, args) =>
        Object.keys(FakeDB.product)
          .map((prodId) =>
            FakeDB.product[prodId].categoryId == root.id &&
              FakeDB.product[prodId])
          .filter((x) => !!x)
          .slice(0, args.size),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args) => FakeDB.category[args.id],
      },
      product: {
        type: ProductType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args) => FakeDB.product[args.id],
      },
    }),
  }),
});

const FakeDB = {
  category: {
    1: {
      id: 1,
      name: 'Computers',
      icon: '/computers.jps',
    },
    2: {
      id: 2,
      name: 'Smartphones',
      icon: '/smarthpones.jps',
    },
  },
  product: {
    1: {
      id: 1,
      name: 'Asus S14',
      price: 735,
      categoryId: 1,
    },
    2: {
      id: 2,
      name: 'Xiaomi Mi Notebook Pro',
      price: 1055,
      categoryId: 1,
    },
    3: {
      id: 3,
      name: 'Galaxy S7',
      price: 500,
      categoryId: 2,
    },
    4: {
      id: 4,
      name: 'Motorola Moto X',
      price: 200,
      categoryId: 2,
    },
  },
};
