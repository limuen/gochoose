<template>
    <div class="recharge-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="余额充值" name="balance">
                <balance v-if="balance"/>
            </el-tab-pane>
            <el-tab-pane label="押金充值" name="deposit">
                <deposit v-if="deposit"/>
            </el-tab-pane>
            <el-tab-pane label="调度费充值" name="dispatching">
                <dispatching v-if="dispatching"/>
            </el-tab-pane>
            <el-tab-pane label="退款记录" name="refund">
                <refund v-if="refund"/>
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
                activeName: 'balance',
                balance: true,
                deposit: false,
                dispatching: false,
                refund: false,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['balance','deposit','dispatching','refund']
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