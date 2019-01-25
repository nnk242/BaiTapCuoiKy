<script>
    export default {
        props: {
            css: {
                type: Object,
                default() {
                    return {
                        infoClass: this.$t('table.infoClass')
                    }
                }
            },
            infoTemplate: {
                type: String,
                default() {
                    return this.$t('table.pagination.displaying') + " {from} " + this.$t('table.pagination.to') + " {to} " + this.$t('table.pagination.of') + " {total} " + this.$t('table.pagination.items')
                }
            },
            noDataTemplate: {
                type: String,
                default() {
                    return this.$t('table.data.noRelevant')
                }
            },
        },
        data: function () {
            return {
                tablePagination: null
            }
        },
        computed: {
            paginationInfo() {
                if (this.tablePagination == null || this.tablePagination.total == 0) {
                    return this.noDataTemplate
                }

                return this.infoTemplate
                    .replace('{from}', this.tablePagination.from || 0)
                    .replace('{to}', this.tablePagination.to || 0)
                    .replace('{total}', this.tablePagination.total || 0)
            },
        },
        methods: {
            setPaginationData(tablePagination) {
                this.tablePagination = tablePagination
            },
            resetData() {
                this.tablePagination = null
            }
        },
    }
</script>
