import React, { useEffect, useState } from 'react';
interface debounceXProps {
  /**
   * @description       埋点id，必须保障id唯一
   */
  id: string;

  /**
   * @description       埋点需要上报的内容
   * @default           ''
   */
  reportContent: string;

  /**
   * @description       单次页面访问是否重复触发曝光事件
   * @default           false
   */
  reportAllways?: boolean;

  /**
   * @description       埋点曝光回调事件
   * @default           无
   */
  onPointShow?: (value:Object) => void;

  /**
   * @description       埋点点击回调事件
   * @default           无
   */
  onPointClick?: (value:Object) => void;

  /**
   * @description       需要埋点的元素
   */
  children: any;
}

const SCPoint = (props: debounceXProps) => {
    let hasReport = false; //记录当前会话是否曝光;
    const [observe, setObserve] = useState<IntersectionObserver| null>();
    //曝光埋点监听
    const listener = () => {
        let observeDom:any = new IntersectionObserver(function (entries) {
            if (entries[0].intersectionRatio > 0) {
                if(props.reportAllways) {
                    props.onPointShow && props.onPointShow({ id:props.id, reportContent:props.reportContent })
                } else {
                    if(!hasReport) {
                        props.onPointShow && props.onPointShow({ id:props.id, reportContent:props.reportContent })
                    }
                }
                hasReport = true
            }
        });
        observeDom.observe(document.getElementById(`${props.id}`));
        setObserve(observeDom);
    }
    useEffect(()=> {
        listener();
        return () => {
            observe?.disconnect();
        }
    },[])
  return <div id={props.id} onClick={()=>{props.onPointClick && props.onPointClick({ id:props.id, reportContent:props.reportContent })}}>{props.children}</div>;
};

export default SCPoint;
