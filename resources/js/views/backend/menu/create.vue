<template>
    <el-row :gutter="20">
        <h1 class="text-center">{{$t('menu.add.title')}}</h1>
        <el-col :span="this.$store.getters.device!=='mobile'?12:24"
                :offset="this.$store.getters.device!=='mobile'?6:0">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item :label="$t('menu.name')">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('menu.description')">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item :label="$t('menu.price')">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item :label="$t('menu.per')">
                    <el-select v-model="value3" placeholder="Select" required>
                        <el-option
                            v-for="item in optionsPer"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('menu.discount')">
                    <el-input-number v-model="ruleForm.discount" :min="0" :max="100"></el-input-number>
                    <span>%</span>
                </el-form-item>
                <el-form-item :label="$t('menu.dateDiscount')">
                    <el-date-picker
                        v-model="value5"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('menu.calo')">
                    <el-input-number v-model="ruleForm.calo" :min="0" :max="1000" :step="0.01"></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('menu.kind')">
                    <el-select v-model="value2" placeholder="Select" required>
                        <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('menu.ingredient')">
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New ingredient
                    </el-button>
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
    import {create} from '../../../api/menu'
    import {kind, per} from '../../../api/common'

    export default {
        name: "distributorAdd",
        data() {
            var validateName = (rule, value, callback) => {
                if (value.length < 1) {
                    callback(new Error(this.$t('changePassword.notification.error')))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass')
                    }
                    callback();
                }
            }


            return {
                ruleForm: {
                    name: '',
                    description: '',
                    price: 0,
                    discount: 0,
                    ingredient: '',
                    date: '',
                    calo: 0,
                    per: '',
                    kind: ''
                },
                rules: {
                    name: [
                        {validator: validateName, trigger: 'blur'}
                    ]
                },
                loading: false,
                tokenFull: '',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: 'Last week',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value5: '',
                options2: [],
                optionsPer: [],
                value2: '',
                value3: '',
            }
        },
        mounted() {
            kind()
                .then(response => {
                    this.options2 = response.data
                })
            per()
                .then(response => {
                    this.optionsPer = response.data
                })

        },
        methods: {
            submitForm(formName) {

                this.ruleForm.ingredient = this.dynamicTags
                this.ruleForm.per = this.value3
                this.ruleForm.kind = this.value2
                this.ruleForm.date = this.value5
                this.loading = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        setTimeout(() => {
                            create(this.ruleForm)
                                .then(response => {
                                    const {message} = response.data
                                    console.log(response)
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
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 33px;
    }

    .el-tag + .el-tag {
        margin-right: 5px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--datetimerange.el-range-editor--medium {
        width: 100%;
    }
</style>
