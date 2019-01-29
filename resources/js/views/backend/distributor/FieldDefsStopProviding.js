import Vue from 'vue'
import * as distributor from '../../../api/distributor'

Vue.component('custom-actions', {
    template: [
        '<div>',
        '<el-button type="info" icon="fas fa-eye" circle @click="onClick(\'view-item\', rowData)" :size="size"></el-button>',
        '<el-button type="primary" icon="el-icon-edit" circle @click="onClick(\'edit-item\', rowData)" :size="size"></el-button>',
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

