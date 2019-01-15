<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <Sidebar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <!--<tags-view/>-->
            <app-main/>
            <!--<router-view></router-view>-->
        </div>
    </div>
</template>

<script>
    import {Sidebar, Navbar, AppMain} from './components'
    import ResizeHandler from './mixin/ResizeHandler'

    export default {
        name: "layout",
        components: {Sidebar, Navbar, AppMain},
        mixins: [ResizeHandler],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('closeSideBar', {withoutAnimation: false})
            }
        }
    }
</script>

<style type="stylesheet/scss" lang="scss">
    @import "../../../../sass/mixin";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
