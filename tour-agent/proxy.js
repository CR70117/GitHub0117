const express = require("express");
const cors = require("cors");

const {
    createProxyMiddleware
} = require("http-proxy-middleware");



const app = express();




// =========================
// CORS配置
// =========================

app.use(
    cors({
        origin:"*",
        methods:[
            "GET",
            "POST",
            "OPTIONS"
        ],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "X-Client-Id",
            "X-Org-Id",
            "X-User-Id"
        ]
    })
);




// =========================
// 测试
// =========================

app.get("/",(req,res)=>{

    res.send(
        "proxy running"
    );

});




// =========================
// 请求日志
// =========================

app.use((req,res,next)=>{


    console.log("==========================");


    console.log(
        "收到请求:",
        req.method,
        req.url
    );


    next();


});





// =========================
// 智能体代理
// =========================


app.use(


    "/assistant",



    createProxyMiddleware({


        target:

        "http://36.212.15.10:8081",



        changeOrigin:true,



        // 保留SSE流

        selfHandleResponse:false,



        // 关键：路径重写

        pathRewrite:function(path,req){



            console.log(
                "重写前:",
                path
            );



            let newPath =

            "/user/api/v1/assistant"

            +

            path.replace(
                "/assistant",
                ""
            );



            console.log(
                "重写后:",
                newPath
            );



            return newPath;


        },




        on:{



            // 请求发送前

            proxyReq(proxyReq,req,res){



                console.log(
                    "最终发送路径:",
                    proxyReq.path
                );



                // Token

                if(req.headers.authorization){


                    proxyReq.setHeader(

                        "Authorization",

                        req.headers.authorization

                    );

                }



                // client

                if(req.headers["x-client-id"]){


                    proxyReq.setHeader(

                        "X-Client-Id",

                        req.headers["x-client-id"]

                    );


                }




                // org

                if(req.headers["x-org-id"]){


                    proxyReq.setHeader(

                        "X-Org-Id",

                        req.headers["x-org-id"]

                    );


                }





                // user

                if(req.headers["x-user-id"]){


                    proxyReq.setHeader(

                        "X-User-Id",

                        req.headers["x-user-id"]

                    );


                }



            },






            // 接收到智能体返回

            proxyRes(proxyRes,req,res){



                console.log(

                    "智能体返回状态:",

                    proxyRes.statusCode

                );



                console.log(

                    "返回类型:",

                    proxyRes.headers["content-type"]

                );



            },






            // 错误

            error(err,req,res){



                console.log(

                    "代理错误:",

                    err.message

                );



            }



        }



    })



);








// =========================
// 启动
// =========================


app.listen(


    3000,


    "127.0.0.1",



    ()=>{


        console.log("==========================");


        console.log(
            "运行的是我的proxy.js"
        );


        console.log(
            "代理启动成功 http://127.0.0.1:3000"
        );


        console.log("==========================");


    }


);