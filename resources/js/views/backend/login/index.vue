<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="top" :rules="loginRules"
                 size="medium">
            <div class="title-container">
                <div class="title-form-st">
                    <h1 class="text-center">{{ $t('login.title') }}</h1>
                </div>
                <div class="content-form-st">
                    <div class="text-center error_login" :class="hidden_error">
                        <small>{{ text_error }}</small>
                    </div>
                    <el-form-item :label="$t('login.username')" prop="username">
                        <el-input :placeholder="$t('login.placeholder.password')" v-model="loginForm.username"
                                  name="username" @keyup.enter.native="handleLogin"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('login.password')" prop="password">
                        <el-input :placeholder="$t('login.placeholder.password')" type="password"
                                  v-model="loginForm.password" name="password"
                                  @keyup.enter.native="handleLogin"></el-input>
                    </el-form-item>
                </div>
                <div class="footer-form-st text-center">
                    <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">{{
                        $t('login.button') }}
                    </el-button>
                </div>
                <div class="select-lang">
                    <LangSelect/>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import LangSelect from '../../../components/LangSelect'

    export default {
        components: {
            LangSelect
        },
        data() {
            const validateUsername = (rule, value, callback) => {
                this.hidden_error = 'hidden-error'
                if (this.loginForm.username.length < 4) {
                    callback(new Error(this.$t('login.notification.username.error')))
                } else callback()
            }

            const validatePassword = (rule, value, callback) => {
                this.hidden_error = 'hidden-error'
                if (this.loginForm.password.length < 6) {
                    callback(new Error(this.$t('login.notification.password.error')))
                } else callback()
            }

            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}],
                },
                redirect: undefined,
                loading: false,
                hidden_error: 'hidden-error',
                text_error: 'show error'
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            handleLogin() {
                this.loading = true
                setTimeout(() => {
                    this.$refs.loginForm.validate(valid => {
                            this.hidden_error = 'hidden-error'
                            if (valid) {
                                this.$store.dispatch('login', this.loginForm)
                                    .then(() => {
                                        this.loading = false
                                        this.$router.push({path: this.redirect || '/admin/dashboard'})
                                    })
                                    .catch(error => {
                                        this.loading = false
                                        //error
                                        this.hidden_error = ''
                                        this.text_error = this.$t('login.notification.error')
                                        console.log(error)
                                    })
                            } else {
                                console.log('required valid')
                                this.loading = false
                            }
                        }
                    )
                }, 250)
            }
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
        width: 290px;
        background-color: $background_form;
        border-radius: 3px;
        margin: 16vh auto 0 auto;
    }

    .error_login {
        color: #f44259;
    }

    .select-lang {
        padding: 15px 0 5px 5px;
    }

    .hidden-error {
        visibility: hidden;
    }

</style>
