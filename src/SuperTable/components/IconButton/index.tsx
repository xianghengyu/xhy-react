/** @format */

import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React, { MouseEventHandler, ReactNode } from 'react';
import './index.less';
interface Props {
  title: string | ReactNode | (() => JSX.Element);
  myStyle?: any;
  action?: boolean;
  placement?: TooltipPlacement | undefined;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
export default ({ title, icon, myStyle, placement, onClick, action }: Props) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      mouseEnterDelay={0}
      color={'#ffffff'}
      overlayInnerStyle={{ color: '#000' }}
    >
      <div
        className={action ? 'IconButtonAction IconButton' : 'IconButton'}
        style={myStyle ? myStyle : { width: 40, height: 40 }}
        onClick={onClick}
      >
        {icon && icon}
      </div>
    </Tooltip>
  );
};
