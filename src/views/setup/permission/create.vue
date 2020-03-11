<template>
    <Permission :is-edit="false"/>
</template>

<script>
    import Permission from '@/views/setup/permission/components/permission'
    export default {
        name: 'permissionCreate',
        components: {
            Permission
        }
    }
</script>

<style lang="scss" scoped>

</style>