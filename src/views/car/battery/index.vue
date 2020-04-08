<template>
    <div class="battery-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="更换记录" name="replace">
                <replace  v-if="replace"/>
            </el-tab-pane>
            <el-tab-pane label="电池列表" name="batterylist">
                <betterylist  v-if="batterylist" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import replace from './components/replace';
    import betterylist from './components/betterylist';
    export default {
        name: 'battery',
        components: {
            replace,
            betterylist
        },
        data() {
            return {
                activeName: 'replace',
                replace: true,
                batterylist: false,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['replace','batterylist']
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