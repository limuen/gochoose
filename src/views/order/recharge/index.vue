<template>
    <div class="recharge-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="余额充值" name="balance">
                <balance />
            </el-tab-pane>
            <el-tab-pane label="押金充值" name="deposit">
                <deposit />
            </el-tab-pane>
            <el-tab-pane label="调度费充值" name="dispatching">
                <dispatching />
            </el-tab-pane>
            <el-tab-pane label="退款记录" name="refund">
                <refund />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import balance from './components/balance';
    import deposit from './components/deposit';
    import dispatching from './components/dispatching';
    import refund from './components/refund';
    export default {
        name: 'recharge',
        components: {
            balance,
            deposit,
            dispatching,
            refund
        },
        data() {
            return {
                activeName: 'balance'
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