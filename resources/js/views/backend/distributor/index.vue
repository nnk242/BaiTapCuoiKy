<template>
    <div class="mt-3">
        <my-vuetable
            :api-url="apiUrl"
            :fields="fields"
            :sort-order="sortOrder"
            :append-params="moreParams"
        >
            <div slot="btn-add">
                <el-button type="primary">test</el-button>
                <!--<router-link to="{ name: 'blog_category.create' }" tag="a" class="add-new-item-table">-->
                    <!--<span></span>-->
                <!--</router-link>-->
            </div>
        </my-vuetable>
    </div>
</template>

<script>
    import MyVuetable from '../../../components/Table/MyVuetable'
    import FieldDefs from './FieldDefs'

    export default {
        name: "index",
        components: {
            MyVuetable
        },
        created() {
            // init data table.
            this.apiUrl = '/api/distributor'
        },

        data() {
            return {
                fields: FieldDefs,
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
