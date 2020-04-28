<template>
    <div class="orderrecord-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="订单列表" name="orderlist">
                <orderlist v-if="orderlist"/>
            </el-tab-pane>
            <el-tab-pane label="退款记录" name="freesheet">
                <freesheet v-if="freesheet"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import orderlist from './components/orderlist';
    import freesheet from './components/freesheet';
    export default {
        name: 'orderrecord',
        components: {
            orderlist,
            freesheet,
        },
        data() {
            return {
                activeName: 'orderlist',
                orderlist: true,
                freesheet: false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['orderlist','freesheet']
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