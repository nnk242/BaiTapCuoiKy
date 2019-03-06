<template>
    <div>
        <div class="custom-content">
            <div class="block">
                <el-carousel indicator-position="outside" trigger="click" style="max-height: 370px"
                             class="custom-carousel">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <div class="custom-carousel-content"
                             style="background-image:url('https://www.pizzahut.vn/files/banner/Final_%2029k_OLOBanner.jpg'); width: 100%; height: 100%">

                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="md-layout md-gutter">
                <div v-for="item in items" :key="item.id"
                     class="md-layout-item md-xlarge-size-25 md-large-size-33 md-medium-size-50 md-small-size-50 md-xsmall-size-100"
                     style="margin-bottom: 10px; position: sticky">
                    <md-card class="md-primary" md-theme="orange" md-with-hover>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">{{item.name}}</div>
                                <div class="md-subhead">{{item.description}}</div>
                            </md-card-header-text>

                            <md-card-media md-big>
                                <img
                                    src="https://images.foody.vn/res/g3/26134/prof/s576x330/foody-mobile-viet-huong-mb-jpg-908-635654327254804428.jpg"
                                    :alt="item.name">
                            </md-card-media>
                        </md-card-header>

                        <md-card-actions style="margin-top: 5px">
                            <md-button class="md-raised"><i class="fas fa-donate"></i> Đặt hàng</md-button>
                            <md-button class="md-raised md-accent" @click="addToCart(item.id)"><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</md-button>
                        </md-card-actions>
                    </md-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {menu} from '../../api/common'

    export default {
        name: "home",
        data:() => ({
            items: ''
        }),
        mounted() {
            menu().then(response=> {
                    this.items = response.data.data
                console.log(this.items)
                })
            // console.log(this.$store.getters.products.length)
            console.log(this.$store.getters.products)
            console.log(typeof this.$store.getters.products)
        },
        methods:{
            addToCart(id) {
                this.$store.dispatch('setProducts', id)
                console.log(this.$store.getters.products)
            }
        }
    }
</script>

<style scoped>

</style>
