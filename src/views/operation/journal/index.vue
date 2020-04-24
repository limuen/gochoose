<template>
    <div class="journar-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name="operation">
                <operations v-if="operation"/>
            </el-tab-pane>
            <el-tab-pane label="事件日志" name="eventopera">
                <eventopera v-if="eventopera"/>
            </el-tab-pane>
            <el-tab-pane label="GPS日志" name="gps">
                <gpsopera v-if="gps"/>
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
                activeName: 'operation',
                operation: true,
                eventopera: false,
                gps: false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['operation','eventopera','gps']
                tabsName.forEach(item => {
                    this[item] = false;
                    if(item == this.activeName){
                        this[item] = true
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>