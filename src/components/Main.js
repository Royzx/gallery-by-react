require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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

var ImgFigure = React.createClass({
  render(){
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
             alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});


class AppComponent extends React.Component {
  render() {

    var controllerUnits = [],
        ImgFigures = [];

    imageDatas.forEach((value,index) => {
        ImgFigures.push(<ImgFigure data = {value} key={'imgFigures'+index}/>);
    });

    return (
      <section className="stage">
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
