<!--
 * 拖轮计划编排
-->
<template>
  <div>
    <PageHeader :dense="false" headertitle="船舶计划实时看板">
     <v-spacer></v-spacer>
      <v-tooltip bottom>
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
      </v-tooltip>
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
          <v-col md="4" sm="6" xs="12" v-for="(item, index) in workingList" :key="index">
            <v-card>
              <v-list-item two-line>
                <v-list-item-action class="mr-1">
                  <!-- 显示拖轮数量 -->
                  <v-badge
                    :content="item.plan.tugs"
                    offset-x="15"
                    offset-y="5"
                    :title="'计划拖轮数量  '+item.plan.tugs"
                    class="pointer"
                  >
                    <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                      <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                    </v-avatar>
                  </v-badge>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.ship.cnName" @click="getPlanInfo(item)" class="pointer">{{item.ship.cnName}}<span style="font-size: small;color: gray;">({{item.ship.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1" v-if="showAll" dark :color="item.plan.tugCorp === '曹拖' ? 'green':'blue'">{{ item.plan.tugCorp }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.plan.actionPlan | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.plan.berthNo }}</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isPilotage" title="引航">引</v-chip>
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
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="green" @click="donePlan(item)">
                        <i class="material-icons" v-on="on">done_outline</i>
                      </v-btn>
                    </template>
                    <span>任务完成</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="warning" @click="cancelPlan(item)">
                        <i class="material-icons" v-on="on">cancel</i>
                      </v-btn>
                    </template>
                    <span>任务取消</span>
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
              <v-divider></v-divider>
              <v-card flat>
                <v-list>
                  <!-- <v-list-item-group
                  > -->
                  <div class="title1" v-if="item.plan.isPilotage">
                    <span class="title1-item title1-item-1st">名称</span>
                    <span class="title1-item">备车时间</span>
                    <span class="title1-item">开始时间</span>
                    <span class="title1-item">脱开时间</span>
                    <span class="title1-item">结束时间</span>
                    <span style="width:60px;text-align: right;">引水</span>
                  </div>
                  <div class="title2" v-else>
                    <div class="title2-item title2-item-1st">名称</div>
                    <div class="title2-item">备车时间</div>
                    <div class="title2-item">开始时间</div>
                    <div class="title2-item">脱开时间</div>
                    <div class="title2-item">结束时间</div>
                  </div>
                  <v-divider></v-divider>
                  <template
                    v-for="(tug, index) in item.tug"
                  >
                    <v-list-item
                      :key="index"
                      dense
                      color="blue"
                    >
                      <v-list-item-content>
                        <v-list-item-title :class="item.plan.isPilotage === true ? 'title1-content' : 'title2-content'">
                          <span :class="item.plan.isPilotage === true ? 'title1-item title1-item-1st' : 'title2-item title2-item-1st'">{{tug.name}}</span>
                          <span :class="item.plan.isPilotage === true ? 'title1-item' : 'title2-item'">{{tug.beiche ? tug.beiche : '--:--'}}</span>
                          <span :class="item.plan.isPilotage === true ? 'title1-item' : 'title2-item'">{{tug.startTime ? tug.startTime : '--:--'}}</span>
                          <span :class="item.plan.isPilotage === true ? 'title1-item' : 'title2-item'">{{tug.tuokai ? tug.tuokai : '--:--'}}</span>
                          <span :class="item.plan.isPilotage === true ? 'title1-item' : 'title2-item'">{{tug.endTime ? tug.endTime : '--:--'}}</span>
                          </v-list-item-title>
                        <v-list-item-subtitle v-if="tug.remark">{{tug.remark}}</v-list-item-subtitle>
                        <br>
                        <div style="display: flex;flex-direction: row;align-items: center;">
                          <v-btn x-small text color="success" @click="setTime(item, tug , 1)">备车</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug , 2)">开始</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug , 3)">脱开</v-btn>
                          <v-btn x-small text color="success" @click="setTime(item, tug , 4)">结束</v-btn>
                          <v-btn x-small text color="indigo lighten-2" @click="cancelTug(item, tug)">取消</v-btn>
                          <div v-if="item.plan.isPilotage" style="display: flex;flex-direction: row;align-items: center;">
                            <v-divider vertical></v-divider>
                            <v-btn x-small text color="success" @click="setTime(item, tug , 4)">接引水</v-btn>
                            <v-btn x-small text color="success" @click="setTime(item, tug , 4)">送引水</v-btn>
                          </div>
                        </div>
                      </v-list-item-content>
                      <v-list-item-action v-if="item.plan.isPilotage" style="margin-left: 0px;margin: 0px;justify-content:space-around">
                        <v-checkbox dense label="接" on-icon="check_box" off-icon="check_box_outline_blank"></v-checkbox>
                        <v-checkbox dense label="送" on-icon="check_box" off-icon="check_box_outline_blank"></v-checkbox>
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
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="index < item.tug.length - 1"
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
                  <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.ship.cnName" @click="getPlanInfo(item)" class="pointer">{{item.ship.cnName}}<span style="font-size: small;color: gray;">({{item.ship.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1">{{ item.plan.actionPlan | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.plan.berthNo }}</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isPilotage" title="引航">引</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action style="display: flex;flex-direction: row;align-items: center;">
                  <v-tooltip bottom>
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
                        <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                          <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                        </v-avatar>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title :title="item.ship.cnName" @click="getPlanInfo(item)" class="pointer">{{item.ship.cnName}}<span style="font-size: small;color: gray;">({{item.ship.name}})</span></v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip label small class="ma-1">{{ item.plan.actionPlan | formatPlan }}</v-chip>
                          <v-chip label small class="ma-1">{{ item.plan.berthNo }}</v-chip>
                          <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                          <v-chip label small class="ma-1" color="info" v-if="item.plan.isPilotage" title="引航">引</v-chip>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action style="display: flex;flex-direction: row;">
                        <v-tooltip bottom>
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
                          v-for="(tug, index) in item.tug"
                          :key="index"
                          dense
                          color="blue-grey"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{tug.name}}-{{tug.startTime}}</v-list-item-title>
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
                  <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.ship.cnName" @click="getPlanInfo(item)" class="pointer">{{item.ship.cnName}}<span style="font-size: small;color: gray;">({{item.ship.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1">{{ item.plan.actionPlan | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.plan.berthNo }}</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                    <v-chip label small class="ma-1" color="info" v-if="item.plan.isPilotage" title="引航">引</v-chip>
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
        </v-card-title>
        <v-card-text style="padding:0px">
          <v-list
            rounded
            dense
          >
          <!-- subheader -->
            <v-subheader>附近空闲拖轮</v-subheader>
            <v-list-item-group
              v-model="tugs"
              multiple
            >
              <v-row no-gutters>
                <v-col md="3" v-for="(item, index) in tugList" :key="index">
                  <v-list-item color="blue" :value="item" class="ma-1">
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
                        <v-list-item-title>{{item}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>Hangouts message</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-expansion-panels accordion flat>
                <v-expansion-panel>
                  <v-expansion-panel-header style="height:64px;padding: 0px">
                    <v-subheader>其他拖轮</v-subheader>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="padding: 0px">
                    <v-row no-gutters>
                      <v-col md="3" v-for="(item, index) in tugList2" :key="index">
                        <v-list-item color="blue" :value="item" class="ma-1">
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
                              <v-list-item-title>{{item}}</v-list-item-title>
                              <!-- <v-list-item-subtitle>{{item}}</v-list-item-subtitle> -->
                            </v-list-item-content>
                          </template>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
import dayjs from 'dayjs'
import Help from '@/components/help'
import { actionPlanFormat } from '@/plugins/format'
import PageHeader from '@/components/PageHeader'
import PlanInfo from './planInfo'
import { PlanStatus } from '@/mock/tug'
import { orderBy } from 'lodash'
export default {
  components: {
    PageHeader,
    PlanInfo,
    Help
  },
  data () {
    return {
      desserts: [],
      workingList: [],
      waitingList: [],
      completedList: [],
      unTugList: [],
      showUnTugList: false, // 无拖轮计划的船舶
      openOnHover: true,
      bottom: true,
      right: true,
      showAll: false, // 显示全部 默认显示曹拖相关计划 全部显示 包含国托的计划
      loading: false,
      dialog: false,
      model: 1,
      dialogInfo: false, // 船舶计划
      dialog2: false,
      planInfo: {},
      hasInfo: false,
      menu1: false,
      menu2: false,
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
      return val.replace(/[0-9]/ig, '')
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
      setTimeout(() => {
        let list = PlanStatus()
        this.unTugList = list.filter(item => item.plan.tugs === 0)
        if (this.showAll === false) {
          list = list.filter(item => (item.plan.tugCorp).indexOf('曹') > -1)
        }
        for (let i = 0; i < list.length; i++) {
          if (list[i].tug) {
            for (let j = 0; j < list[i].tug.length; j++) {
              list[i].tug[j].fab = false
            }
          }
          let harbor = list[i].plan.harbor
          if ((harbor).indexOf('一') > -1) {
            list[i].plan.harbor = '1' + harbor
          } else if ((harbor).indexOf('二') > -1) {
            list[i].plan.harbor = '2' + harbor
          } else if ((harbor).indexOf('三') > -1) {
            list[i].plan.harbor = '3' + harbor
          } else {
            list[i].plan.harbor = '0' + harbor
          }
        }
        const datalist = orderBy(list, ['plan.harbor'], ['asc'])
        this.workingList = datalist.filter(item => item.status === 'working')
        this.waitingList = datalist.filter(item => item.status === 'waiting')
        this.completedList = datalist.filter(item => item.status === 'completed')
        this.loading = false
      }, 150)
    },
    donePlan (item) {
      console.log(item)
      this.$message.success('操作成功')
      // this.getdata()
      // 计划整体完成
    },
    cancelPlan (item) {
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
    addtug (item) {
      console.log(item)
      // tugList 空闲的拖轮
      this.tugList2 = []
      this.tugList = []
      for (let i = 1; i < 26; i++) {
        if (i % 2 === 0) this.tugList.push('曹港' + i)
        if (i % 2 === 1) this.tugList2.push('曹港' + i)
      }
      this.dialog = true
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
    tugsave () {
      console.log(this.tugs)
      this.dialog = false
    },
    tugcancel () {
      this.tugs = []
      this.dialog = false
    },
    // 设置时间
    setTime (item, tug, type) {
      this.plandate = dayjs().format('YYYY-MM-DD')
      this.plantime = dayjs().format('HH:mm')
      console.log(item)
      console.log(tug)
      console.log(type)
      this.dialog2 = true
    },
    // 保存时间
    savePlanTime () {
      console.log(this.plandate)
      console.log(this.plantime)
      this.dialog2 = false
    },
    getPlanInfo (ship) {
      this.planInfo = {
        audit: {
          auditStatus: 'Pass',
          auditTime: '2021-06-03T16:00:02.3550443',
          reviewedBy: 'wangjian'
        },
        syncStatus: 'Default',
        berthingPlanId: '00002021-0603-1339-75a7-3a0001659e1e',
        plan: {
          orgName: '华能曹妃甸港口有限公司',
          berthingTime: '2021-06-03T19:00:00',
          harbor: '开敞',
          berthNo: '华能3',
          tugs: 2,
          tugCorp: '曹拖',
          actionPlan: '靠泊',
          isTide: false,
          isPilotage: false,
          sortKey: '',
          periodCode: 'BP20210603-3',
          planDate: '2021-06-03T00:00:00',
          timespan: 3
        },
        ship: {
          shipLength: 190,
          shipWidth: 28,
          frontDraft: 5.1,
          behindDraft: 5.3,
          goodsType: '煤炭',
          shipType: '货轮',
          loadWeight: 37031,
          cargoWeight: 0,
          agent: '新翕昊',
          maxDraft: 5.3,
          imo: '',
          nationality: '中国',
          callSign: '',
          mmsi: '413363730',
          name: 'JI LING 96',
          cnName: '吉领96'
        },
        extended: {
          shipAttributes: '内',
          previousPort: '靖江',
          nextPort: '靖江',
          anchorTime: null
        }
      }
      this.hasInfo = true
      this.dialogInfo = true
    },
    planInfoCallBack (val) {
      this.dialogInfo = val
    },
    dialog2_clickoutside () {
      this.dialog2 = false
    },
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
    width: 19%;
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
    width: 20%;
    text-align: center;
  }
  .title2-item-1st {
    text-align: left;
  }
  .pointer {
    cursor: pointer;
  }
</style>
