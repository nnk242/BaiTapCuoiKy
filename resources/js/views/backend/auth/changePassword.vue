<template>
    <div>
        <el-row :gutter="20">
            <h1 class="text-center">{{$t('changePassword.title')}}</h1>
            <el-col :span="device!=='mobile'?12:24" :offset="device!=='mobile'?6:0">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item :label="$t('changePassword.oldPassword')" prop="oldPass">
                        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('changePassword.newPassword')" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('changePassword.rePassword')" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {checkPassword} from '../../../api/auth'

    export default {
        name: "changePassword",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateCheckPass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error(this.$t('changePassword.notification.rePassword.error')));
                } else {
                    callback();
                }
            };

            var validateOldPass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(this.$t('changePassword.notification.error')))
                } else
                    setTimeout(() => {
                        checkPassword(this.access_token)
                            .then(response => {
                                callback()
                            })
                            .catch(() => {
                                callback(new Error(this.$t('changePassword.notification.oldPassword.error')))
                            })
                    }, 1000)

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
                access_token: this.token_type + ' ' + this.token
            };
        },
        computed: {
            ...mapGetters([
                'device',
                'token',
                'token_type'
            ])
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
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
