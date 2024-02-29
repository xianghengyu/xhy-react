---
# 单独设置导航名称
title: Echarts 图表
nav: 组件API
order: 9
---

# Echarts 图表
改组件为基于 Echarts 的图表组件，简化了 Echarts 的配置项，提供了更简单的配置方式和调用方法。

## 设计特色
只需要关注options、width、height即可,参数变动会自动更新图表。

## 简单使用
可以看到Echarts组件的宽高默认是跟随父容器的宽高，也可以通过设置width和height来设置宽高。
```jsx
import React, { useState } from 'react';
import { Echarts } from 'xhy-react';
import { Button } from 'antd';

export default () => {
  const options = {
        title: {
            text: '南京雨花台降雨图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            feature: {
                saveAsImage: { show: true }
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            }
        ],
        series: [
            {
                name: '市平均降雨',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml';
                    }
                },
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
            },
            {
                name: '区平均降雨',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml';
                    }
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
            }
        ]
    };
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Echarts options={options}/>
    </div>
  );
};
```

## API

Echarts 属性
<API></API>