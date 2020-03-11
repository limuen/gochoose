<template>
    <div class="car-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆管理" name="carlist">
                <carlist />
            </el-tab-pane>
            <el-tab-pane label="车辆地图" name="carmap">
                <carmap />
            </el-tab-pane>
            <!-- <el-tab-pane label="批量操作" name="caroperation">
                <caroperation />
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
    import carlist from './components/carlist';
    import carmap from './components/carmap';
    // import caroperation from './components/caroperation'
    export default {
        name: 'carmanag',
        components: {
            carlist,
            carmap,
            // caroperation
        },
        data() {
            return {
                activeName: 'carlist'
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