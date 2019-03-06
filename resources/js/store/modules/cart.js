import Cookies from 'js-cookie'

function cartArray(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = parseInt(array[i].replace(/^\D+/g, ''))
    }
    return array
}

function renoveCart(array, $item) {
    var index = array.indexOf($item) == -1 ? array.indexOf($item.toString()) : array.indexOf($item)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

const cart = {
    state: {
        products: Cookies.get('product') ? cartArray(Cookies.get('product').slice(1, Cookies.get('product').length - 1).split(",")) : [],
    },
    mutations: {
        SET_PRODUCTS: (state, product) => {
            let index_product

            index_product = state.products.indexOf(product.toString()) == -1 ? state.products.indexOf(product) : state.products.indexOf(product.toString())

            if (index_product == -1) {
                state.products.push(product.toString())

                Cookies.set('product', state.products)
            }
        },
        REMOVE_PRODUCT: (state, product) => {
            if(state.products.length == 1) {
                Cookies.set('product', '')
                state.products = []
            } else
            Cookies.set('product', renoveCart(state.products, product))
        }
    },
    actions: {
        setProducts({commit}, product) {
            commit('SET_PRODUCTS', product)
        },
        removeProduct({commit}, product) {
            commit('REMOVE_PRODUCT', product)
        }
    }
}

export default cart
