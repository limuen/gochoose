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
    const path = require('path')
    const files = require.context('@/views/operation/regional/components', false, /\.vue$/)
    const modules = {}
    files.keys().forEach(key => {
        const name = path.basename(key, '.vue')
        modules[name] = files(key).default || files(key)
    })
    // import operate from './components/operate';
    // import sibility from './components/sibility';
    // import transer from './components/transer';
    // import prohibit from './components/prohibit'
    export default {
        name: 'regional',
        // components: {
        //     operate,
        //     sibility,
        //     transer,
        //     prohibit
        // },
        components:modules,
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