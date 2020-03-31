<template>
    <div class="regional-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="运营区域" name="operate">
                <operate  v-if="operate"/>
            </el-tab-pane>
            <el-tab-pane label="责任区域" name="sibility">
               <sibility  v-if="sibility"/>
            </el-tab-pane>
            <el-tab-pane label="停车点" name="transer">
                <transer  v-if="transer"/>
            </el-tab-pane>
            <el-tab-pane label="禁行区域" name="prohibit">
                <prohibit v-if="prohibit" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    // const path = require('path')
    // const files = require.context('@/views/operation/regional/components', false, /\.vue$/)
    // const modules = {}
    // files.keys().forEach(key => {
    //     const name = path.basename(key, '.vue')
    //     modules[name] = files(key).default || files(key)
    // })
    import operate from './components/operate';
    import sibility from './components/sibility';
    import transer from './components/transer';
    import prohibit from './components/prohibit'
    export default {
        name: 'regional',
        // components:modules,
        components: {
            operate,
            sibility,
            transer,
            prohibit
        },
        data() {
            return {
                activeName: 'operate',
                operate: true,
                sibility: false,
                transer: false,
                prohibit: false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['operate','sibility','transer','prohibit']
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