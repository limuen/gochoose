<template>
    <div class="car-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆管理" name="carlist">
                <carlist v-if="carlist"/>
            </el-tab-pane>
            <el-tab-pane label="车辆地图" name="carmap">
                <carmap v-if="carmap"/>
            </el-tab-pane>
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
                activeName: 'carlist',
                carlist: true,
                carmap: false,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['carlist','carmap']
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