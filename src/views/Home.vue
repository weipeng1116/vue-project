<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px; width: 400px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Winter</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录的时间：<span>2023-2-17</span></p>
                    <p>上次登录的地点：<span>陕西 </span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 15px; height: 450px;">
                <el-table :data="tableData" style="width: 100%" :row-style="{ padding: '7px' }">

                    <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="12" style="padding-left: 10px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name"
                    :body-style="{ display: 'flex', padding: 0, height: '65px' }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price"> ￥ {{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 250px; width:700px">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 250px "></div>
            </el-card>
            <div class="graph" style="width: 600px;">
                <el-card style="height: 240px;">
                    <div ref="echarts2" style="height:260px"></div>
                </el-card>
                <el-card style="height: 240px; ">
                    <div ref="echarts3" style="height: 150px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts';
export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ]
        }
    },
    mounted() {
        getData().then(({ data }) => {
            const { tableData } = data.data
            console.log(data.data)
            this.tableData = tableData

            //基于准备好的dom，初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            //指定图表的配置项和数据
            var echarts1Options = {}
            //处理数据xAxis
            const { orderData, userData, videoData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }
            echarts1Options.xAxis = xAxisData
            echarts1Options.yAxis = {}
            echarts1Options.legend = xAxisData
            echarts1Options.series = []
            xAxis.forEach(key => {
                echarts1Options.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            console.log(echarts1Options)
            //使用配置显示图表
            echarts1.setOption(echarts1Options)

            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    //图例文字颜色
                    textstyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                //提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",//类目轴
                    data: userData.map(item => item.data),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3"
                        },
                    },
                    axisLable: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
            echarts3.setOption(echarts3Option)
        })


    },
}
</script>
<style lang="less" scoped>
.user {
    padding-bottom: 13px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    height: 50px;

    img {
        margin-right: 40px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 30px;
            margin-bottom: 3px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 30px;
        font-size: 13px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 40px;
        }
    }
}

/deep/.el-table .el-table__cell {
    padding: 7px 0;
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 616px;

    .icon {
        width: 50px;
        height: 50px;
        font-size: 27px;
        color: #fff;
        text-align: center;
        line-height: 53px;
    }

    .detail {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 20px;
            margin-bottom: -12px;
            line-height: 1px;
            height: 25px;
        }

        .desc {
            font-size: 1px;
            color: #999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 10px;
        height: 50px
    }
}

.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .el-card {
        width: 48%;
    }
}
</style>