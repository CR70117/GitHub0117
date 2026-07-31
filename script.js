console.log("AI旅游助手加载成功");


// =========================
// 配置
// =========================


const API =
"http://127.0.0.1:3000/assistant/stream/draft";


const TOKEN =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiYnVmZmVyVGltZSI6MTc4NTQ3MjQzOSwiZXhwIjoxNzg1NTUxNjM5LCJpc3MiOiJ3YW53dSIsIm5iZiI6MTc4NTQ2NTIzOSwic3ViIjoidXNlciJ9.HrH3mPiCdtg164DNzS_71polXcyZTHxM2tz8rE0sTqo";


const CLIENT_ID =
"fcc2030b-8ffe-4688-9011-7d85919d24b6";


const ORG_ID =
"4";


const USER_ID =
"3";



const ASSISTANT_ID =
"6";



// =========================
// 状态
// =========================


let conversationId = "";

let sending = false;

let currentAI = null;



// =========================
// DOM
// =========================


const sendBtn =
document.getElementById("sendBtn");


const input =
document.getElementById("prompt");


const chatBox =
document.getElementById("chatBox");



console.log(
"按钮:",
sendBtn
);





// =========================
// 事件绑定
// =========================


sendBtn.onclick = send;



input.addEventListener(
"keydown",
function(e){


if(
e.key==="Enter"
&&
!e.shiftKey
){

e.preventDefault();

send();

}


});






// =========================
// 快捷按钮
// =========================


function quickAsk(text){


input.value=text;

send();


}





// =========================
// 发送
// =========================


async function send(){


if(sending){

console.log(
"请求中..."
);

return;

}



let prompt =
input.value.trim();



if(!prompt)
return;



sending=true;


sendBtn.disabled=true;



addUser(prompt);


addAI();



input.value="";





try{


if(!conversationId){


conversationId =
crypto.randomUUID();


}



console.log(
"conversationId:",
conversationId
);






const response =
await fetch(
API,
{


method:"POST",



headers:{


"Accept":
"text/event-stream",


"Content-Type":
"application/json",


"Authorization":
TOKEN,


"X-Client-Id":
CLIENT_ID,


"X-Org-Id":
ORG_ID,


"X-User-Id":
USER_ID


},




body:JSON.stringify({


conversationId:


conversationId,


assistantId:


ASSISTANT_ID,


prompt:


prompt,


fileInfo:[]


})


});






console.log(
"HTTP:",
response.status
);





if(!response.ok){

throw new Error(
"HTTP错误:"
+
response.status
);

}






const reader =
response.body.getReader();



const decoder =
new TextDecoder(
"utf-8"
);



let buffer="";


let answer="";






while(true){



const {

done,

value

}

=

await reader.read();





if(done){


console.log(
"SSE结束"
);


break;


}




buffer +=
decoder.decode(
value,
{
stream:true
}
);





let events =
buffer.split("\n\n");



buffer =
events.pop();







for(
let event of events
){



let line =
event
.split("\n")
.find(
x =>
x.startsWith("data:")
);




if(!line)
continue;




let data =
line
.substring(5)
.trim();





if(
!data ||
data==="[DONE]"
)
continue;





let json;



try{


json =
JSON.parse(data);


}

catch(e){


console.log(
"非JSON:",
data
);


continue;


}





console.log(
"SSE:",
json
);





// =================================
// 过滤知识库过程
// =================================


if(
json.eventType===2
){

console.log(
"过滤知识库事件"
);

continue;

}




// =================================
// 过滤工具调用过程
// =================================


if(
json.eventType===3
){

console.log(
"过滤工具事件"
);

continue;

}




// =================================
// 过滤工具文本
// =================================



let raw =
JSON.stringify(json);



if(

raw.includes("工具参数")

||

raw.includes("工具调用结果")

||

raw.includes("tool_call")

){


console.log(
"过滤工具文本"
);


continue;


}






// =================================
// 获取AI回复
// =================================


let text="";




if(
typeof json.response==="string"
){

text =
json.response;

}



else if(
typeof json.content==="string"
){

text =
json.content;

}




else if(
typeof json.answer==="string"
){

text =
json.answer;

}





else if(
typeof json.text==="string"
){

text =
json.text;

}







if(text){


answer += text;




currentAI.innerHTML =
answer.replace(
/\n/g,
"<br>"
);



chatBox.scrollTop =
chatBox.scrollHeight;



}



}



}



}


catch(error){


console.error(
"请求失败:",
error
);



if(currentAI){


currentAI.innerHTML =
"❌ "
+
error.message;


}



}



finally{


sending=false;


sendBtn.disabled=false;


}



}








// =========================
// 用户消息
// =========================


function addUser(text){



let div =
document.createElement(
"div"
);



div.className =
"message user";



div.innerHTML = `


<div class="avatar">
👤
</div>


<div class="bubble">

${text}

</div>


`;



chatBox.appendChild(div);



}








// =========================
// AI消息
// =========================


function addAI(){



let div =
document.createElement(
"div"
);



div.className =
"message ai";



div.innerHTML = `


<div class="avatar">
AI
</div>


<div class="bubble">

正在思考...

</div>


`;



chatBox.appendChild(div);



currentAI =
div.querySelector(
".bubble"
);



}