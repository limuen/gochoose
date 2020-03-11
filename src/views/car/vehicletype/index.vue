<template>
    <div class="vehicletype-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车型列表" name="vehiclelist">
                <vehiclelist />
            </el-tab-pane>
            <el-tab-pane label="新增车型" name="createvehicle">
                <createbehicle />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import vehiclelist from './components/vehiclelist';
    import createbehicle from './components/createvehicle';
    export default {
        name: 'vehicletype',
        components: {
            vehiclelist,
            createbehicle
        },
        data() {
            return {
                activeName: 'vehiclelist'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>