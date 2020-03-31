<template>
    <div class="vehicle-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="运维日志" name="journal">
                <Journal v-if="journal"/>
            </el-tab-pane>
            <el-tab-pane label="故障报修" name="repair">
                <repair v-if="repair"/>
            </el-tab-pane>
            <!-- <el-tab-pane label="维修工单" name="customer">
                <customer v-if="customer"/>
            </el-tab-pane> -->
            <el-tab-pane label="运维员" name="maintenance">
                <maintenance v-if="maintenance"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Journal from "./components/journal";
    import repair from "./components/repair";
    import maintenance from './components/maintenance';
    export default {
        name: 'vehicle',
        components: {
            Journal,
            repair,
            maintenance
        },
        data() {
            return {
                activeName: 'journal',
                journal: true,
                repair: false,
                maintenance: false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['journal','repair','maintenance']
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