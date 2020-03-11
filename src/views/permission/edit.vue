<template>
    <Permission :is-edit="true"/>
</template>

<script>
    import Permission from '@/views/permission/components/permission'
    export default {
        name: 'permissionEdit',
        components: {
            Permission
        }
    }
</script>

<style lang="scss" scoped>

</style>