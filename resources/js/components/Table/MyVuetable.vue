<template>
    <div class="data-table-wp">
        <div v-if="loading">
            <!--<loading-spinner class="mt4" message="Loading..."></loading-spinner>-->
        </div>

        <el-row :gutter="20">
            <el-col :span="16">
                <slot name="btn-add"></slot>
                <filter-bar></filter-bar>
            </el-col>

            <el-col :span="8">
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
                return '<img src=' + value + ' alt="" style="width: 100px" />';
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
                //console.log('cellClicked: ', data.id)
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
        /*width: 100%;*/
        /*float: left;*/
        margin: 44px;
        /*padding: 20px;*/
        /*position: relative;*/
        /*background: #fbfbfc;*/
        /*border: 1px solid #E4E7ED;*/
        .vuetable-pagination-info.left.floated.left.aligned.six.wide.column {
            padding: 20px 0;
            text-align: center;
            width: 100%;
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
