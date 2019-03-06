import Vue from 'vue'
import * as distributor from '../../../api/distributor'

Vue.component('custom-actions', {
    template: [
        '<div>',
        '<el-button type="success" icon="fas fa-retweet" class="custom-icon" circle @click="restore(rowData)" :size="size"></el-button>',
        '</div>'
    ].join(''),
    props: {
        rowData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            size: 'mini',
            disabled: false
        }
    },
    methods: {
        restore(data) {
            this.$confirm(this.$t('fieldDefs.action.content.restore'), this.$t('fieldDefs.action.title'), {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.disabled = true
                setTimeout(() => {
                    distributor.restore(data.id)
                        .then(response => {
                            this.$events.fire('filter-reset')
                            this.$message({
                                type: 'success',
                                message: this.$t('fieldDefs.action.success.restore')
                            });
                            this.disabled = false
                        })
                        .catch(error => {
                                this.$message({
                                    type: 'warning',
                                    message: this.$t('fieldDefs.action.error')
                                });
                                this.disabled = false
                            }
                        )
                }, 500)

            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: this.$t('fieldDefs.action.cancel')
                })
            })
        }
    }
})

export default [
    {
        name: '__sequence',   // <----
        title: '#',
    },
    {
        name: 'name_distributors',
        sortField: 'name_distributors',
        direction: 'asc',
        title: 'Distributor'
    },
    {
        name: 'image',
        title: 'image',
        callback: 'viewImage'
    },
    {
        name: 'phone',
        sortField: 'phone',
        direction: 'asc',
        title: 'Number phone'
    },
    {
        name: 'address',
        sortField: 'address',
        direction: 'asc',
        title: 'Address'
    },
    {
        name: 'description',
        title: 'Description'
    },
    {
        name: '__component:custom-actions',   // <----
        title: 'Actions'
    }
]

