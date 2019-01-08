<template>
    <div class="app-wrapper">
        <div>
            <h1>layout</h1>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar'
    export default {
        name: "layout",
        components: {Sidebar}
    }
</script>

<style scoped>

</style>
