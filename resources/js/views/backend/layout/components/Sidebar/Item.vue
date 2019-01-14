<script>
    import store from '../../../../../store'

    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render: function (createElement, context) {
            const {icon, title} = context.props
            const vnodes = []
            if (store.getters.sidebar.opened) {
                if (icon) {
                    vnodes.push(createElement('i', {
                            attrs: {
                                class: icon + ' position_element',
                            }
                        },
                    ))
                }

                if (title) {
                    vnodes.push(createElement('span', {}, title))
                }
            } else {
                if (icon) {
                    vnodes.push(createElement('i', {
                            attrs: {
                                class: icon + ' position_element',
                            }
                        },
                    ))
                } else {
                    if (title) {
                        vnodes.push(createElement('span', {}, title))
                    }
                }
            }

            // return vnodes
            return createElement(
                'div', [
                    vnodes
                ]
            )
        }
    }
</script>
<style>
    .position_element {
        margin-right: 5px;
    }
</style>
