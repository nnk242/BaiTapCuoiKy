<template>
    <el-row :gutter="20">
        <h1 class="text-center">{{$t('distributor.view.title')}}</h1>
        <el-col :span="this.$store.getters.device!=='mobile'?16:24"
                :offset="this.$store.getters.device!=='mobile'?4:0">
            <el-row>
                <el-col :span="8" class="text-bold">{{$t('distributor.view.fullName')}}</el-col>
                <el-col :span="16">{{this.full_name}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="text-bold">{{$t('distributor.view.nameDistributor')}}</el-col>
                <el-col :span="16">{{this.distributor}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="24"></el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import {view} from '../../../api/distributor'

    export default {
        name: "distributorView",
        data() {
            return {
                full_name: '',
                distributor: '',
                image: '',

            }
        },
        mounted() {
            console.log(this.$router.currentRoute.params.id)
            view(this.$router.currentRoute.params.id)
                .then(response => {
                    const {data} = response
                    this.full_name = data.last_name + ' ' + data.first_name
                    this.distributor = data.name_distributor + ' - ' + data.phone
                    console.log(data)
                })
                .catch(() => {

                })
        }
    }
</script>
