<!--
 * 拖轮计划编排
-->
<template>
  <div :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
    <PageHeader :dense="false" headertitle="计划编排">
      <!-- <v-layout row wrap>
        <v-flex md4>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                placeholder="日期"
                hint="日期"
                width="200px"
                persistent-hint
                append-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              locale="zh-cn"
              @input="menu = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout> -->
      <v-spacer></v-spacer>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-checkbox
            label="显示全部"
            v-model="showAll"
            on-icon="check_box"
            off-icon="check_box_outline_blank"
            hide-details
            v-on="on"
          ></v-checkbox>
        </template>
        <span>显示全部</span>
      </v-tooltip> -->
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
      <Help>
        <slot>
          help
        </slot>
      </Help>
    </PageHeader>
    <v-container fluid>
      <div v-if="workingList.length > 0">
        <v-card-title primary-title>
          作业船舶
        </v-card-title>
        <v-row justify="start">
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in workingList" :key="index">
            <v-card>
              <v-list-item>
                <!-- <v-list-item-action> -->
                  <!-- 显示拖轮数量 -->
                  <!-- <v-badge
                    :content="item.plan.tugs"
                    offset-x="15"
                    offset-y="5"
                    :title="'计划拖轮数量  '+item.plan.tugs"
                    class="pointer"
                  >
                    <v-avatar :color="setHarbor(item.job.harbor)" size="32">
                      <span class="white--text headline" style="font-size:0.9rem !important">{{ item.job.harbor | formatHarbor2 }}</span>
                    </v-avatar>
                  </v-badge> -->
                <!-- </v-list-item-action> -->
                <v-list-item-content>
                  <v-list-item-title :title="item.vessel.cnName" @click="getPlanInfo(item)" class="pointer">{{item.vessel.cnName}}<span style="font-size: small;color: gray;">({{item.vessel.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <!-- 显示国拖曹拖 -->
                    <!-- <v-chip label small class="ma-1" v-if="showAll" dark :color="item.plan.tugCorp === '曹拖' ? 'green':'blue'">{{ item.plan.tugCorp }}</v-chip> -->
                    <v-chip :color="setHarbor(item.job.harbor)" label small dark class="mr-1 mt-1 mb-1">{{item.job.harbor | formatHarbor}}-{{ item.job.berthNo }}</v-chip>
                    <v-chip label small class="mr-1 mt-1 mb-1">{{ item.job.jobKind | formatPlan }}</v-chip>
                    <v-chip label small class="mr-1 mt-1 mb-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                    <v-chip label small class="mr-1 mt-1 mb-1" color="info" v-if="item.job.isTransPilot" title="引航">引</v-chip>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-chip class="mr-1" label x-small>总功率20000</v-chip>
                    <v-chip v-if="item.job.isTransPilot" class="mr-1" label x-small>接  港1</v-chip>
                    <v-chip v-if="item.job.isTransPilot" class="mr-1" label x-small>送  港2</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <!-- <v-list-item-action style="display: flex;flex-direction: row;align-items: center;"> -->
                <!-- <v-list-item-action> -->
                  <v-speed-dial
                    v-model="item.fab"
                    bottom
                    right
                    direction="left"
                    open-on-hover
                    transition="slide-x-reverse-transition"
                    style="position: absolute;bottom: 35px;right:5px"
                  >
                    <template v-slot:activator>
                      <v-btn
                        v-model="item.fab"
                        color="blue darken-2"
                        dark
                        x-small
                        fab
                        style="position: relative;"
                      >
                        <v-icon v-if="item.fab">
                          close
                        </v-icon>
                        <v-icon v-else>
                          more
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn x-small dark fab color="blue darken-2" @click="addtug(item)">
                          <v-icon v-on="on">add</v-icon>
                        </v-btn>
                      </template>
                      <span>增派拖轮</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn x-small dark fab color="blue darken-2" @click="donePlan(item)">
                          <i class="material-icons" v-on="on">done</i>
                        </v-btn>
                      </template>
                      <span>任务完成</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn x-small dark fab color="blue darken-2" @click="cancelPlan(item)">
                          <i class="material-icons" v-on="on">cancel</i>
                        </v-btn>
                      </template>
                      <span>任务取消</span>
                    </v-tooltip>
                  </v-speed-dial>
                <!-- </v-list-item-action> -->
              </v-list-item>
              <v-divider></v-divider>
              <v-card flat>
                <v-list>
                  <!-- <v-list-item-group
                  > -->
                  <div class="title2">
                    <div class="title2-item title2-item-1st">名称</div>
                    <!-- <div class="title2-item">备车时间</div> -->
                    <div class="title2-item">开始时间</div>
                    <div class="title2-item">脱开时间</div>
                    <div class="title2-item">完成时间</div>
                  </div>
                  <v-divider></v-divider>
                  <template
                    v-for="(tug, index) in item.tugs"
                  >
                    <v-list-item
                      :key="index"
                      dense
                      color="blue"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="title2-content">
                          <span class="title2-item title2-item-1st">{{tug.tug.cnName}}</span>
                          <!-- <span class="title2-item">{{tug.beiche ? tug.beiche : '--'}}</span> -->
                          <span class="title2-item">{{tug.jobTime.start ? formatSortTime(tug.jobTime.start) : '--'}}</span>
                          <span class="title2-item">{{tug.jobTime.tugOff ? formatSortTime(tug.jobTime.tugOff) : '--'}}</span>
                          <span class="title2-item">{{tug.jobTime.finish ? formatSortTime(tug.jobTime.finish) : '--'}}</span>
                          </v-list-item-title>
                        <v-list-item-subtitle v-if="tug.remark">{{tug.remark}}</v-list-item-subtitle>
                        <br>
                        <div style="display: flex;flex-direction: row;align-items: center;">
                          <v-btn x-small text color="info" @click="setTime(item, tug, 'standBy')">备车</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug, 'start')">开始</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug, 'done')">脱开</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug, 'finish')">完成</v-btn>
                          <!-- done完成 结束 -->
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn x-small text color="#455A64" v-bind="attrs" v-on="on">更多</v-btn>
                            </template>
                            <v-list dense>
                              <v-list-item>
                                <v-btn small text color="info" @click="setTime(item, tug, 'done')">完车</v-btn>
                              </v-list-item>
                              <v-list-item v-if="item.job.isTransPilot">
                                <v-btn small text color="success" @click="setTime(item, tug , 4)">接引水</v-btn>
                              </v-list-item>
                              <v-list-item v-if="item.job.isTransPilot">
                                <v-btn small text color="success" @click="setTime(item, tug , 4)">送引水</v-btn>
                              </v-list-item>
                              <v-list-item>
                                <!-- 任务没有开始时可以删除拖轮安排，开始后仅取消任务 -->
                                <v-btn v-if="!tug.jobTime.start" small text color="error lighten-2" @click="removeTug(item, tug)">移除拖轮</v-btn>
                                <v-btn v-else small text color="indigo lighten-2" @click="setTime(item, tug, 'cancel')">取消任务</v-btn>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                          <!-- <v-btn x-small text color="indigo lighten-2" @click="cancelTug(item, tug)">取消</v-btn> -->
                          <!-- <div v-if="item.job.isTransPilot" style="display: flex;flex-direction: row;align-items: center; display:none">
                            <v-divider vertical></v-divider>
                            <v-btn x-small text color="success" @click="setTime(item, tug , 4)">接引水</v-btn>
                            <v-btn x-small text color="success" @click="setTime(item, tug , 4)">送引水</v-btn>
                          </div> -->
                        </div>
                      </v-list-item-content>
                      <!-- <v-list-item-action v-if="item.job.isTransPilot" style="margin-left: 0px;margin: 0px;justify-content:space-around">
                        <v-checkbox dense label="接" on-icon="check_box" off-icon="check_box_outline_blank"></v-checkbox>
                        <v-checkbox dense label="送" on-icon="check_box" off-icon="check_box_outline_blank"></v-checkbox> -->
                        <!-- 菜单 -->
                        <!-- <v-menu
                          open-on-hover
                          top
                          offset-x
                          offset-y
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              flat
                              x-small
                              icon
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon>more_horiz</v-icon>
                            </v-btn>
                          </template>
                          <v-list dense>
                            <v-list-item
                              v-for="(item, index) in items"
                              :key="index"
                            >
                              <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu> -->
                        <!-- 图标式菜单 -->
                        <!-- <v-speed-dial
                          v-model="tug.fab"
                          :bottom="bottom"
                          :right="right"
                          direction="left"
                          :open-on-hover="openOnHover"
                          transition="slide-x-reverse-transition"
                          style="position: absolute;bottom: 5px;"
                        >
                          <template v-slot:activator>
                            <v-btn
                              v-model="tug.fab"
                              x-small
                              icon
                              color="primary"
                              dark
                              fab
                              style="position: relative;"
                            >
                              <v-icon>
                                more_horiz
                              </v-icon>
                            </v-btn>
                          </template>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                fab
                                x-small
                                color="red"
                                dark
                                v-on="on"
                              >
                                <i class="material-icons">remove_circle</i>
                              </v-btn>
                            </template>
                            <span>移除</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                fab
                                x-small
                                color="primary"
                                v-on="on"
                              >
                                <v-icon>
                                  edit
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>编辑</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                fab
                                x-small
                                color="success"
                                v-on="on"
                              >
                                <v-icon>
                                  check_box
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>完成</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                fab
                                x-small
                                dark
                                color="green"
                                v-on="on"
                              >
                                <v-icon>
                                  play_circle_outline
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>开始</span>
                          </v-tooltip>
                        </v-speed-dial> -->
                      <!-- </v-list-item-action> -->
                    </v-list-item>
                    <v-divider
                      v-if="index < item.tugs.length - 1"
                      :key="index * 10 + 10"
                    ></v-divider>
                  </template>
                  <!-- </v-list-item-group> -->
                </v-list>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- 待作业拖轮 -->
      <div v-if="waitingList.length > 0">
        <v-card-title primary-title>
          待作业船舶
        </v-card-title>
        <v-row>
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in waitingList" :key="index">
            <v-card>
              <v-list-item two-line>
                <v-list-item-action class="mr-1">
                  <v-avatar :color="setHarbor(item.job.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.job.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.vessel.cnName" @click="getPlanInfo(item)" class="pointer">{{item.vessel.cnName}}<span style="font-size: small;color: gray;">({{item.vessel.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1">{{ item.job.jobType | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.job.berthNo }}</v-chip>
                    <!-- <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip> -->
                    <v-chip label small class="ma-1" color="info" v-if="item.job.isTransPilot" title="引航">引</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action style="display: flex;flex-direction: row;align-items: center;">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="primary" @click="addtug(item)">
                        <v-icon v-on="on">add</v-icon>
                      </v-btn>
                    </template>
                    <span>派遣拖轮</span>
                  </v-tooltip>
                  <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="info" @click="getPlanInfo(item)">
                        <v-icon v-on="on">info</v-icon>
                      </v-btn>
                    </template>
                    <span>关联计划</span>
                  </v-tooltip> -->
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- 作业完毕拖轮 -->
      <div v-if="completedList.length > 0">
        <v-card-title primary-title>
          作业完毕船舶
        </v-card-title>
        <v-row>
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in completedList" :key="index">
            <v-card>
              <v-expansion-panels accordion flat>
                <v-expansion-panel>
                  <v-expansion-panel-header style="height:64px;padding: 0px">
                    <v-list-item two-line>
                      <v-list-item-action class="mr-1">
                        <v-avatar :color="setHarbor(item.job.harbor)" size="32">
                          <span class="white--text headline" style="font-size:0.9rem !important">{{ item.job.harbor | formatHarbor2 }}</span>
                        </v-avatar>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title :title="item.vessel.cnName" @click="getPlanInfo(item)" class="pointer">{{item.vessel.cnName}}<span style="font-size: small;color: gray;">({{item.vessel.name}})</span></v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip label small class="ma-1">{{ item.job.jobType | formatPlan }}</v-chip>
                          <v-chip label small class="ma-1">{{ item.job.berthNo }}</v-chip>
                          <!-- <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip> -->
                          <v-chip label small class="ma-1" color="info" v-if="item.job.isTransPilot" title="引航">引</v-chip>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action style="display: flex;flex-direction: row;">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn icon color="info" @click="getPlanInfo(item)">
                              <v-icon v-on="on">info</v-icon>
                            </v-btn>
                          </template>
                          <span>关联计划</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="padding: 0px">
                    <v-list>
                      <v-list-item-group
                      >
                        <v-list-item
                          v-for="(tug, index) in item.tugs"
                          :key="index"
                          dense
                          color="blue-grey"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{tug.tug.cnName}}-{{formatSortTime(tug.jobTime.start)}}</v-list-item-title>
                            <v-list-item-subtitle v-if="tug.remark">{{tug.remark}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- 作业完毕拖轮 -->
      <div v-if="unTugList.length > 0">
        <v-card-title primary-title @click="showUnTugList = !showUnTugList" class="pointer">
          无拖轮计划船舶
        </v-card-title>
        <v-row v-show="showUnTugList">
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in unTugList" :key="index">
            <v-card>
              <v-list-item two-line>
                <v-list-item-action class="mr-1">
                  <v-avatar :color="setHarbor(item.job.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.job.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.vessel.cnName" @click="getPlanInfo(item)" class="pointer">{{item.vessel.cnName}}<span style="font-size: small;color: gray;">({{item.vessel.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1">{{ item.job.jobType | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.job.berthNo }}</v-chip>
                    <!-- <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip> -->
                    <v-chip label small class="ma-1" color="info" v-if="item.job.isTransPilot" title="引航">引</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action style="display: flex;flex-direction: row;">
                  <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="info" @click="getPlanInfo(item)">
                        <v-icon v-on="on">info</v-icon>
                      </v-btn>
                    </template>
                    <span>关联计划</span>
                  </v-tooltip> -->
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          派遣拖轮
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon @click="refreshTugStatus">
                <v-icon v-on="on">refresh</v-icon>
              </v-btn>
            </template>
            <span>刷新状态</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text style="padding:0px">
          <v-list
            rounded
            dense
          >
          <!-- subheader -->
            <v-subheader>空闲拖轮</v-subheader>
            <v-list-item-group
              v-model="tugs"
              multiple
            >
              <v-row no-gutters>
                <v-col md="3" v-for="(item, index) in tugList" :key="index">
                  <v-list-item color="blue" :value="item.mmsi" class="ma-1">
                    <template v-slot:default="{ active }">
                      <v-list-item-action style="margin: 0px 10px 0px 0px;">
                        <v-checkbox
                          :input-value="active"
                          dense
                          readonly
                          on-icon="check_box"
                          off-icon="check_box_outline_blank"
                          color="primary"
                          hide-details
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title :title="item.name">{{item.name}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>Hangouts message</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-subheader>非空闲拖轮</v-subheader>
              <v-row no-gutters>
                <v-col md="3" v-for="(item, index) in tugList2" :key="index">
                  <v-list-item color="blue" :value="item.mmsi" class="ma-1">
                    <template v-slot:default="{ active }">
                      <v-list-item-action style="margin: 0px 10px 0px 0px;">
                        <v-checkbox
                          :input-value="active"
                          on-icon="check_box"
                          off-icon="check_box_outline_blank"
                          dense
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title :title="item.name">{{item.name}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>{{item}}</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-col>
              </v-row>
              <!-- <v-subheader>其他拖轮</v-subheader>
              <v-row no-gutters>
                <v-col md="3" v-for="(item, index) in tugList2" :key="index">
                  <v-list-item color="blue" :value="item" class="ma-1">
                    <template v-slot:default="{ active }">
                      <v-list-item-action style="margin: 0px 10px 0px 0px;">
                        <v-checkbox
                          :input-value="active"
                          on-icon="check_box"
                          off-icon="check_box_outline_blank"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-col>
              </v-row> -->
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="tugcancel">取消</v-btn>
          <v-btn color="success" @click="tugsave">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <plan-info :show='dialogInfo' :ship='planInfo' v-on:CallBack="planInfoCallBack"></plan-info>
    <!-- 手动设置时间 -->
    <v-dialog
      v-model="dialog2"
      scrollable
      @click:outside="dialog2_clickoutside"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          时间确认
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col md="6">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="plandate"
                      label="日期"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="plandate"
                    locale="zh-cn"
                    @input="menu1 = false"
                    :dayFormat="dayformat"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="plantime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="plantime"
                      label="时间"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    scrollable
                    :allowed-minutes="allowedStep"
                    v-model="plantime"
                    format="24hr"
                    @click:minute="$refs.menu.save(plantime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col md="12">
                <v-text-field
                  label="备注"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog2 = false">关闭</v-btn>
          <v-btn color="success" @click="savePlanTime">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '@/views/task/mixin/tugRealTimeStatus'
import dayjs from 'dayjs'
import Help from '@/components/help'
import { actionPlanFormat } from '@/plugins/format'
import PageHeader from '@/components/PageHeader'
import PlanInfo from './planInfo'
import { PlanStatus } from '@/mock/tug'
import { orderBy } from 'lodash'
import { tugApi as api } from '@/api/tugApi'
import { VFileInput } from 'vuetify/lib'
export default {
  components: {
    PageHeader,
    PlanInfo,
    Help
  },
  mixins: [mixin],
  data () {
    return {
      client: new api.TugScheduleClient('', this.$axios),
      planclient: new api.PlanScheduleClient('', this.$axios),
      desserts: [],
      workingList: [],
      waitingList: [],
      completedList: [],
      unTugList: [],
      activePlan: {}, // 选中的计划
      showUnTugList: false, // 无拖轮计划的船舶
      openOnHover: true,
      bottom: true,
      right: true,
      showAll: false, // 显示全部 默认显示曹拖相关计划 全部显示 包含国托的计划
      loading: false,
      dialog: false,
      model: 1,
      panel: 0,
      dialogInfo: false, // 船舶计划
      dialog2: false,
      planInfo: {},
      hasInfo: false,
      menu1: false,
      menu2: false,
      date: dayjs().format('YYYY-MM-DD'),
      menu: false,
      plandate: dayjs().format('YYYY-MM-DD'),
      plantime: dayjs().format('HH:mm'),
      items: [
        { title: '开始' },
        { title: '结束' },
        { title: '取消' },
        { title: '删除' }
      ],
      tugs: [],
      tugList: [], // 空闲拖轮
      tugList2: [] // 其他拖轮
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  created () {
    this.setheight = window.innerHeight - 212 + 59
    this.getdata()
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    },
    formatHarbor (val) {
      const harbor = val.replace(/[0-9]/ig, '')
      if (harbor.indexOf('开敞') > -1) return '开敞'
      if (harbor.indexOf('一') > -1) return '一港池'
      if (harbor.indexOf('二') > -1) return '二港池'
      if (harbor.indexOf('三') > -1) return '三港池'
    },
    formatHarbor2 (val) {
      const harbor = val.replace(/[0-9]/ig, '')
      if (harbor.indexOf('开敞') > -1) return '开敞'
      if (harbor.indexOf('一') > -1) return '一'
      if (harbor.indexOf('二') > -1) return '二'
      if (harbor.indexOf('三') > -1) return '三'
    }
  },
  watch: {
    showAll () {
      this.getdata()
    }
  },
  mounted () {
    const that = this
    window.onresize = function temp () {
      // page 59; pageheader 64;pageheader dense 48;container padding top bottom 12px; appbar 64
      that.setheight = window.innerHeight - 212 + 59
    }
  },
  destroyed () {
    window.onresize = ''
  },
  methods: {
    getdata () {
      this.loading = true
      // 根据日期获取调度计划
      this.client.tugScheduleAll()
        .then(res => {
          if (res.length > 0) {
            let list = res
            for (let i = 0; i < list.length; i++) {
              let harbor = list[i].job.harbor
              if ((harbor).indexOf('一') > -1) {
                list[i].job.harbor = '1' + harbor
              } else if ((harbor).indexOf('二') > -1) {
                list[i].job.harbor = '2' + harbor
              } else if ((harbor).indexOf('三') > -1) {
                list[i].job.harbor = '3' + harbor
              } else {
                list[i].job.harbor = '0' + harbor
              }
              const datalist = orderBy(list, ['job.harbor'], ['asc'])
              this.workingList = datalist.filter(item => item.status === 'Scheduled' || item.status === 'Running')
              this.waitingList = datalist.filter(item => item.status === 'Default')
              this.completedList = datalist.filter(item => item.status === 'Done')
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 完成拖轮调度
    donePlan (item) {
      console.log(item)
      // 一个大船调度的整体完成
      this.client.done2(item.id)
        .then(res => {
          console.log(res)
          this.$message.success('完成成功')
          this.getdata()
        })
    },
    // 取消整体大船的计划
    cancelPlan (item) {
      this.$msgbox.confirm('要取消这条计划吗？', '取消确认', {
        confirmButtonText: '取消',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.client.cancel(item.id)
          .then(() => {
            this.$message.success('取消成功')
            this.getdata()
          })
      }).catch(() => {
      })
    },
    // 增加拖轮
    addtug (item) {
      this.tugs = []
      if (item.tugs) {
        this.tugs = item.tugs.map(i => {
          return i.tug.mmsi
        })
      }
      this.activePlan = item
      this.getTugStatus()
      this.dialog = true
    },
    refreshTugStatus () {
      this.getTugStatus()
    },
    removeTug (item, tug) {
      this.$msgbox.confirm('要删除这条拖轮吗？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        // this.client.files2(id, this.userinfo.gh)
        //   .then(() => {
        //     this.$message.success('取消成功')
        //     this.getdata()
        //   })
      }).catch(() => {
      })
    },
    cancelTug (item, tug) {
      this.$msgbox.confirm('要取消这条计划吗？', '取消确认', {
        confirmButtonText: '取消',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.$message.success('取消成功')
        // this.client.files2(id, this.userinfo.gh)
        //   .then(() => {
        //     this.$message.success('取消成功')
        //     this.getdata()
        //   })
      }).catch(() => {
      })
    },
    // 确认派遣的拖轮
    // ???? 是否需要移除已选拖轮
    tugsave () {
      console.log(this.tugs)
      const planId = this.activePlan.planId
      for (let i = 0; i < this.tugs.length; i++) {
        const element = this.tugs[i]
        this.client.tugs2(planId, element)
      }
      this.dialog = false
    },
    // 关闭派遣拖轮的窗口
    tugcancel () {
      this.activePlan = {}
      this.tugs = []
      this.dialog = false
    },
    // 设置当前时间 无手动设置时间
    setTime (item, tug, type) {
      // type = start done finish cancel standBy
      const id = 'id'
      const mmsi = 'mmsi'
      if (type === 'start') {
        this.TugScheduleClient.start(id, mmsi)
          .then(res => {
            console.log(res)
          })
      } else if (type === 'done') {
        this.TugScheduleClient.done(id, mmsi)
          .then(res => {
            console.log(res)
          })
      } else if (type === 'finish') {
        this.TugScheduleClient.finish(id, mmsi)
          .then(res => {
            console.log(res)
          })
      } else if (type === 'cancel') {
        this.TugScheduleClient.cancel(id, mmsi)
          .then(res => {
            console.log(res)
          })
      } else if (type === 'standBy') {
        this.TugScheduleClient.standBy(id, mmsi)
          .then(res => {
            console.log(res)
          })
      }
    },
    formatSortTime (value) {
      if (!value) return ''
      if (!dayjs(value).isValid()) return value
      return dayjs(value).format('HH:mm')
    },
    // 手动设置时间 (备车、开始、脱开、结束)
    // setTime (item, tug, type) {
    //   this.plandate = dayjs().format('YYYY-MM-DD')
    //   // 设置显示的分钟为0 5 10 5分钟一个间隔
    //   let nowMinute = dayjs().minute()
    //   if (nowMinute % 5 != 0) {
    //     nowMinute = Math.round(nowMinute / 10) *10
    //   }
    //   if (nowMinute < 10) nowMinute = '0' + nowMinute
    //   this.plantime = dayjs().format(`HH:${nowMinute}`)
    //   this.dialog2 = true
    // },
    // 保存时间
    savePlanTime () {
      console.log(this.plandate)
      console.log(this.plantime)
      this.dialog2 = false
    },
    getPlanInfo (item) {
      const id = item.sourceId
      // 获取计划的详细信息
      this.planclient.planSchedule2(id)
        .then(res => {
          console.log(res)
          this.planInfo = res
          this.hasInfo = true
          this.dialogInfo = true
        })
    },
    planInfoCallBack (val) {
      this.dialogInfo = val
    },
    dialog2_clickoutside () {
      this.dialog2 = false
    },
    allowedMinutes: v => v % 5 === 0,
    allowedStep: v => v % 5 === 0,
    setHarbor (harbor) {
      if (harbor.indexOf('开敞') > -1) return 'indigo'
      if (harbor.indexOf('一') > -1) return 'teal'
      if (harbor.indexOf('二') > -1) return 'orange'
      if (harbor.indexOf('三') > -1) return '#2979FF'
    }
  }
}
</script>
<style>
  .v-expansion-panel-content__wrap {
    padding: 0px !important;
  }
  /* 引水 */
  .title1 {
    padding: 0px 16px 2px 16px;
    font-size: 0.79rem;
    width: 100%;
    display: flex;
  }
  .title1-content {
    font-size: 0.79rem;
    width: 100%;
    display: flex;
  }
  .title1-item {
    width: 31%;
    text-align: center;
  }
  .title1-item-1st {
    text-align: left;
  }
  /* 无引水 */
  .title2 {
    padding: 0px 16px 2px 16px;
    font-size: 0.79rem;
    width: 100%;
    display: flex;
  }
  .title2-content {
    font-size: 0.79rem;
    width: 100%;
    display: flex;
  }
  .title2-item {
    width: 25%;
    text-align: center;
  }
  .title2-item-1st {
    text-align: left;
  }
  .pointer {
    cursor: pointer;
    font-size: 1.2rem;
  }
</style>
