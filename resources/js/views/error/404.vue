<template>
    <div class="container-404">
        <img class="image-404" src="/images/error/404.svg" alt="404">
        <div class="text-center">
            <p>{{$t('notfound.title')}}</p>
            <router-link :to="{name: 'fdhome'}">
                <el-button type="primary" round>{{ $t('notfound.home') }}</el-button>
            </router-link>
        </div>
    </div>

</template>

<script>
    export default {
        name: "error_404"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .container-404 {
        width: 100%;

        .image-404 {
            display: block;
            margin: 0 auto;
            width: 30vw;
            height: 30vh;
        }

        .text-center {
            text-align: center;
        }
    }

</style>
