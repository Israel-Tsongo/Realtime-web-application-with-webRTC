module.exports = {
    productionSourceMap: false,
    devServer:{
      
	     disableHostCheck:true,
	     https:false,
	     hot :true,	     
	     port:8080,
	      //host:'localhost'
	     public:'0.0.0.0:8080'
    },
    publicPath:"/"
};
