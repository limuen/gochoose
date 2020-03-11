<template>
    <Operate :is-edit="true"/>
</template>

<script>
    import Operate from '@/views/setup/operate/components/operate'
    export default {
        name: 'permissionEdit',
        components: {
            Operate
        }
    }
</script>

<style lang="scss" scoped>

</style>