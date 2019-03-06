<template>
    <el-row :gutter="20">
        <h1 class="text-center">{{$t('distributor.add.title')}}</h1>
        <el-col :span="this.$store.getters.device!=='mobile'?8:24"
                :offset="this.$store.getters.device!=='mobile'?7:0">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item :label="$t('distributor.name')" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('changePassword.newPassword')" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('changePassword.rePassword')" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">
                        {{$t('distributor.button')}}
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "distributorAdd",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass')
                    }
                    callback();
                }
            };
            var validateCheckPass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')))
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error(this.$t('changePassword.notification.rePassword.error')))
                } else {
                    callback()
                }
            }

            var validateOldPass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')))
                } else
                    setTimeout(() => {
                        checkPassword(this.ruleForm.oldPass)
                            .then(response => {
                                const {message} = response.data
                                message === true ?
                                    callback() : callback(new Error(this.$t('changePassword.notification.oldPassword.error')))
                            })
                            .catch(() => {
                                callback(new Error(this.$t('changePassword.notification.oldPassword.errorServer')))
                            })
                    }, 250)

            }

            return {
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    oldPass: [
                        {validator: validateOldPass, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validateCheckPass, trigger: 'blur'}
                    ]
                },
                loading: false,
                tokenFull: ''
            }
        },
        methods: {
            submitForm(formName) {
                this.loading = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        setTimeout(() => {
                            changePassword(this.ruleForm.oldPass, this.ruleForm.pass)
                                .then(response => {
                                    const {message} = response.data
                                    switch (message) {
                                        case true:
                                            this.$message({
                                                message: this.$t('changePassword.notification.success'),
                                                type: 'success'
                                            })
                                            this.$refs['ruleForm'].resetFields();
                                            break
                                        case false:
                                            this.$message({
                                                message: this.$t('changePassword.notification.errorCt'),
                                                type: 'error'
                                            })
                                            break
                                        default:
                                            this.$message({
                                                message: this.$t('changePassword.notification.errorCt'),
                                                type: 'error'
                                            })

                                    }
                                    this.loading = false
                                })
                                .catch(() => {
                                    this.$message({
                                        message: this.$t('changePassword.notification.errorCt'),
                                        type: 'error'
                                    })
                                    this.loading = false
                                })
                        }, 500)
                    } else {
                        this.loading = false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 33px;
    }
</style>
