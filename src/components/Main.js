require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
var imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDataArr){
   for(let i = 0,j=imageDataArr.length;i<j;i++){
     let singleImageData = imageDataArr[i];
     singleImageData.imageURL = require('../images/'+singleImageData.fileName);
     imageDataArr[i] = singleImageData;
   }
   return imageDataArr;
})(imageDatas);

/**
 * 取范围内的随机值
 * @param {*} low
 * @param {*} high
 */
function getRangeRandom(low,high) {
    return Math.ceil(Math.random() * (high - low)) + low;
}

/**
 * 取0-30度角
 */
function get30DegRandom() {
    return ((Math.random() > 0.5 ? '': '-') + Math.ceil(Math.random() * 30));
}

/**控制按钮组件 */
class ControllerUnit extends React.Component {
    
    handleClick(e) {

        //如果点击的是当前正在选中态的按钮，则翻转你图片，否则将对应的图片居中
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        var controllerUnitClassName = 'controller-unit';
        
        //如果对应的是居中的图片，显示控制按钮居中态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';

            //如果对应的是翻转图片，显示控制按钮翻转态
            if (this.props.arrange.inverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
        );
    }
}

/**单个图片组件 */
class ImgFigure extends React.Component {

    handleClick(e) {
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }
  

    render() {
        var styleObj = {};

        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
    
        if(this.props.arrange.rotate) {
            (['Moz','ms','Webkit','']).forEach(function(value){
                styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        if(this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
            imgFigureClassName += this.props.arrange.inverse ? ' is-inverse': '';

        return(
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
                <img src={this.props.data.imageURL}
                    alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className='img-back' onClick={this.handleClick.bind(this)}>
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
  }
}


class AppComponent extends React.Component {

    /**
     * 翻转图片
     * @param {*} index 传入当前被执行inverse操作的图片信息数组的index值
     * @return {function} 这是一个闭包函数，其中return中一个真正待被执行的函数
     */
    inverse(index) {
        return (function(){
            var imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].inverse = !imgsArrangeArr[index].inverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this));
    }

    /**
     * 利用arrange函数，居中对应index的图片
     * @param {*} index 需要背景中的图片对应的图片信息数组的index值
     * @return {Function}
     */
    center(index) {
        return function() {
            this.rearrange(index);
        }.bind(this);
    }

    /**
     * 重新布局所有图片
     * @param {*} centerIndex 指定居中排布哪个卡片
     */
    rearrange(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr, //获取图片位置信息数组
            Constant = this.Constant,  //获取定位位置对象
            centerPos = Constant.centerPos, //获取居中位置信息
            hPosRange = Constant.hPosRange, //获取水平位置信息
            h_leftSecX = hPosRange.leftSecX, //获取左侧X位置信息
            h_rightSecX = hPosRange.rightSecX, //获取右侧X位置信息
            h_y = hPosRange.h_y, //获取y位置信息
            vPosRange = Constant.vPosRange, //获取顶部位置信息
            v_x = vPosRange.v_x, //获取顶部X位置信息
            v_y = vPosRange.v_y; //获取顶部Y位置信息

        //获取居中图片index并居中处理
        var imgsArrangeArrCenter = imgsArrangeArr.splice(centerIndex,1);
        imgsArrangeArrCenter = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        //获取顶部图片index并处理
        var topImgNum= Math.ceil(Math.random() * 2),
            topIndex = 0,
            imgsArrangeArrTop = [];
            if(topImgNum) {
                topIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum + 1));
                imgsArrangeArrTop = imgsArrangeArr.splice(topIndex,topImgNum);

                imgsArrangeArrTop.forEach(function(value,index) {
                    imgsArrangeArrTop[index] = {
                        pos: {
                          left: getRangeRandom(v_x[0], v_x[1]),
                          top: getRangeRandom(v_y[0], v_y[1])
                        },
                        rotate: get30DegRandom()
                    };
                });
            }

          //获取水平方向上的图片信息并处理
          var k = Math.ceil(imgsArrangeArr.length / 2);
          for(var i = 0; i < imgsArrangeArr.length; i++) {
              if(i < k) {
                  imgsArrangeArr[i] = {
                      pos: {
                        left: getRangeRandom(h_leftSecX[0], h_leftSecX[1]),
                        top: getRangeRandom(h_y[0], h_y[1])
                      },
                      rotate: get30DegRandom(),
                      isCenter:false
                  }
              } else {
                  imgsArrangeArr[i] = {
                      pos: {
                        left: getRangeRandom(h_rightSecX[0], h_rightSecX[1]),
                        top: getRangeRandom(h_y[0], h_y[1])
                      },
                      rotate: get30DegRandom(),
                      isCenter:false
                  }
              }
          }

          //将去除的数组元素修改之后放回去
          if(imgsArrangeArr && imgsArrangeArrTop) {
              for(var i = topImgNum-1;i >= 0 ; i--) {
                imgsArrangeArr.splice(topIndex,0,imgsArrangeArrTop[i]);
              }
          }

          //中间图片
          imgsArrangeArr.splice(centerIndex,0,imgsArrangeArrCenter);

          this.setState({
            imgsArrangeArr: imgsArrangeArr
          })
    }


    constructor(props) {
        super(props);
        this.state = {imgsArrangeArr:[]};

        /*** 位置范围常量*/
        this.Constant = {
            centerPos:{
              left:0,
              top:0
            },
            hPosRange:{ //水平方向取值范围
              leftSecX:[0,0],
              rightSecX:[0,0],
              h_y:[0,0]
            },
            vPosRange:{ //垂直方向取值范围
              v_x:[0,0],
              v_y:[0,0]
            }
        };
    }


    componentDidMount(){
        /**舞台的宽高以及半宽和半高 */
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        /**图片的宽高以及半宽和半高 */
        var imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgDOM.scrollWidth,
            imgH = imgDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
            
        this.Constant.centerPos = {
            left:halfStageW - halfImgW,
            top:halfStageH - halfImgH
        };

        /**水平方向上左右两侧图片的范围start */
        /** 左*/
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

        /**右 */
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

        /**垂直 */
        this.Constant.hPosRange.h_y[0] = - halfImgH;
        this.Constant.hPosRange.h_y[1] = stageH - halfImgH;
        /**水平方向上左右两侧图片的范围start */

        /**垂直方向上顶部图片范围start */
        this.Constant.vPosRange.v_x[0] = halfStageW - imgW;
        this.Constant.vPosRange.v_x[1] = halfStageW;
        this.Constant.vPosRange.v_y[0] = -halfImgH;
        this.Constant.vPosRange.v_y[1] = halfStageH - halfImgH * 3;
        /**垂直方向上顶部图片范围end */

        /**默认居中第一张图片 */
        this.rearrange(0);
    }

    render() {

        var controllerUnits = [],
            ImgFigures = [];

        imageDatas.map(function(value,index) {

            if(!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                      left:0,
                      top:0
                    },
                    rotate: 0,
                    inverse:false,
                    isCenter:false
                }
            }
            ImgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index}
            arrange={this.state.imgsArrangeArr[index]} key={index} inverse={this.inverse(index)} center={this.center(index)}/>);

            controllerUnits.push(<ControllerUnit arrange={this.state.imgsArrangeArr[index]} key={index} inverse={this.inverse(index)} center={this.center(index)}/>)
        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {ImgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
