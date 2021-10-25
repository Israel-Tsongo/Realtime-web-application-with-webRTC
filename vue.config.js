

module.exports = {
    productionSourceMap: false,
    devServer:{

       proxy:"http://localhost:3000",	   
    }
  
}

 //  disableHostCheck:true,
//  
//  hot :true,	     
//  port:8080,
//   //host:'localhost'
//  public:'0.0.0.0:8080'
 // publicPath:"/"
