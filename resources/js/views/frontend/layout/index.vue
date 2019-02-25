<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed-last" class="custom-app">
            <md-app-toolbar class="md-large md-dense md-primary custom-fixed">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                            <i class="fas fa-bars"></i>
                        </md-button>

                        <span class="md-title">FOOD <small>night</small></span>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button">
                            <i class="fas fa-shopping-bag"></i>
                        </md-button>
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
                <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>move_to_inbox</md-icon>
                        <span class="md-list-item-text">Inbox</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>send</md-icon>
                        <span class="md-list-item-text">Sent Mail</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Trash</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>error</md-icon>
                        <span class="md-list-item-text">Spam</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content class="custom-overflow-x-hidden">
                <div class="custom-content">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                            <md-card class="md-primary" md-theme="orange" md-with-hover>
                                <md-card-header>
                                    <md-card-header-text>
                                        <div class="md-title">Title here</div>
                                        <div class="md-subhead">Subtitle here</div>
                                    </md-card-header-text>

                                    <md-card-media md-big>
                                        <img
                                            src="https://66.media.tumblr.com/18f1268a6f943ba6c340d91b3f75bd19/tumblr_pkdoik7Ghc1rogvb0o1_1280.png"
                                            alt="People">
                                    </md-card-media>
                                </md-card-header>

                                <md-card-actions>
                                    <md-button>Action</md-button>
                                    <md-button>Action</md-button>
                                </md-card-actions>
                            </md-card>
                        </div>

                        <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                            <md-card class="md-primary" md-theme="orange" md-with-hover>
                                <md-card-header>
                                    <md-card-header-text>
                                        <div class="md-title">Title here</div>
                                        <div class="md-subhead">Subtitle here</div>
                                    </md-card-header-text>

                                    <md-card-media md-big>
                                        <img
                                            src="https://66.media.tumblr.com/18f1268a6f943ba6c340d91b3f75bd19/tumblr_pkdoik7Ghc1rogvb0o1_1280.png"
                                            alt="People">
                                    </md-card-media>
                                </md-card-header>

                                <md-card-actions>
                                    <md-button>Action</md-button>
                                    <md-button>Action</md-button>
                                </md-card-actions>
                            </md-card>
                        </div>

                        <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                            <md-card class="md-primary" md-theme="orange" md-with-hover>
                                <md-card-header>
                                    <md-card-header-text>
                                        <div class="md-title">Title here</div>
                                        <div class="md-subhead">Subtitle here</div>
                                    </md-card-header-text>

                                    <md-card-media md-big>
                                        <img
                                            src="https://66.media.tumblr.com/18f1268a6f943ba6c340d91b3f75bd19/tumblr_pkdoik7Ghc1rogvb0o1_1280.png"
                                            alt="People">
                                    </md-card-media>
                                </md-card-header>

                                <md-card-actions>
                                    <md-button>Action</md-button>
                                    <md-button>Action</md-button>
                                </md-card-actions>
                            </md-card>
                        </div>
                    </div>
                </div>

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
                        <div class="custom-border"></div>
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
        data: () => ({
            menuVisible: false
        }),
        computed: {
            ...mapGetters([
                'sidebar',
                // 'name',
                'avatar',
                'device'
            ])
        },
        mixins: [ResizeHandler],
        methods: {
            toggleSideBar() {
                // this.$store.dispatch('toggleSideBar')
            },
        },
        mounted: () => {
            console.log()
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
</style>

