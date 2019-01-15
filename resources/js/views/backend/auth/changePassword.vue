<template>
    <div>
        <el-row :gutter="20">
            <h1 class="text-center">change password</h1>
            <el-col :span="12" :offset="6">
                <div ></div>
                <label for="password">Password</label>
                <el-input
                    placeholder="Password"
                    suffix-icon="fas fa-unlock" type="password" id="password">
                </el-input>
                <label for="re_password">Confirm password</label>
                <el-input
                    placeholder="Pick a date"
                    suffix-icon="fas fa-unlock" type="password" id="re_password">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "changePassword"
    }
</script>

<style scoped>

</style>
