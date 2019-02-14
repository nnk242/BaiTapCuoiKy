<template>
    <div>
        <div class="navbar">
            <div class="custom-container">
                <!--<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>-->

                <!--&lt;!&ndash;<breadcrumb v-if="device!=='mobile'" class="breadcrumb-container"/>&ndash;&gt;-->
                <div class="-menu"></div>
                <div class="right-menu">
                    <template v-if="device!=='mobile'">
                        <!--<lang-select class="international right-menu-item"/>-->
                    </template>

                    <div class="avatar-container right-menu-item" trigger="click">
                        <router-link :to="'/'">
                            <el-button type="warning" plain size="mini">
                                <i class="fas fa-shopping-cart"></i> <span v-if="device!='mobile'">Giỏ hàng</span>
                                <span class="custom-count-cart">2</span>
                            </el-button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="custom-bg-fd"></div>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    // import Breadcrumb from '../../../../components/Breadcrumb'
    // import Hamburger from '../../../../components/Hamburger'
    // import LangSelect from '../../../../components/LangSelect'
    // import {charactersProtocolToCodeHex} from '../../../../utils'

    export default {
        computed: {
            ...mapGetters([
                'sidebar',
                // 'name',
                'avatar',
                'device'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
        },
        mounted: () => {
            console.log()
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .custom-count-cart {
        border: solid 2px #ffffff;
        border-radius: 5px;
        margin: 0 5px;
        font-weight: bold;
        color: #000100;
        padding: 0 7px;
    }

    .custom-bg-fd {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #3565b2;
        border-bottom: 2px #3d4d50 solid;
        -webkit-box-shadow: 0px 3px 0px #3565b254;
        -moz-box-shadow: 0px 3px 0px #3565b254;
        box-shadow: 0px 3px 0px #3565b254;
        z-index: -1;
    }

    .custom-container {
        max-width: 1270px;
        width: 100%;
        margin: auto;
    }

    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        position: relative;

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }

            .screenfull {
                height: 20px;
            }

            .international {
                vertical-align: top;
            }

            .avatar-container {
                height: 50px;
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        background: no-repeat center #dbdbdb;
                        background-size: 50px;
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        transition: 2s;
                    }

                    &:hover .user-avatar {
                        background: #cccccc;
                        background-size: 50px;
                        transition: 10s;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>

