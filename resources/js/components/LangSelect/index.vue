<template>
    <el-dropdown trigger="click" @command="handleSetLanguage" class="globe">
        <!--<div><el-button type="success" icon="fas fa-globe" circle></el-button></div>-->
        <div class="btn-lang">
            <div class="btn-lang-child"><i class="fas fa-globe"></i></div>
        </div>
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

<style rel="stylesheet/scss" lang="scss" scoped>
    .btn-lang {
        text-align: center;
        margin-top: 15px;
        .btn-lang-child {
            border: solid 1px #304156;
            width: 27px;
            height: 27px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
            background: #efeade;
            transition: 1s;

            &:hover {
                background: #4AB7BD;
                border: solid 1px #efeade;
                transition: 1s;
            }

            &:hover i {
                color: #efeade;
                transition: 1s;
            }

            i {
                position: absolute;
                left: 7px;
                margin-top: 5px;
                color: #599657;
                transition: 1s;
            }
        }
    }

</style>
