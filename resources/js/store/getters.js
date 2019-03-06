const getters = {
    language: state => state.app.language,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    size: state => state.app.size,
    title: state => state.app.title,

    role: state => state.user.role,
    avatar: state => state.user.avatar,

    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,

    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,

    token: state => state.user.access_token,
    token_type: state => state.user.token_type,

    products: state => state.cart.products,
}

export default getters
