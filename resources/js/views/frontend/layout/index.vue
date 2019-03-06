<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed-last" class="custom-app">
            <md-app-toolbar class="md-large md-dense md-primary custom-fixed">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                            <i class="fas fa-bars"></i>
                        </md-button>
                        <router-link :to="{name: 'fdhome'}"><span class="md-title">FOOD <small>night</small></span></router-link>
                    </div>

                    <div class="md-toolbar-section-end">
                        <router-link :to="{name: 'fcart'}">
                            <md-badge v-if="products.length" :md-content="products.length">
                                <md-button class="md-icon-button">
                                    <i class="fas fa-shopping-bag"></i>
                                </md-button>
                            </md-badge>
                            <md-button class="md-icon-button" v-else>
                                <i class="fas fa-shopping-bag"></i>
                            </md-button>
                        </router-link>
                    </div>
                </div>

                <div class="md-toolbar-row custom-tab">
                    <md-tabs class="md-primary">
                        <md-tab id="tab-special" md-label="Thực đơn đặc biệt"></md-tab>
                        <md-tab id="tab-today" md-label="Ưu đãi mỗi ngày"></md-tab>
                        <md-tab id="tab-night" md-label="Xuất cơm đêm"></md-tab>
                        <md-tab id="tab-fast" md-label="Món ăn nhanh"></md-tab>
                        <md-tab id="tab-make" md-label="Đồ tự nấu"></md-tab>
                        <md-tab id="tab-wine" md-label="Đồ nhậu"></md-tab>
                        <md-tab id="tab-drink" md-label="Đồ uống"></md-tab>
                    </md-tabs>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon><i class="fas fa-sign-in-alt"></i></md-icon>
                        <span class="md-list-item-text" @click="showDialog = true">Đăng nhập</span>
                        <md-dialog :md-active.sync="showDialog">
                            <md-dialog-title>Đăng nhập</md-dialog-title>

                            <md-dialog-content md-dynamic-height>
                                <a href="/login/facebook/redirect">
                                    <md-button class="md-primary md-raised"><i class="fab fa-facebook-f"></i> Facebook
                                    </md-button>
                                </a>
                            </md-dialog-content>

                            <md-dialog-actions>
                                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                            </md-dialog-actions>
                        </md-dialog>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content class="custom-overflow-x-hidden">
                <router-view></router-view>

                <div class="custom-main-footer">
                    <div class="custom-container">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                                <h3 class="custom-h-f">Thực đơn</h3>
                                <ul class="custom-ul-f">
                                    <li>Thực đơn đặc biệt</li>
                                    <li>Ưu đãi đặc biệt</li>
                                    <li>Món ăn nhanh</li>
                                    <li>Đồ tự nấu</li>
                                    <li>đồ uống</li>
                                </ul>
                            </div>
                            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                                <h3 class="custom-h-f">Thông tin tuyển dụng</h3>
                                <ul class="custom-ul-f">
                                    <li>Shipper</li>
                                    <li>Đầu bếp</li>
                                    <li>Nhân viên</li>
                                    <li>Phát triển nghề nghiệp</li>
                                </ul>
                            </div>
                            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                                <h3 class="custom-h-f">Thông tin tuyển dụng</h3>
                                <ul class="custom-ul-f">
                                    <li>Shipper</li>
                                    <li>Đầu bếp</li>
                                    <li>Nhân viên</li>
                                    <li>Phát triển nghề nghiệp</li>
                                </ul>
                            </div>
                            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                                <h3 class="custom-h-f">Thông tin tuyển dụng</h3>
                                <ul class="custom-ul-f">
                                    <li>Shipper</li>
                                    <li>Đầu bếp</li>
                                    <li>Nhân viên</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="footer-s">
                        <div class="custom-t-center">
                            Made with NNK
                        </div>
                    </div>
                </div>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ResizeHandler from '../../mixin/ResizeHandler'

    export default {
        data() {
            return {
                menuVisible: false,
                showDialog: false,
            }
        },
        computed: {
            ...mapGetters([
                'device',
                'products'
            ]),
            sidebar() {
                return this.$store.state.app.sidebar
            }
        },
        mixins: [ResizeHandler],
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .md-app {
        max-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .custom-content {
        margin: 15px 0;
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    main.md-app-container.md-flex.md-layout-column.md-theme-default.md-scrollbar {
        margin-bottom: -15px;
    }

    .custom-fixed {
        position: fixed !important;
    }

    .custom-app {
        height: 100vh;
        margin-bottom: -15px;
    }

    .custom-overflow-x-hidden {
        overflow-x: hidden;
    }

    .custom-tab {
        overflow: auto;
    }

    .page-container {
        margin-top: -2px;
    }

    .custom-main-footer {
        margin: 0 -16px;
        padding: 0 16px;
        background: linear-gradient(120deg, rgb(0, 228, 208), rgb(89, 131, 232));
    }

    .card-layout {
        margin: 16px 15%;
        display: flex;

        .column {
            flex: 1;

            + .column {
                margin-left: 8px;
            }
        }

        .md-card + .md-card {
            margin-top: 8px;
        }
    }

    .custom-carousel {
        max-height: 370px;
        background: linear-gradient(90deg, rgb(0, 228, 208), rgb(89, 131, 232));
        border-radius: 7px;
        margin-bottom: 10px;
        position: sticky !important;
    }

    .custom-carousel-content {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .md-dialog {
        max-width: 768px;
    }

    .custom-container {
        padding: 35px 0;
    }

    .footer-s {
        border-top: 2px solid #cccccc;
        padding: 35px 0;
    }
    .custom-t-center {
        text-align: center;
    }
</style>

