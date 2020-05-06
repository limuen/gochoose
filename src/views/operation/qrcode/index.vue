<template>
  <div class="qrcode-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="批量导出" class="uploadexcel" name="batch">
        <el-upload
          class="upload-add"
          drag
          :action="serverUrl"
          multiple
          ref="upload"
          :limit="1"
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          accept=".xlsx, .xls"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
          <div class="el-upload__tip" slot="tip" style="color:red;">请注意,车辆编号必须是带前缀的完整编号</div>
          <div class="el-upload__tip" slot="tip">下载文件将保存到浏览器默认文件夹</div>
        </el-upload>
        <div>
          <a href style="margin-right:10px;">下载模版</a>
          <el-button :disabled="Isdownload" @click="handleDisbled">
            <span>二维码导出</span>
            <!-- <a v-else :href="`/api/electrombile/QrCodeListExport?keys=${this.Qrkeys}`">二维码导出</a> -->
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单个导出" name="single">
        <div class="single">
          <el-input v-model="electrombileNumber" @blur="handleDcblur" placeholder="请输入完整车辆编号"></el-input>
          <el-button type="success" :disabled="singleDis" @click="handleDc">导出二维码</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { importElectrombileNumber, QrCodeListExport,QrCodeByNumber,electrombileNumberVerify } from "@/api/car";
export default {
  name: "qrcode",
  data() {
    return {
      activeName: "batch",
      serverUrl: "/api/electrombile/importElectrombileNumber", //上传地址
      fileList: [],
      electrombileNumber: "",
      Qrkeys: "",
      Isdownload: true,
      singleDis: true
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event,this.activeName);
      if(this.activeName == 'single'){
          this.fileList = []
          this.Isdownload = true;
          this.Qrkeys = ""
      }else{
          this.singleDis = true;
          this.electrombileNumber = ""
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file, "1111111");
      if (res.code == 0) {
        this.Isdownload = false;
        this.Qrkeys = res.data;
      }
    },
    handleDisbled() {
        // console.log(process.env.VUE_APP_BASE_API_DOWNLOAD)
        window.open(process.env.VUE_APP_BASE_API_DOWNLOAD +"/electrombile/QrCodeListExport?keys="+ this.Qrkeys)
    },
    handleDc() {
        electrombileNumberVerify({
            electrombileNumber: this.electrombileNumber
        }).then(res=>{
            console.log(res,'111111')
            if(res.data == 1){
                window.open(process.env.VUE_APP_BASE_API_DOWNLOAD +"/electrombile/QrCodeByNumber?electrombileNumber="+ this.electrombileNumber)
            }else{
                this.$notify.error({
                title: '错误',
                message: '请输入正完整的车辆编号'
                });
            }
        }).catch(() => {});
    },
    handleDcblur() {
        if(this.electrombileNumber != ''){
            this.singleDis = false;
        }else{
            this.singleDis = true;
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.qrcode {
  &-container {
    height: 100%;
    .uploadexcel {
      text-align: center;
    }
    .single {
      width: 100%;
      text-align: center;
      .el-input {
        width: 300px;
        display: block;
        margin: 15px auto;
      }
    }
  }
}
</style>