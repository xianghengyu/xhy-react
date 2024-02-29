import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
type Chart = {
  /**
   * @description       图表配置（参考ECharts官方文档）
   * @default           {}
   */
  options: object;
  /**
   * @description       图表宽度
   * @default           100%
   */
  width?: string|number;
  /**
   * @description       图表高度
   * @default           100%
   */
  height?: string|number;
};
const Echarts: React.FC<Chart> = (props: Chart) => {
  const chartContent = useRef<HTMLDivElement>(null); // 挂载容器；
  const chartItem = useRef<any>(null); //记录Echarts实例
  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    chartItem.current = echarts.init(chartContent.current, 'vintage'); //初始化ECharts
  }, [props.width]);
  useEffect(() => {
    chartItem.current.setOption(props.options, true);
  }, [props.options]);
  return <div ref={chartContent} style={{ width: props.width || '100%', height: props.height || '100%' }} />;
};

export default Echarts;
