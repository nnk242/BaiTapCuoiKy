<template>
    <div>
        <el-row :gutter="20">
            <h1 class="text-center">{{$t('account.title')}}</h1>
            <el-col :span="this.$store.getters.device!=='mobile'?8:24"
                    :offset="this.$store.getters.device!=='mobile'?8:0">
                <el-upload class="upload-center" action="http://127.0.0.1:8000/api/auth/uploadAvatar"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload"
                           :headers="headers"
                           v-loading="loadingUploadImg">
                    <div class="img-profile">
                        <div class="form-img"
                             :style="imageUrl?
                             'background-image: url(' + imageUrl + ')':'background-image: url('+ ruleForm.avatar +')'">
                            <div class="title-change-img">
                                <i class="fas fa-camera"></i>
                            </div>
                        </div>
                    </div>
                </el-upload>

                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm">
                    <div class="action-change">
                        <el-form-item :label="$t('account.lastName')">
                            <el-input v-model="ruleForm.lastName"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('account.name')" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('account.birthDay')">
                            <el-date-picker type="date" v-model="ruleForm.birthDay" style="width: 100%"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('account.numberPhone')" prop="numberPhone">
                            <el-input v-model="ruleForm.numberPhone"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('account.gender.label')">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="male">{{$t('account.gender.male')}}</el-radio>
                                <el-radio label="female" aria-checked="true">{{$t('account.gender.female')}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('account.description')">
                            <el-input type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                    </div>


                    <el-form-item :label="$t('account.password')" prop="oldPass">
                        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">
                            {{$t('changePassword.button')}}
                        </el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {checkPassword, updateUserInfo, getUserInfo} from '../../../api/auth'

    export default {
        name: "account",
        data() {
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
            var validateName = (rule, value, callback) => {
                (!value || typeof value === 'undefined') ?
                    callback(new Error(this.$t('account.notification.name.error'))) :
                    callback()
            }
            var validateNumberPhone = (rule, value, callback) => {
                if (value.length === 0) {
                    callback()
                } else {
                    if (value.length < 8) {
                        callback(new Error(this.$t('account.notification.numberPhone.errorLength')))
                    } else {
                        callback()
                    }
                }

                callback()
            }

            return {
                ruleForm: {
                    lastName: '',
                    name: '',
                    oldPass: '',
                    birthDay: '',
                    numberPhone: '',
                    gender: '',
                    avatar: '',
                    description: ''
                },
                rules: {
                    oldPass: [
                        {validator: validateOldPass, trigger: 'blur'}
                    ],
                    name: [
                        {validator: validateName, tripper: 'blur'}
                    ],
                    numberPhone: [
                        {validator: validateNumberPhone, tripper: 'blur'}
                    ]
                },
                loading: false,
                loadingUploadImg: false,
                upload: true,
                imageUrl: '',
                headers: {
                    authorization: '',
                    // key: ''
                }
            }
        },
        mounted() {
            this.headers.authorization = this.$store.getters.token_type + ' ' + this.$store.getters.token
            getUserInfo()
                .then(response => {
                    this.ruleForm.birthDay = response.data.birth_day
                    this.ruleForm.lastName = response.data.last_name
                    this.ruleForm.name = response.data.name
                    this.ruleForm.gender = response.data.gender
                    this.ruleForm.numberPhone = response.data.phone === null ? '' : response.data.phone
                    this.ruleForm.avatar = response.data.avatar === null? '/images/default/avatar.svg': response.data.avatar
                    this.ruleForm.description = response.data.description
                })
                .catch(() => {
                    console.log('get data fail!')
                })
        },
        methods: {
            submitForm(formName) {
                this.loading = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        setTimeout(() => {
                            const data = {
                                last_name: this.ruleForm.lastName,
                                name: this.ruleForm.name,
                                birth_day: this.ruleForm.birthDay,
                                phone: this.ruleForm.numberPhone,
                                gender: this.ruleForm.gender,
                                description: this.ruleForm.description
                            }

                            updateUserInfo(data)
                                .then(response => {
                                    if (response.data.message === true)
                                        this.$message.success(this.$t('account.notification.success'))
                                    else
                                        this.$message.error(this.$t('account.notification.error'))
                                    this.ruleForm.oldPass = ''
                                })
                            this.loading = false
                        }, 500)
                    } else {
                        this.loading = false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.loadingUploadImg = true
                setTimeout(() => {
                    if (this.upload == true) {
                        this.$message.success(this.$t('account.notification.file.success'))
                        this.imageUrl = URL.createObjectURL(file.raw)
                        this.$store.dispatch('setAvatar')
                    }
                    this.loadingUploadImg = false
                }, 1000)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2;
                switch (true) {
                    case !isJPG:
                        this.$message.error(this.$t('account.notification.file.type.error'))
                        this.upload = false
                        break
                    case !isLt2M:
                        this.$message.error(this.$t('account.notification.file.size.error'))
                        this.upload = false
                        break
                    default:
                        this.upload = true
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .upload-center {
        text-align: center;
    }

    .el-form-item {
        margin-bottom: 33px;
    }

    .title-change-img {
        position: relative;
        width: 150px;
        height: 150px;
    }

    .action-change {
        border-bottom: solid 1px #c8cbcf;
        margin-bottom: 20px;
    }

    .img-profile {
        margin-bottom: 33px;

        .form-img {
            position: relative;
            width: 150px;
            height: 150px;
            border: solid 5px #cccccc;
            border-radius: 50%;
            margin: 0 auto;
            background: no-repeat center #dbdbdb;
            background-size: 170px;
            cursor: pointer;

            .title-change-img {
                border: solid 5px #997997;
                border-radius: 50%;
                margin-left: -5px;
                margin-top: -5px;
                text-align: center;
                background: #cccccc;
                padding-top: 60px;
                transition: 1s;
                opacity: 0;

                i {
                    font-size: 29px;
                }
            }

            &:hover .title-change-img {
                transition: 1s;
                opacity: 0.7;
            }
        }
    }
</style>
