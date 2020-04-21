<template>
  <div class="gdmap" :class="{ 'active': isActive }">
    <el-autocomplete
      v-if="isEdit"
      id="location"
      v-model="searchAddress"
      class="location-search"
      value-key="name"
      clearable
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    />
    <div id="container" />
    <!-- <div v-else id="container1"></div> -->
    <div v-if="isEdit" class="action-area-map-action">
      <ul>
        <li @click="clickmap">
          <svg-icon :icon-class="isFullscreenmap ?'exit-fullscreen':'fullscreen'" />
        </li>
        <li>
          <i class="el-icon-question" />
          <span>帮助</span>
        </li>
        <li @click="previousActual">
          <i class="el-icon-question" />
          <span>上一步</span>
        </li>
        <li @click="redo">
          <i class="el-icon-refresh-right" />
          <span>重做</span>
        </li>
        <li @click="markerfn">
          <i class="el-icon-check" />
          <span>完成</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  name: 'Aamp',
  props: {
    tabsactive: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    // 是否绘制停车点模式
    parkingPoint: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
    // 地图参数
    // zoom: {
    //   type: Number,
    //   default: 14
    // },
    // mapCenter: {
    //   default() {
    //     return [];
    //   }
    // },

    // strokeColor: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      greenArr: [], // 绿色区域(仅展示)停车点需要在绿色运营区内
      blackArr: [], // 黑色区域(仅展示)如果有会绘制上去
      searchAddress: '',
      location: '', // 地图搜索定位
      isFullscreenmap: false, // 地图放大
      isActive: false, // 全屏
      map: null,
      // 数据
      marker: null,
      polyline: null,
      polygonActual: null,
      drawData: [],
      strokeColor: '', // 线颜色
      fillColor: '', // 区域颜色
      // 用户可见区域
      Mapobject: {
        seeingRegion: {
          marker: null, // marker
          polyline: null,
          polygon: null,
          // 折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] // 用户区域的经纬度列表
        }, // 用户可见区域的经纬度列表
        actualRegion: {
          marker: null, // marker
          polyline: null,
          polygon: null,
          // 折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] // 实际区域的经纬度列表
        } // 实际区域的经纬度列表
      }
    }
  },
  watch: {
    tabsactive: {
      handler(newValue, oldValue) {
        console.log(this.tabsactive, '地图离里面的tabsactive')
        if (this.map) {
          this.map.clearMap()
        }
        this.ifSeeOrAct()

        this.ifBlackOrGreen() // 检测黑色区域
      },
      immediate: true
    }
  },
  mounted() {
    // 加载地图
    // this.$nextTick(() =>{
    //   this.initMap();
    // })
    this.init()

    // console.log(this.tabsactive, "tabsactive");
  },
  methods: {
    // 检测有实际或者可见区数据 绘制
    ifSeeOrAct() {
       
      if (this.tabsactive == true) {
        console.log(
          '切换到了实际区域重新拿用户可见区域绘制地图',
          this.Mapobject.seeingRegion
        )
        this.drawMap({ region: this.Mapobject.seeingRegion })
        this.drawMap({
          region: this.Mapobject.actualRegion,
          isMarker: true,
          color: '#f56c6c'
        })
        // this.drawMap(this.Mapobject.seeingRegion;
        // this.drawMap(this.Mapobject.actualRegion, true);
      } else {
        console.log(this.Mapobject.seeingRegion.polygon)
        // this.drawMap(this.Mapobject.seeingRegion, true);
        this.drawMap({ region: this.Mapobject.seeingRegion, isMarker: true })
      }
    },
    // 如果有黑色区域或绿色区域则绘制上去 （新增、编辑时黑色为其他同类区域，绘制停车点时需在绿色运营区内绘制）
    ifBlackOrGreen() {
      if (this.blackArr) {
        this.drawMapArr({
          dataList: this.blackArr,
          polygonSetting: {
            strokeColor: '#000',
            fillColor: '#000',
            strokeWeight: 0
          }
        })
      }
      if (this.greenArr) {
        this.drawMapArr({
          dataList: this.greenArr
        })
      }
    },
    clearMap() {
      if (this.map) {
        this.map.clearMap()
        this.drawData = [] // 绘制缓存也要清理
      }
    },
    // 拿到数据绘制地图
    drawMap(v) {
      const region = v.region || {}
      const isMarker = v.isMarker || false
      const color = v.color || '#67c23a'
      // console.log(region.markerarr);
      if (region.markerarr.length == 0) {
        return false
      }
      if (isMarker) {
        // 创建点覆盖物
        region.markerarr.forEach(item => {
          console.log(item)
          if (Array.isArray(item)) {
            // console.log(isarr);
            this.marker = new AMap.Marker({
              position: [item[0], item[1]],
              offset: new AMap.Pixel(-13, -30)
            })
            this.map.add(this.marker)
          } else {
            this.marker = new AMap.Marker({
              position: [item.lng, item.lat],
              offset: new AMap.Pixel(-13, -30)
            })
            this.map.add(this.marker)
          }
        })
      }
      console.log(region.seeingRegionModelList, 'region.seeingRegionModelList')
      if (region.seeingRegionModelList) {
        // 绘制折线
        region.polyline = new AMap.Polyline({
          path: region.markerarr,
          isOutline: false,
          borderWeight: 1,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 3,
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          // strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50
        })
        region.polyline.setMap(this.map)
        region.polygon = new AMap.Polygon({
          path: region.markerarr,
          fillColor: color,
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: color,
          strokeWeight: 3
        })
        this.map.add(region.polygon)
      }
    },
    // 画多个区域
    drawMapArr(v) {
      // console.log(v)
      // 默认数据
      const _polylineSetting = {
        isOutline: false,
        borderWeight: 1,
        strokeColor: '#67c23a',
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeStyle: 'solid',
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50
      }
      const _polygonSetting = {
        fillColor: '#67c23a',
        fillOpacity: 0.4,
        strokeOpacity: 1,
        strokeColor: '#67c23a',
        strokeWeight: 3
      }
      const dataList = v.dataList || [] // 地图数据格式必须！ [Array,Array,Array]  如果只有一个也必须[Array]
      const isEdit = v.isEdit || false // 编辑模式
      const drawType = v.drawType || 'polygon' // 绘制类型 polygon(仅查看区域时推荐，包含线)  polyline(仅线条) marker(仅marker点) edit(区域、线和点分开画，编辑模式)
      const isMarker = v.type == 'marker' ? true : v.isMarker || false // 是否画marker type等于marker时默认为true
      const target = v.target || '' // 编辑时传入，不然无法修改(this.Mapobject.seeingRegion之类的)
      const polylineSetting = this.objConcat(v.polylineSetting, _polylineSetting) // 线的样式
      const polygonSetting = this.objConcat(v.polygonSetting, _polygonSetting) // 区域的样式

      if (dataList.length == 0) {
        console.log('没有数据')
        return false
      }

      for (const path of dataList) {
        for (const i in path) {
          // 格式检测
          if (!Array.isArray(path[i])) {
            path[i] = [path[i].lng, path[i].lat]
          }
          // console.log(path);
          if (isMarker || isEdit) {
            // 创建点覆盖物
            this.marker = new AMap.Marker({
              position: [path[i][0], path[i][1]],
              offset: new AMap.Pixel(-13, -30)
            })
            this.map.add(this.marker)
            // console.log(this.Mapobject[target]);
            if (target) {
              this.Mapobject[target].markers.push(this.marker)
            }
          }

          if (drawType == 'polyline' || isEdit) {
            // 绘制折线
            // if (i > 0) {
            const polylineData = [].concat(path).slice(0, Number(i) + 1)

            // console.log(polylineData);
            this.polyline = new AMap.Polyline({
              ...polylineSetting,
              path: polylineData
            })
            this.polyline.setMap(this.map)
            if (target) {
              this.Mapobject[target].polylines.push(this.polyline)
            }
            // }
            // // 终点和起点闭合
            // if (i == path.length - 1) {
            //   this.polyline = new AMap.Polyline({
            //     ...polylineSetting,
            //     path: [path[i], path[0]]
            //   });
            //   this.polyline.setMap(this.map);
            //   if (target) {
            //     this.Mapobject[target].polylines.push(this.polyline);
            //   }
            // }
          }
        }

        // 数据放入目标的markerarr(实际/可视区域切换备用数据，理论上编辑的时候只会有1个path)
        if (target) {
          // console.log(path)
          this.Mapobject[target].markerarr = path
        }

        // console.log(path);
        // if (isMarker || isEdit) {
        //   // 创建点覆盖物
        //   path.forEach(item => {
        //     this.marker = new AMap.Marker({
        //       position: [item[0], item[1]],
        //       offset: new AMap.Pixel(-13, -30)
        //     });
        //     this.map.add(this.marker);
        //     // console.log(this.Mapobject[target]);
        //     if (target) {
        //       this.Mapobject[target].markers.push(this.marker);
        //     }
        //   });
        // }

        if (drawType == 'polygon' || isEdit) {
          // 绘制区域
          this.polygon = new AMap.Polygon({
            ...polygonSetting,
            path
          })
          // 绘制停车点
          if (this.parkingPoint) {
            this.polygon.on('click', this.showInfoClick)
          }
          this.map.add(this.polygon)

          if (target) {
            this.Mapobject[target].polygon = this.polygon
          }
        }
        // 编辑模式把东西放入markerarr
      }
    },
    // obj合并覆盖 a需要覆盖 b被覆盖
    objConcat(a, b) {
      for (const n in a) {
        b[n] = a[n]
      }
      return b
    },
    // 加载地图
    initMap() {
      // this.init(this.Mapobject.seeingRegion,"container")
      // this.init(this.Mapobject.actualRegion,"container1")
      // this.clickTwo()
      // this.clickOn()
      // this.init()
    },
    init() {
      const that = this
      // console.log(that.mapCenter,'11111111111')
      // var indoorMap = new AMap.IndoorMap({ alwaysShow: true });

      that.map = new AMap.Map('container', {
        resizeEnable: true,
        expandZoomRange: true,
        zooms: [3, 20],
        zoom: 16
      })

      // indoorMap.showIndoorMap("B000A856LJ");
      // indoorMap.on("complete", function() {
      // });
      console.log(this.map, 'console.log(this.map);')
      console.log(this.isEdit, 'this.isEdit')
      // 工具条控件
      that.map.plugin(['AMap.ToolBar'], function() {
        that.map.addControl(new AMap.ToolBar())
      })

      // 地图类型切换
      that.map.plugin(['AMap.MapType'], function() {
        that.map.addControl(new AMap.MapType())
      })
      this.clickOn()
    },
    // 模糊搜索匹配
    querySearch(queryString, cb) {
      const that = this
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(queryString, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info === 'OK') {
            cb(result.tips)
          } else {
            that.$notify.error({
              title: '错误',
              message: '服务器出小差了，请重新搜索'
            })
          }
        })
      })
    },
    handleSelect(item) {
      this.searchAddress = item.name
      this.location = item.location
      this.Mapobject.seeingRegion.map.setCenter(item.location)
    },
    // 放大缩小地图
    clickmap() {
      if (this.isFullscreenmap === false) {
        this.isFullscreenmap = true
        this.isActive = true
      } else {
        this.isFullscreenmap = false
        this.isActive = false
      }
    },
    // 设置
    setZoom(zoom) {
      this.map.setZoom(zoom)
    },
    // 设置地图中心
    setCenter(location) {
      var position = new AMap.LngLat(location.lng, location.lat) // 标准写法
      this.map.setCenter(position)
    },
    // 地图点击事件绑定
    clickOn() {
      if (this.readOnly) {
        return
      }
      // 停车点模式
      if (this.parkingPoint) {
        this.map.on('click', res => {
          this.$notify.error({
            title: '错误',
            message: '请在运营区域内设置'
          })
        })
        return
      }
      this.map.on('click', this.showInfoClick)
    },
    // clickTwo() {
    //   this.Mapobject.actualRegion.map.on("click", this.actualRegionFn);
    // },
    // 用户可见区域
    // seeingRegionFn(e) {
    //   this.showInfoClick(e, this.Mapobject.seeingRegion);
    // },
    // // 实际区域
    // actualRegionFn(e) {
    //   this.showInfoClick(e, this.Mapobject.actualRegion);
    // },
    showInfoClick(e) {
      console.log(
        '您在 [ ' +
          e.lnglat.getLng() +
          ',' +
          e.lnglat.getLat() +
          ' ] 的位置单击了地图！'
      )

      let that = null
      if (this.tabsactive) {
        // console.log("走这里11111111");
        that = this.Mapobject.actualRegion
        this.strokeColor = '#f56c6c'
      } else {
        this.strokeColor = '#67c23a'
        that = this.Mapobject.seeingRegion
      }

      // 绘制停车点
      if (this.parkingPoint) {
        console.log(
          that.polylines,
          'that.polylinesthat.polylinesthat.polylinesthat.polylinesthat.polylines'
        )
        if (that.polylines.length == 4) {
          this.$notify.error({
            title: '错误',
            message: '停车点最多只能创建4个点，形成一个方形'
          })
          return
        }
        this.strokeColor = '#1890ff'
      }

      if (that.polygon) {
        that.polygon.setMap(null)
        that.polygon = null
      }
      // 用户可见区域
      if (this.drawData.length == 0) {
        this.drawData = [].concat(that.markerarr)
      }
      // 创建点覆盖物
      that.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      })
      that.markers.push(that.marker)
      // that.markerarr.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      this.drawData.push([e.lnglat.getLng(), e.lnglat.getLat()])
      that.seeingRegionModelList.push({
        lng: e.lnglat.getLng(),
        lat: e.lnglat.getLat()
      })
      that.marker.setMap(this.map)

      that.polyline = new AMap.Polyline({
        path: this.drawData,
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 1,
        strokeColor: this.strokeColor,
        strokeOpacity: 1,
        strokeWeight: 3,
        // 折线样式还支持 'dashed'
        strokeStyle: 'solid',
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50
      })
      that.polylines.push(that.polyline)
      that.polyline.setMap(this.map)
      this.$emit('isdrawData', this.drawData || [])
      // 如果是停车点 自动完成
      if (this.parkingPoint) {
        if (that.polylines.length == 4) {
          this.markerfn()
        }
      }
    },
    // 重做按钮
    redo() {
      this.map.clearMap()
      this.ifBlackOrGreen() // 检测黑色区域
      this.marker = null
      this.polyline = null
      this.polygonActual = null
      this.drawData = []
      if (!this.tabsactive) {
        console.log('用户可见区域 + ', this.tabsactive)
        // 用户可见区域
        this.Mapobject.seeingRegion = {
          marker: null, // marker
          polyline: null,
          polygon: null,
          // 折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] // 用户区域的经纬度列表
        }
      } else {
        console.log('实际区域 +', this.tabsactive)
        // 用户可见区域
        this.drawMap({ region: this.Mapobject.seeingRegion })
        this.Mapobject.actualRegion = {
          marker: null, // marker
          polyline: null,
          polygon: null,
          // 折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] // 用户区域的经纬度列表
        }
      }
    },
    markerfn() {
      let that = null
      if (!this.tabsactive) {
        console.log('用户可见区域 + ', this.tabsactive)
        that = this.Mapobject.seeingRegion
        this.fillColor = '#67c23a'
      } else {
        console.log('实际区域 +', this.tabsactive)
        that = this.Mapobject.actualRegion
        this.fillColor = '#f56c6c'
      }
      // 停车点模式
      if (this.parkingPoint) {
        this.fillColor = '#1890ff'
      }
      if (!that.polygon) {
        that.polygon = new AMap.Polygon({
          path: this.drawData,
          fillColor: this.fillColor,
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: this.strokeColor,
          strokeWeight: 3
        })
        this.map.add(that.polygon)
        that.markerarr = this.drawData // 坐标数据备份
        // that.markers = this.drawData;
      }
      this.$emit('markerRegion', that.seeingRegionModelList)
      this.drawData = []
      this.$emit('isdrawData', this.drawData)
    },
    // 上一步
    previousActual() {
      let that = null
      if (!this.tabsactive) {
        console.log('用户可见区域 + ', this.tabsactive)
        that = this.Mapobject.seeingRegion
      } else {
        console.log('实际区域 +', this.tabsactive)
        that = this.Mapobject.actualRegion
      }

      if (that.polygon) {
        that.polygon.setMap(null)
        that.polygon = null
      }
      // console.log(that.markerarr,'t2222222222222222222222')

      // 重新进入绘制缓存
      if (this.drawData.length == 0) {
        this.drawData = that.markerarr.concat([])
      }
      // 依然没有数据停止
      if (this.drawData.length == 0) {
        return
      }
      if (that.markers.length == 0) {
        return
      }
      that.seeingRegionModelList.pop()
      // console.log(this.drawData);
      // console.log(that.markerarr,'that.markerarrthat.markerarrthat.markerarrthat.markerarrthat.markerarrthat.markerarr')
      // return;
      this.drawData.pop()
      that.markers[this.drawData.length].setMap(null)
      that.markers.pop()
      // console.log(that.polylines[this.drawData.length]);
      // console.log(that.polylines);
      // console.log(this.drawData)
      // console.log(this.drawData.length);
      that.polylines[this.drawData.length].setMap(null)
      that.polylines.pop()
    }
  }
}
</script>

<style lang="scss" scoped>
.gdmap {
  position: relative;
  width: 100%;
  height: 400px;
  .location-search {
    position: absolute;
    top: 20px;
    padding: 5px;
    background: #fff;
    width: 320px;
    left: 50%;
    margin-left: -160px;
    z-index: 9;
  }
  #container,
  #container1 {
    width: 100%;
    height: 100%;
  }
  .action-area-map-action {
    width: 64px;
    height: 320px;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    right: 0;
    background: #fff;
    box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: 0;
    padding-bottom: 16px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        height: 65px;
        &:hover {
          background: #ccc;
        }
      }
      cursor: pointer;
      i {
        display: block;
        text-align: center;
        font-size: 30px;
        padding-top: 10px;
        margin-bottom: -10px;
      }
      span {
        display: block;
        -o-user-select: none;
        -moz-user-select: none; /*火狐 firefox*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10+*/
        -khtml-user-select: none; /*早期的浏览器*/
        user-select: none;
      }
      svg {
        font-size: 30px;
        align-items: center;
        justify-content: center;
        line-height: 65px;
        margin-top: 20px;
      }
    }
  }
}
.gdmap.active {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
.gdmap #container /deep/ .amap-maptype-list {
  display: none !important;
}
</style>
