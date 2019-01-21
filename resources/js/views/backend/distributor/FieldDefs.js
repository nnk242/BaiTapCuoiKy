import Vue from 'vue'

Vue.component('custom-actions', {
    template: [
        '<div>',
        '<button class="ui red button" @click="onClick(\'view-item\', rowData)"><i class="fas fa-eye"></i></button>',
        '<button class="ui blue button" @click="onClick(\'edit-item\', rowData)"><i class="fas fa-edit"></i></button>',
        '<button class="ui green button" @click="onClick(\'delete-item\', rowData)"><i class="fas fa-trash-alt"></i></button>',
        '</div>'
    ].join(''),
    props: {
        rowData: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClick(action, data) {
            console.log(action, data.id)
        },
    }
})
export default [
    {
        name: '__sequence',   // <----
        title: '#',
        titleClass: 'center aligned',
        dataClass: 'right aligned'
    },
    {
        name: 'name_distributors',
        sortField: 'name_distributors',
        direction: 'asc',
        title: 'test'
    },
    {
        name: '__component:custom-actions',   // <----
        title: 'Actions',
        titleClass: 'center aligned',
        dataClass: 'center aligned max-w-100'
    }
]

