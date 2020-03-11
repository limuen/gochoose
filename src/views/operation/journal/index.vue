<template>
    <div class="journar-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name="operation">
                <operations />
            </el-tab-pane>
            <el-tab-pane label="事件日志" name="eventopera">
                <eventopera />
            </el-tab-pane>
            <el-tab-pane label="GPS日志" name="gps">
                <gpsopera />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import operations from './components/operations';
    import eventopera from './components/eventopera';
    import gpsopera from './components/gpsopera';
    export default {
        name: 'journal',
        components: {
            operations,
            eventopera,
            gpsopera
        },
        data() {
            return {
                activeName: 'operation'
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