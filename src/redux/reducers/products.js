import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.id),
        availableProducts: state.availableProducts.filter(product => product.id !== action.id)
      }
    case CREATE_PRODUCT:
      const newProd = new Product(action.productData.id, action.productData.ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
      return {
        availableProducts: state.availableProducts.concat(newProd),
        userProducts: state.userProducts.concat(newProd)
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(({ id }) => id === action.id)
      const updatedProd = new Product(action.id, state.userProducts[productIndex].ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, state.userProducts[productIndex].price)
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProd

      // find index for available products
      const availableProductIndex = state.availableProducts.findIndex(({ id }) => id === action.id)
      const updatedAvailableProducts = [...state.userProducts]
      updatedAvailableProducts[productIndex] = updatedProd

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }
    default:
      return state;
  }
}
