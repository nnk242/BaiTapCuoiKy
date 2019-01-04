<template>
    <div>
        <LangSelect/>
        <h1>{{ $t('login.name') }}</h1>

    </div>
</template>

<script>
    import LangSelect from '../../components/LangSelect'

    export default {
        components: {
            LangSelect
        },
        name: "index"
    }
</script>

<style scoped>

</style>
