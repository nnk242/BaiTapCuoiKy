const getters = {
    language: state => state.app.language,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    size: state => state.app.size,
    role: state => state.user.role,

    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,

    token: state => state.user.access_token,
    token_type: state => state.user.token_type
}

export default getters
