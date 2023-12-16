import { ConfigProvider, Tour } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
interface IntroduceProps {
  /**
   * @description       是否展示引导
   * @default           false
   */
  open?: boolean;

  /**
   * @description       关闭回调
   * @default           无
   */
  onClose?: () => void;

  /**
   * @description     引导步骤配置
   */
  steps: Array<any>;
}
const Introduce = (props: IntroduceProps) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Tour
        open={props.open || false}
        onClose={props.onClose}
        steps={props.steps || []}
      />
    </ConfigProvider>
  );
};

export default Introduce;
