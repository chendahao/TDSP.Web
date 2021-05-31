<template>
  <v-card flat width="100%">
    <v-card-title primary-title>
      <img src="../../assets/homeindex/title4.png" class="mr-2"/>
      快捷入口
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:92%;margin-left:2%">
      <div class="shortcut">
        <ul>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/harbor')">
              <i>
                <img src="../../assets/kj/itm-icon1.png" />
              </i>
              <cite title="港池信息">港池信息</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/wharf')">
              <i>
                <img src="../../assets/kj/itm-icon2.png" />
              </i>
              <cite title="码头信息">码头信息</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/berthgroup')">
              <i>
                <img src="../../assets/kj/itm-icon3.png" />
              </i>
              <cite title="泊位组信息">泊位组信息</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/anchorage')">
              <i>
                <img src="../../assets/kj/itm-icon4.png" />
              </i>
              <cite title="锚地数据">锚地数据</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/customline')">
              <i>
                <img src="../../assets/kj/itm-icon5.png" />
              </i>
              <cite title="定制线数据">定制线数据</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/berth')">
              <i>
                <img src="../../assets/kj/itm-icon6.png" />
              </i>
              <cite title="泊位信息">泊位信息</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/facility')">
              <i>
                <img src="../../assets/kj/itm-icon7.png" />
              </i>
              <cite title="助航设施">助航设施</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/channel')">
              <i>
                <img src="../../assets/kj/itm-icon8.png" />
              </i>
              <cite title="航道数据">航道数据</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/nenv/customarea')">
              <i>
                <img src="../../assets/kj/itm-icon9.png" />
              </i>
              <cite title="自定义区域">自定义区域</cite>
            </div>
          </li>
          <li>
            <div href="javascript:void(0)" @click="tokj('./base/shipmark')">
              <i>
                <img src="../../assets/kj/itm-icon10.png" />
              </i>
              <cite title="船舶标识">船舶标识</cite>
            </div>
          </li>
        </ul>
      </div>
    </v-container>
  </v-card>
</template>
<script>
export default {
  methods: {
    tokj (url) {
      this.$router.push({
        path: url
      })
    }
  }
}
</script>
<style scoped>
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}

.personal-body {
  background: #f2f5f8;
  width: 100%;
  height: 100%;
  float: left;
}
.personal-card {
  border-radius: 2px;
  background-color: #fff;
}
.personal-card-header {
  height: 58px;
  line-height: 58px;
  margin: 0px 32px;
  border-bottom: 1px solid #d7dde3;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 16px;
}
.personal-card-header > img {
  float: left;
  margin-top: 20px;
}
.personal-card-header h3 {
  float: left;
  font-size: 16px;
  color: #333333;
  margin-left: 8px;
  font-weight: 500;
}
.personal-card-body {
  position: relative;
  padding: 10px 15px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
}
/************************/
  .shortcut {
  cursor: pointer;
  width: 100%;
  overflow: hidden;
}
.shortcut ul {
  margin-right: -21px;
}

.shortcut li {
  width: 15%;
  float: left;
  width: calc(20% - 24px);
  margin-right: 24px;
  box-sizing: border-box;
  background-clip: content-box;
  margin-bottom: 26px;
}
.shortcut li i {
  display: inline-block;
  width: 100%;
  height: 72px;
  line-height: 72px;
  text-align: center;
  border-radius: 2px;
  font-size: 30px;
  /* background-color: #f6fafe; */
  color: #333;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  border: 1px solid #edf1f5;
}
.shortcut li i img {
  vertical-align: middle;
}
.shortcut li cite {
  position: relative;
  top: 10px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  text-align: center;
}
@media screen and (max-width: 1400px) {
  .shortcut li {
    width: calc(10% - 24px) !important;
  }
}
</style>
