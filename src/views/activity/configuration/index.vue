<template>
    <div class="configuration-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="骑行打折" name="discount">
                <discount v-if="discount"/>
            </el-tab-pane>
            <el-tab-pane label="新用户券" name="appoint">
                <appoint v-if="appoint"/>
            </el-tab-pane>
            <!-- <el-tab-pane label="充值活动" name="recharge">
                <recharge v-if="recharge"/>
            </el-tab-pane> -->
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
                activeName: 'discount',
                discount: true,
                appoint: false,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                let tabsName = ['discount','appoint']
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