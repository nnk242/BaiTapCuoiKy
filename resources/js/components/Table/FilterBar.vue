<template>
    <div class="filter-bar">
        <div class="text-center">
            <label>{{$t('table.filterBar.search.title')}}: </label>
            <input type="text" v-model="filterText" @keyup.enter="doFilter"
                   :placeholder="$t('table.filterBar.search.placeholder')">
            <el-button type="primary" @click="doFilter">{{$t('table.filterBar.search.title')}}</el-button>
            <el-button @click="resetFilter">Reset</el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                filterText: ''
            }
        },
        methods: {
            ///// use vue-event
            doFilter() {
                this.$events.fire('filter-set', this.filterText)
            },
            resetFilter() {
                this.filterText = ''  // clear the text in text input
                this.$events.fire('filter-reset')
            }
            /////
        }
    }
</script>

<style lang="scss" scoped>
    .filter-bar {
        float: left;
        margin-bottom: 10px;
        label {
            font-weight: bold;
        }

        input[type="text"] {
            border: 1px solid #E4E7ED;
            height: 36px;
            border-radius: 2px;
            outline: none;
            padding: 0px 10px;
            min-width: 230px;
            margin: 0px 10px 10px 10px;

            &:focus {
                border-color: #cad5fe;
            }
        }

    }
</style>
