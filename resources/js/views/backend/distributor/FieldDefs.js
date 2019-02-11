import Vue from 'vue'
import * as distributor from '../../../api/distributor'

Vue.component('custom-actions-distributor', {
    template: [
        '<div>',
        '<el-button type="info" icon="fas fa-eye" class="custom-icon" circle @click="onClick(\'view-item\', rowData)" :size="size"></el-button>',
        '<el-button type="primary" icon="el-icon-edit" class="custom-icon" circle @click="onClick(\'edit-item\', rowData)" :size="size"></el-button>',
        '<el-button type="danger" icon="el-icon-delete" class="custom-icon" circle @click="actionDelete(rowData)" :size="size" :disabled="disabled"></el-button>',
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
        onClick(action, data) {
            console.log(action, data.id)
        },
        actionDelete(data) {
            this.$confirm(this.$t('fieldDefs.action.content.delete'), this.$t('fieldDefs.action.title'), {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.disabled = true
                setTimeout(() => {
                    distributor.destroy(data.id)
                        .then(response => {
                            this.$events.fire('filter-reset')
                            this.$message({
                                type: 'success',
                                message: this.$t('fieldDefs.action.success.delete')
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
        name: '__component:custom-actions-distributor',   // <----
        title: 'Actions'
    }
]

