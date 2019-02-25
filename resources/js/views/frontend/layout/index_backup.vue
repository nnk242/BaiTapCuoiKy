<template>
    <el-container>
        <el-header>
            <div class="custom-container">
                <div style="float: left">
                    <div>
                        <i class="fas fa-bars"></i>
                    </div>
                    <img src="https://www.pizzahut.vn//sFiles/images/ph-logo.png" height="50" style="margin-top: 4px;">
                </div>
                <div class="right-menu">
                    <div class="right-menu-item">
                        <router-link :to="'/'">
                            <el-button type="warning" plain size="mini">
                                <i class="fas fa-shopping-cart text-"></i> <span
                                v-if="device!='mobile'">Giỏ hàng</span>
                                <span class="custom-count-cart">2</span>
                            </el-button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="custom-bg-header"></div>
        </el-header>
        <el-main>
            <div class="custom-margin-main">
                <div class="custom-container">
                    <div class="block" style="margin-top: 60px">
                        <el-carousel trigger="click" style="max-height: 370px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <div class="custom-carousel-content"
                                     style="background-image: url(https://www.pizzahut.vn/files/banner/Final_%2029k_OLOBanner.jpg);">
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="custom-margin-main">
                    <div class="custom-container">
                        <el-row>
                            <el-col :span="device!='mobile' ? 12 : 24" v-for="(o, index) in 10" :key="o">
                                <el-card :body-style="{ padding: '10px', height: '340px', 'max-height': '340px' }"
                                         class="custom-margin-main">
                                    <div class="custom-image-item" style="background-image:url(https://66.media.tumblr.com/9824d2449f77263b0d25ac09989395dc/tumblr_pn01avYN3w1rogvb0o1_1280.jpg)">
                                    </div>
                                    <div style="padding: 14px;">
                                        <span>Yummy hamburger</span>
                                        <div class="bottom clearfix">
                                            <time class="time">{{ currentDate }}</time>
                                            <el-button type="text" class="button">Operating button</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-main>
        <el-footer>
            <div class="custom-container">
                <el-row>
                    <el-col :span="device!='mobile'?6:24">
                        <h3 class="custom-h-f">Thực đơn</h3>
                        <ul class="custom-ul-f">
                            <li>Thực đơn đặc biệt</li>
                            <li>Ưu đãi đặc biệt</li>
                            <li>Món ăn nhanh</li>
                            <li>Đồ tự nấu</li>
                            <li>đồ uống</li>
                        </ul>
                    </el-col>
                    <el-col :span="device!='mobile'?6:24">
                        <h3 class="custom-h-f">Giới thiệu</h3>
                        <ul class="custom-ul-f">
                            <li>Thông tin cửa hàng</li>
                            <li>Giấy phép</li>
                            <li>Điều khoản</li>
                        </ul>
                    </el-col>
                    <el-col :span="device!='mobile'?6:24">
                        <h3 class="custom-h-f">Thông tin tuyển dụng</h3>
                        <ul class="custom-ul-f">
                            <li>Shipper</li>
                            <li>Đầu bếp</li>
                            <li>Nhân viên</li>
                            <li>Phát triển nghề nghiệp</li>
                        </ul>
                    </el-col>
                    <el-col :span="device!='mobile'?6:24">
                        <h3 class="custom-h-f">Connect with foodnight</h3>
                        <ul class="custom-ul-f">
                            <li><i class="fab fa-facebook-square custom-text-fb"></i></li>
                        </ul>
                    </el-col>
                </el-row>
                <div class="custom-border"></div>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ResizeHandler from '../../mixin/ResizeHandler'

    export default {
        data() {
            return {
                currentDate: new Date()
            }
        },
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
                this.$store.dispatch('toggleSideBar')
            },
        },
        mounted: () => {
            console.log()
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-header {
        width: 100%;
        position: fixed;
        z-index: 99999;

        .right-menu {
            float: right;
            line-height: 55px;
        }
    }

    .custom-bg-header {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 2px #17acc7 solid;
        z-index: -1;
    }

    .custom-container {
        max-width: 1270px;
        width: 100%;
        margin: auto;
    }

    .el-footer, .custom-bg-header {
        background: linear-gradient(120deg, rgb(0, 228, 208), rgb(89, 131, 232));
    }

    .el-carousel__container {
        height: 370px !important;
    }

    .custom-text-fb {
        color: #4167b2;
    }

    .custom-ul-f {
        list-style-type: none;

        li::before {
            content: "\2022";
            font-weight: bold;
            display: inline-block;
            width: 1em;
        }

        li::before, li {
            color: #defffe;
        }
    }

    .el-main {
        z-index: auto;

        .custom-margin-main {
            margin-top: 30px;
            margin-bottom: 30px;
        }

        .el-carousel {
            border-radius: 3px;

            .el-carousel__item:nth-child(2n) {
                background: linear-gradient(120deg, rgb(0, 228, 208), rgb(89, 131, 232));
            }

            .el-carousel__item:nth-child(2n+1) {
                background: linear-gradient(120deg, rgb(0, 228, 208), rgb(89, 131, 232));
            }

            .el-carousel__button {
                width: 10px;
            }

            .el-carousel__arrow {
                i {
                    font-size: 25px;
                    font-weight: bold;
                }
            }

            .custom-carousel-content {
                width: 100%;
                height: 100%;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
        .custom-image-item {
            height: 222px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
        .el-card {
            overflow: auto;
        }
    }


    .el-footer {
        height: auto !important;
        border-top: solid 1px #17acc7;

        .custom-border {
            border-bottom: solid 4px #defffe;
            width: 66%;
            margin: 0 auto;
            margin-bottom: 20px;
        }
    }

</style>

