<template>
    <div>
        <h1>{{ $t('login.name') }}</h1>
        <el-dropdown trigger="click" @command="handleSetLanguage" class="globe">
            <div><i class="fas fa-globe"></i></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="language === 'vi'" command="vi">{{ $t('common.name.vi') }}</el-dropdown-item>
                <el-dropdown-item :disabled="language === 'en'" command="en">{{ $t('common.name.en') }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
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
            }
        }
    }
</script>

<style scoped>
.globe {
    width: 70px;
    vertical-align: top;
}
</style>
