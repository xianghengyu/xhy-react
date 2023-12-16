import React from 'react';
interface debounceXProps {
  /**
   * @description       防抖时间间隔
   * @default           500
   */
  wait?: number;

  /**
   * @description       防抖点击事件回调
   * @default           无
   */
  onDebounceClick: () => void;

  /**
   * @description       防抖点击内容
   */
  children: any;
}

const DebounceX = (props: debounceXProps) => {
  const deboundce = (wait: any) => {
    let timer: any;
    return function () {
      let status = true;
      if (timer) {
        clearTimeout(timer);
        status = false;
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = false;
      }, wait);
      return status;
    };
  };
  const debPromise = deboundce(props.wait || 500);
  const btnClick = () => {
    if (!debPromise()) return;
    props.onDebounceClick();
  };
  return <div onClick={btnClick}>{props.children}</div>;
};

export default DebounceX;
