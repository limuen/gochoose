<template>
    <div class="caroperation-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tab-class">
            <el-tab-pane label="新增车辆（批量）" name="createcar">
                <createcar />
            </el-tab-pane>
            <el-tab-pane label="编辑车辆（批量）" name="editcar">
                <editcar />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'caroperation',
        components: {
            createcar,
            editcar
        },
        data() {
            return {
                activeName: 'createcar'
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
.caroperation-container .el-tab-class /deep/ .el-tabs__active-bar {
    width: 112px !important;
}
</style>