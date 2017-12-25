const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLNonNull,
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
        resolve: (root, args) => Category.findById(args.id),
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
    description: `mutation AddCategory($name: String, $description:String, $parentCategoryId: String){
      addCategory(name: $name, description:$description, parentCategoryId: $parentCategoryId){
         id,
        name
      }
    }`,
    fields: () => ({
      addCategory: {
        type: CategoryType,
        args: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          parentCategoryId: { type: GraphQLString },
        },
        resolve: (root, { name, description, parentCategoryId }) =>
          new Category({ name, description, parentCategoryId }).save(),
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
