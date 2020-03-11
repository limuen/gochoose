<template>
    <div class="configuration-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="骑行打折" name="discount">
                <discount />
            </el-tab-pane>
            <el-tab-pane label="新用户券" name="appoint">
                <appoint />
            </el-tab-pane>
            <el-tab-pane label="充值活动" name="recharge">
                <recharge />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import discount from './components/discount';
    import appoint from './components/appoint';
    import recharge from './components/recharge';
    import newuser from './components/newuser';
    import sweepcode from './components/sweepcode';
    import authentication from './components/authentication';
    import riding from './components/riding';
    import card from './components/card';
    export default {
        name: 'configuration',
        components: {
            discount,
            appoint,
            newuser,
            sweepcode,
            recharge,
            authentication,
            riding,
            card
        },
        data() {
            return {
                activeName: 'discount'
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