<template>
    <div class="data-table-wp">
        <div v-if="loading">
            <!--<i class="el-icon-loading"></i>-->
        </div>

        <el-row :gutter="20">
            <el-col :span="24" class="mgb-10px">
                <slot name="btn-add"></slot>
            </el-col>
            <el-col :span="device!=='mobile'?16:24">
                <filter-bar></filter-bar>
            </el-col>

            <el-col :span="device!=='mobile'?8:24">
                <div class="select-parent st2">
                    <select class="ui simple dropdown" @change="perPageDropdown" v-model="perPageDropdownValue">
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                    </select>
                </div>
            </el-col>
        </el-row>

        <div class="table-parent">
            <vuetable ref="vuetable"
                      :api-url="apiUrl"
                      :http-options="httpOptions"
                      :fields="fields"

                      pagination-path=""
                      :per-page="perPage"
                      @vuetable:pagination-data="onPaginationData"
                      @vuetable-pagination:change-page="onChangePage"

                      :multi-sort="true"
                      :sort-order="sortOrder"

                      :append-params="appendParams"

                      :detail-row-component="detailRowComponent"
                      @vuetable:cell-clicked="onCellClicked"

                      :css="css.table"

                      @vuetable:loaded="onLoaded"
                      @vuetable:loading="onLoading"
            >
            </vuetable>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
            </el-col>
            <el-col :span="24">
                <vuetable-pagination ref="pagination"
                                     @vuetable-pagination:change-page="onChangePage"
                                     :css="css.pagination"
                ></vuetable-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    //// use vue-event
    import Vue from 'vue'
    import VueEvents from 'vue-events'
    import {mapGetters} from 'vuex'
    ////
    import {VuetablePagination, VuetablePaginationInfo, Vuetable} from './VueTable'
    import accounting from 'accounting'
    import moment from 'moment'
    import FilterBar from './FilterBar'
    import CssConfig from './VuetableCssConfig.js'

    //// use vue-event
    Vue.use(VueEvents)
    ////

    export default {
        components: {
            Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
            FilterBar
        },
        data() {
            return {
                css: CssConfig,
                perPage: 10,
                perPageDropdownValue: 10,
                loading: true,
                httpOptions: {
                    headers: {
                        'Authorization': this.$store.getters.token_type + ' ' + this.$store.getters.token
                    }
                }
            }
        },

        props: {
            apiUrl: {
                type: String,
                required: true
            },
            fields: {
                type: Array,
                required: true
            },
            sortOrder: {
                type: Array,
                default() {
                    return []
                }
            },
            appendParams: {
                type: Object,
                default() {
                    return {}
                }
            },
            detailRowComponent: {
                type: String
            }
        },

        computed: {
            ...mapGetters([
                'device'
            ])
        },

        //// use vue-event
        mounted() {
            this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
            this.$events.$on('filter-reset', e => this.onFilterReset())
        },
        ////
        methods: {
            // format data
            allcap(value) {
                return value.toUpperCase()
            },
            genderLabel(value) {
                return value === 'M'
                    ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
                    : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
            },
            formatNumber(value) {
                return accounting.formatNumber(value, 2)
            },
            formatDate(value, fmt = 'D MMM YYYY') {
                return (value == null)
                    ? ''
                    : moment(value, 'YYYY-MM-DD').format(fmt)
            },
            viewImage: function (value) {
                return '<img src=' + value + ' alt="" style="width: 40px" />';
            },

            // pagination
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData)
                this.$refs.paginationInfo.setPaginationData(paginationData) // VuetablePaginationInfo
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page)
            },

            //// use vue-event
            onFilterSet(filterText) {
                this.appendParams.filter = filterText
                Vue.nextTick(() => this.$refs.vuetable.refresh())
            },
            onFilterReset() {
                delete this.appendParams.filter
                Vue.nextTick(() => this.$refs.vuetable.refresh())
            },

            ////
            onCellClicked(data, field, event) {
                this.$refs.vuetable.toggleDetailRow(data.id)
            },
            ////

            perPageDropdown() {
                this.perPage = parseInt(this.perPageDropdownValue);
            },

            // loading
            onLoaded: function () {
                this.loading = false;
            },
            onLoading: function () {
                this.loading = true;
            },
        },

        renderVuetable(h) {
            return h(
                'vuetable',
                {
                    ref: 'vuetable',
                    props: {
                        apiUrl: this.apiUrl,
                        fields: this.fields,
                        paginationPath: "",
                        perPage: this.perPage,
                        multiSort: true,
                        sortOrder: this.sortOrder,
                        appendParams: this.appendParams,
                        detailRowComponent: this.detailRowComponent,
                        css: this.css.table,
                    },
                    on: {
                        'vuetable:cell-clicked': this.onCellClicked,
                        'vuetable:pagination-data': this.onPaginationData,
                    },
                    scopedSlots: this.$vnode.data.scopedSlots
                }
            )
        },
        renderPagination(h) {
            return h(
                'div',
                {class: {'vuetable-pagination': true}},
                [
                    h('vuetable-pagination-info', {ref: 'paginationInfo', props: {css: this.css.paginationInfo}}),
                    h('vuetable-pagination', {
                        ref: 'pagination',
                        props: {css: this.css.pagination},
                        on: {
                            'vuetable-pagination:change-page': this.onChangePage
                        }
                    })
                ]
            )
        },

        watch: {
            'perPage'(val, oldVal) {
                this.$nextTick(function () {
                    this.$refs.vuetable.refresh()
                })
            }
        }
    }
</script>

<style lang="scss">
    .data-table-wp {
        margin: 33px;
        .mgb-10px {
            margin-bottom: 10px;
        }

        .table-parent {
            padding: 20px 10px 5px 10px;
            overflow: auto;

            .my-table {
                margin: 0 auto;
                border-collapse: collapse;
                text-align: left;

                th, td {
                    border: solid #E4E7ED 1px;
                    padding: 8px 15px;
                }

                th:first-child, td:first-child, td:last-child {
                    text-align: center;
                }

                th {
                    background: #e9e8ea;
                }

                tr:hover {
                    background: #e9e8ea;
                    opacity: 0.7;
                }
            }
        }

        .vuetable-pagination-info {
            padding: 20px 0;
            text-align: center;
            width: 100%;
        }

        .select-parent.st2 {
            text-align: right;

            select.ui.simple.dropdown {
                border: solid 1px #E4E7ED;
                border-radius: 2px;
                padding: 7px;
                background: #fefefe;
                margin-top: 2px;
            }
        }

        .pagination {
            justify-content: center;
            display: flex;

            a {
                padding: 5px 10px;
                border: 1px solid #ddd;
                text-decoration: none;
                border-radius: 2px;
                color: #101010;
                font-size: 13px;
                margin-left: 6px;
                cursor: pointer;

                &:hover {
                    border-color: #1d89cf;
                }
            }

            a.disabled {
                background: #eeecec;
                pointer-events: none;
                cursor: default;
            }

            a.btn-primary {
                background: #1d89cf;
                color: #fff;
                border-color: #1d89cf;
                pointer-events: none;
            }
        }

        .vuetable-pagination-info {
            float: left;
            padding-left: 20px;
        }
    }
</style>
