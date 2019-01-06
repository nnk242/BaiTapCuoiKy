<template>
    <el-dropdown trigger="click" @command="handleSetLanguage" class="globe">
        <div><el-button type="success" icon="fas fa-globe" circle></el-button></div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language === 'vi'" command="vi">{{ $t('common.name.vi') }}</el-dropdown-item>
            <el-dropdown-item :disabled="language === 'en'" command="en">{{ $t('common.name.en') }}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        name: "index",
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        methods: {
            handleSetLanguage(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('setLanguage', lang)
                this.$message({
                    message: this.$t('common.notification.success'),
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>

</style>
