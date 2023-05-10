
import React, { useState, useEffect } from "react";

const ImageMagnifier = (props) => {
  const [paramss, setParams] = useState({
    // 放大倍数
    scale: 4,
    // 组件宽
    width: "400",
    // 组件高
    height: "400"
  })
  const [minImg, setMinImg] = useState('')
  const [maxImg, setMaxImg] = useState('')
  const [magnifierOff, setMagnifierOff] = useState(false)
  const [imgLoad, setImgLoad] = useState(false)
  const [cssStyles, setCssStyle] = useState({
    // 图片容器样式
    imgContainer: {
      width: "400px",
      height: "400px",
      border: "1px solid #ccc",
      cursor: "move",
      position: "relative"
    },
    // 鼠标悬停小方块样式
    mouseBlock: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100px",
      height: "100px",
      background: "rgba(0,0,0,0.1)",
      zIndex: 99,
    },
    // 鼠标悬停遮罩层样式
    maskBlock: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0)",
      zIndex: 100,
    },
    //  放大镜容器样式
    magnifierContainer: {
      position: "absolute",
      left: "0",
      top: "0",
      width: "400px",
      height: "400px",
      overflow: "hidden",
      zIndex: 98,
    },
    // 图片样式
    imgStyle: {
      width: "100%",
      height: "100%"
    },
    // 图片放大样式
    // 此处图片宽高不能设置为百分比，在scale的作用下，放大的只是图片初始的宽高 ！！！
    imgStyle2: {
      width: "400px",
      height: "400px",
      position: "absolute",
      top: 0,
      right: 400,
      transform: "scale(4)",
      transformOrigin: "top left",
    }
  })

  /**
   * 生命周期函数
   */
  // 组件初始化
  useEffect(() => {
    initParam();
    updataImg(props);
  }, [props])

  /**
   * 方法
   */
  // 鼠标移入
  const mouseEnter = () => {
    setMagnifierOff(true)
  };
  // 鼠标移除
  const mouseLeave = () => {
    setMagnifierOff(false)
  };
  // 鼠标移动
  const mouseMove = event => {
    // console.log(event);
    let e = event.nativeEvent;
    calculationBlock(e.offsetX, e.offsetY);
  };

  // 计算相关参数
  const calculationBlock = (offsetX, offsetY) => {
    console.log(offsetX, offsetY)
    let cssStyle = JSON.parse(JSON.stringify(cssStyles));
    /* 小方块位置 */
    // 防止鼠标移动过快导致计算失误，只要小于或者大于对应值，直接设置偏移量等于最小值或者最大值
    if (offsetX < 50) {
      offsetX = 50;
    }
    if (offsetX > 350) {
      offsetX = 350;
    }
    if (offsetY < 50) {
      offsetY = 50;
    }
    if (offsetY > 350) {
      offsetY = 350;
    }
    cssStyle.mouseBlock.left = parseFloat(offsetX - 50) + "px";
    cssStyle.mouseBlock.top = parseFloat(offsetY - 50) + "px";

    /* 计算图片放大位置 */
    cssStyle.imgStyle2.left = parseFloat(-(offsetX - 50) * 4) + "px";
    cssStyle.imgStyle2.top = parseFloat(-(offsetY - 50) * 4) + "px";
    setCssStyle(cssStyle)
  }

  // 初始化静态参数
  const initParam = () => {
    let cssStyle = JSON.parse(JSON.stringify(cssStyles));
    let params = JSON.parse(JSON.stringify(paramss));

    cssStyle.imgContainer.width = params.width + "px";
    cssStyle.imgContainer.height = params.height + "px";
    cssStyle.magnifierContainer.width = params.width + "px";
    cssStyle.magnifierContainer.height = params.height + "px";
    cssStyle.magnifierContainer.left = params.width + "px";
    cssStyle.imgStyle2.width = params.width + "px";
    cssStyle.imgStyle2.height = params.height + "px";
    cssStyle.imgStyle2.transform = "scale(" + params.scale + ")";
    setCssStyle(cssStyle)
  }

  // 更新图片
  const updataImg = (props) => {
    setMinImg(props.minImg)
    setMaxImg(props.maxImg)
  }
  // 图片加载情况
  const handleImageLoaded = (e) => {
    // console.log(e);
    setImgLoad(true);
  }

  // 图片加载中
  const handleImageErrored = () => {
    setImgLoad(false)
  }
  return (
    <div>
      <div style={cssStyles.imgContainer}>
        <img style={cssStyles.imgStyle} src={minImg} alt="" />
        <div
          style={cssStyles.maskBlock}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          onMouseMove={mouseMove}
        />
        {magnifierOff && <div style={cssStyles.mouseBlock} />}
      </div>
      {magnifierOff && (
      <div style={cssStyles.magnifierContainer}>
        <img
          style={cssStyles.imgStyle2}
          src={maxImg}
          onLoad={handleImageLoaded}
          onError={handleImageErrored}
          alt=""
        />
        {!imgLoad && "failed to load"}
      </div>
      )}
    </div>
  );
}

export default ImageMagnifier;
