<template>
    <div class="regional-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="运营区域" name="operate">
                <operate />
            </el-tab-pane>
            <el-tab-pane label="责任区域" name="sibility">
               <sibility />
            </el-tab-pane>
            <el-tab-pane label="停车点" name="transer">
                <transer />
            </el-tab-pane>
            <el-tab-pane label="禁行区域" name="prohibit">
                <prohibit />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import operate from './components/operate';
    import sibility from './components/sibility';
    import transer from './components/transer';
    import prohibit from './components/prohibit'
    export default {
        name: 'regional',
        components: {
            operate,
            sibility,
            transer,
            prohibit
        },
        data() {
            return {
                activeName: 'operate'
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