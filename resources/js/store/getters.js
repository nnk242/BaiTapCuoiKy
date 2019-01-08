const getters = {
    language: state => state.app.language,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    size: state => state.app.size,

    token: state => state.user.token
}

export default getters
