<template>
    <div class="vehicle-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="运维日志" name="journal">
                <Journal />
            </el-tab-pane>
            <el-tab-pane label="故障报修" name="repair">
                <repair />
            </el-tab-pane>
            <el-tab-pane label="维修工单" name="customer">
                <customer />
            </el-tab-pane>
            <el-tab-pane label="运维员" name="maintenance">
                <maintenance />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Journal from "./components/journal";
    import repair from "./components/repair";
    import customer from "./components/customer";
    import maintenance from './components/maintenance';
    export default {
        name: 'vehicle',
        components: {
            Journal,
            repair,
            customer,
            maintenance
        },
        data() {
            return {
                activeName: 'journal'
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