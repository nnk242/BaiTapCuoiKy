<template>
    <div>
        <div class="custom-content">
            <md-button v-if="items.length != 0" class="md-primary md-raised"><i class="fas fa-cart-arrow-down"></i> Đặt
                hàng
            </md-button>
            <div class="md-medium-size-100 md-small-size-100 md-xsmall-size-100 md-gutter">

                <div v-if="items.length != 0" v-for="item in items" :key="item.id"
                     class="md-layout-item"
                     style="margin-bottom: 10px; position: sticky">
                    <md-card class="md-primary" md-theme="orange" md-with-hover>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">{{item.name}}</div>
                                <div class="md-subhead">{{item.description}}</div>
                            </md-card-header-text>

                            <md-card-media md-big>
                                <img
                                    src="https://66.media.tumblr.com/18f1268a6f943ba6c340d91b3f75bd19/tumblr_pkdoik7Ghc1rogvb0o1_1280.png"
                                    alt="People">
                            </md-card-media>
                        </md-card-header>

                        <md-card-actions style="margin-top: 5px">
                            <md-button class="md-raised md-accent" @click="removeToCart(item.id)"><i
                                class="fas fa-minus"></i> Xóa đơn hàng
                            </md-button>
                        </md-card-actions>
                    </md-card>
                </div>
                <div v-if="items.length == 0" style="width: 100%">
                    <h1 class="text-center">Không có gì trong giỏ hàng!!!</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCart} from '../../api/common'

    export default {
        name: "cart",
        data: () => ({
            items: ''
        }),
        mounted() {
            getCart(this.$store.getters.products).then(response => {
                this.items = response.data
            })
        },
        methods: {
            removeToCart(id) {
                this.$store.dispatch('removeProduct', id)
                getCart(this.$store.getters.products).then(response => {
                    this.items = response.data
                })
            }
        }
    }
</script>

<style scoped>
    .text-center {
        text-align: center;
    }
</style>
