<template>
    <div class="login-container">
        <el-form rel="loginForm" class="login-form" label-position="top" :rules="loginRules" >
            <!--<el-form rel="loginFrom" auto-complete="on" class="login-form">-->
            <div class="title-container">
                <div class="title-form-st">
                    <h1 class="text-center">{{ $t('login.title') }}</h1>
                </div>
                <div class="content-form-st">
                    <el-form-item :label="$t('login.username')">
                        <el-input :placeholder="$t('login.placeholder.password')" v-model="username"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('login.password')" size="small">
                        <el-input :placeholder="$t('login.placeholder.password')" v-model="password"></el-input>
                    </el-form-item>
                </div>
                <div class="footer-form-st text-center">
                    <el-button :loading="loading" type="primary">{{ $t('login.button') }}</el-button>
                </div>
                <div class="select-lang">
                    <LangSelect/>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import LangSelect from '../../components/LangSelect'

    export default {
        data: () => {
            const validateUsername = (rule, value, callback) => {
                if (value.length < 4) {
                    callback(new Error('The username can not be less than 4 digits '))
                } else callback()
            }
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername()}]
                },
                loading: false
            }
        },
        components: {
            LangSelect
        },
        name: "index"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $background_login: #33333b;
    $background_form: #efeade;
    .login-container {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: $background_login;
        overflow: hidden;

        .title-form-st {
            margin: 0 7px;
            padding-top: 5px;
            border-bottom: solid 1px #cccfff;
        }

        .content-form-st {
            padding-top: 20px;
            margin: 0 7px;
        }

        .footer-form-st {
            padding-top: 15px;
        }


    }

    .login-form {
        width: 320px;
        background-color: $background_form;
        border-radius: 3px;
        margin: 24vh auto 0 auto;
    }

    .text-center {
        text-align: center;
    }

    .select-lang {
        padding: 15px 0 5px 5px;
    }

    /*.title-form-st {*/
    /*border-bottom: solid 1px #cccfff;*/
    /*margin: 5px;*/
    /*padding-top: 10px;*/
    /*}*/
</style>
