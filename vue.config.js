
const fs=require('fs')
module.exports = {
    productionSourceMap: false,
    devServer:{

         //host:"0.0.0.0",
        disableHostCheck:true,
        https:{
            
            key:fs.readFileSync(__dirname+'/server/ssl/key.pem'),
            cert:fs.readFileSync(__dirname+'/server/ssl/cert.pem')
         },
         public:'https://0.0.0.0:8080/',
      //  proxy:'https://192.168.43.9:3000'

        // proxy: {
        //     "^/login": {
        //       target: "http://localhost:3000/login",
        //       changeOrigin: true,
        //       logLevel: "debug",
             
        //     }

       // }
    }

     //   proxy:"http://localhost:3000/",	
    //    disableHostCheck:true,
    //    https:false 
    // public:http://l 
    // allowedHost:[] 
    
  
}

 //  
//  
//  hot :true,	     
//  port:8080,
//   //host:'localhost'
//  public:'0.0.0.0:8080'
 // publicPath:"/"
