<template>
    <div class="orderrecord-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="订单列表" name="orderlist">
                <orderlist />
            </el-tab-pane>
            <el-tab-pane label="退款记录" name="freesheet">
                <freesheet />
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
                activeName: 'orderlist'
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