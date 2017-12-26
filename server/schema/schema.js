const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');
const mongoose = require('mongoose');
const Category = mongoose.model('category');
const Product = mongoose.model('product');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: '...',

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    categoryId: { type: GraphQLInt },
    category: {
      type: CategoryType,
      resolve: (root) => Category.findById(root.categoryId),
    },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    categories: {
      type: GraphQLList(CategoryType),
      resolve: (root) => Category.find({ parentCategoryId: root.id }),
    },
    description: {
      type: GraphQLString,
    },
    products: {
      type: GraphQLList(ProductType),
      resolve: (root) => Product.find({ categoryId: root.id }),
    },
    childOnly: { type: GraphQLBoolean },
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
          id: { type: GraphQLID },
        },
        resolve: (root, { id }) => {
          if (id) {
            return Category.findById(id);
          }
          return Category.findOne({ parentCategoryId: null });
        },
      },
      product: {
        type: ProductType,
        args: {
          id: { type: GraphQLID },
        },
        resolve: (root, args) => Product.findById(args.id),
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
      addCategory: {
        type: CategoryType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLString },
          parentCategoryId: { type: new GraphQLNonNull(GraphQLString) },
          childOnly: { type: GraphQLBoolean },
        },
        resolve: (root, {
          name, description, parentCategoryId, childOnly,
        }) =>
          new Category({
            name,
            description,
            parentCategoryId,
            childOnly,
          }).save(),
      },
      deleteCategory: {
        type: CategoryType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args) => Category.remove({ _id: args.id }),
      },
      addProduct: {
        type: ProductType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLString },
          price: { type: GraphQLFloat },
          categoryId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, {
          name, description, price, categoryId,
        }) =>
          new Product({
            name,
            description,
            price,
            categoryId,
          }).save(),
      },
      deleteProduct: {
        type: ProductType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, { id }) => Product.remove({ _id: id }),
      },
    }),
  }),
});
