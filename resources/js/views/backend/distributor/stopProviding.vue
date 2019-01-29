<template>
    <div class="mt-3">
        <my-vuetable
            :api-url="apiUrl"
            :fields="fields"
            :sort-order="sortOrder"
            :append-params="moreParams"
        >
        </my-vuetable>
    </div>
</template>

<script>
    import MyVuetable from '../../../components/Table/MyVuetable'
    import FieldDefsStopProviding from './FieldDefsStopProviding'

    export default {
        name: "index",
        components: {
            MyVuetable
        },
        created() {
            // init data table.
            this.apiUrl = '/api/distributor/show/stopProviding'
        },

        data() {
            return {
                fields: FieldDefsStopProviding,
                css: {
                    ascendingIcon: 'fas fa-angle-up',
                    descendingIcon: 'fas fa-angle-down'
                },

                sortOrder: [
                    /*{
                        field: 'email',
                        sortField: 'email',
                        direction: 'asc'
                    }*/
                ],
                moreParams: {},
                apiUrl: ''
            }
        }
    }
</script>

<style scoped>

</style>
