<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

        <breadcrumb v-if="device!=='mobile'" class="breadcrumb-container"/>

        <div class="right-menu">
            <template v-if="device!=='mobile'">
                <lang-select class="international right-menu-item"/>
            </template>

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <div class="user-avatar"
                         :style="avatar? 'background-image: url('+ avatar +')' : 'background-image: url(/images/default/avatar.svg)'">
                    </div>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link :to="{name: 'accountbe'}">
                        <el-dropdown-item>
                            <i class="fas fa-user-cog"></i> {{ $t('navbar.account') }}
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item>
                        <router-link :to="{name: 'changePassword'}">
                            <i class="fas fa-key"></i> {{ $t('navbar.changePassword') }}
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout"><i class="fas fa-sign-out-alt"></i> {{ $t('navbar.logout') }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '../../../../components/Breadcrumb'
    import Hamburger from '../../../../components/Hamburger'
    import LangSelect from '../../../../components/LangSelect'
    import {charactersProtocolToCodeHex} from '../../../../utils'

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            LangSelect
        },
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
            logout() {
                this.$store.dispatch('logout').then(() => {
                    window.location.href = '/admin/login?redirect=' + charactersProtocolToCodeHex(window.location.pathname) +
                        charactersProtocolToCodeHex(window.location.search)
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;

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

            .theme-switch {
                vertical-align: 15px;
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
