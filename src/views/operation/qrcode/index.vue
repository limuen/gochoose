<template>
    <div class="qrcode-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="批量导出" class="uploadexcel" name="batch">
                <el-upload
                    class="upload-demo"
                    drag
                    style="margin:20px 0px;"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
                    <div class="el-upload__tip" slot="tip" style="color:red;">请注意,车辆编号必须是带前缀的完整编号</div>
                    <div class="el-upload__tip" slot="tip">下载文件将保存到浏览器默认文件夹</div>
                </el-upload>
                <div>
                    <a href="" style="margin-right:10px;">下载模版</a>
                    <el-button>导出二维码</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="单个导出" name="single">
                <div class="single">
                    <el-input v-model="input" placeholder="请输入完整车辆编号"></el-input>
                    <el-button type="success">导出二维码</el-button>
                </div>
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'qrcode',
        data() {
            return {
                activeName: 'batch'
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
.qrcode{
    &-container{
        height: 100%;
        .uploadexcel{
            text-align: center;
        }
        .single{
            width: 100%;
            text-align: center;
            .el-input{
                width: 300px;
                display: block;
                margin: 15px auto;
            }
        }
    }
}
</style>