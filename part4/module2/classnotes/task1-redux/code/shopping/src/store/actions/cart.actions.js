import { createAction } from 'redux-actions'

export const addProductToCart = createAction('addProductToCart')

export const addProductToLocalCart = createAction('addProductToLocalCart')

export const loadCarts = createAction('loadCarts')

export const saveCarts = createAction('saveCarts')

export const deleteProductFromCart = createAction('deleteProductFromCart')

export const deleteProductFromLocalCart = createAction('deleteProductFromLocalCart')

export const changeServiceProductNumber = createAction('changeServiceProductNumber')

export const changeLocalProductNumber = createAction('changeLocalProductNumber')




