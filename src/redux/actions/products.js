import Product from "../../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {

  return async dispatch => {
    try {
      const res = await fetch(`https://congo-2a174.firebaseio.com/products.json`)

      const resJson = await res.json()

      const loadedProducts = []

      for (const key in resJson) {
        loadedProducts.push(new Product(key, 'u1', resJson[key].title, resJson[key].imageUrl, resJson[key].description, resJson[key].price))
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts })

    }
    catch (error) {

    }
  }
}

export const deleteProduct = productId => {

  return async dispatch => {

    await fetch(`https://congo-2a174.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE',
    })
    dispatch({ type: DELETE_PRODUCT, id: productId })
  }
}

export const createProduct = (title, description, imageUrl, price) => {

  return async dispatch => {
    const res = await fetch(`https://congo-2a174.firebaseio.com/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      })
    })

    const resJson = await res.json()

    dispatch({
      type: CREATE_PRODUCT, productData: {
        id: resJson.name,
        title,
        description,
        imageUrl,
        price,
      }
    })
  }

}

export const updateProduct = (id, title, description, imageUrl) => {

  return async dispatch => {

    await fetch(`https://congo-2a174.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      })
    })

    dispatch({
      type: UPDATE_PRODUCT,
      id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  }
}
