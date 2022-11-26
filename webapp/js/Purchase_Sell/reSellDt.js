
// 获取弹窗
var modal = document.getElementById('myModal');
 
// 打开弹窗的按钮对象
var btn = document.getElementById("button_sale");
 
// 获取 <span> 元素，用于关闭弹窗
var span = document.querySelector('.close');
// 点击按钮打开弹窗
btn.onclick = function() {
    modal.style.display = "block";
}
 
// 点击 <span> (x), 关闭弹窗
span.onclick = function() {
    modal.style.display = "none";
}
 
// 在用户点击其他地方时，关闭弹窗
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 定位到“发送”按钮
var sendbtn = document.getElementById("send_button")

// 点击事件
sendbtn.onclick=function(){
  var mes = send_words();
  // 获取商品id
  var itemid = getQueryString("itemid");
  // 点击发送按钮后向后端发送留言内容，留言时间
  // $.ajax({
  //     'url':"http://localhost:8080/items/add/comment",
  //     'type':'POST',
  //     "data":{
  //       "itemid":itemid,
  //       "comment":mes
  //     },
  //     'dataType':'json',
  //     'success':function () {
  //       alert("success");
  //     },
  //     error:function (XMLHttpRequest, textStatus, errorThrown) {
  //       console.log("请求失败")
  //       alert(XMLHttpRequest.status);
  //       alert(XMLHttpRequest.readyState);
  //       alert(textStatus);
  //     }
  //   })
}

// 获取框中的留言
function send_words() {
  cancelBubble =true;
  var inputDom = document.getElementById("send_input");
  var words = inputDom.value;
  return words;
}


//创建li标签
function addLi(photo,name,mes,date){ 
    var li_1=document.createElement("li");
    li_1.setAttribute("class","inf_list")
    var A_1 = createA()
    addImg(A_1,photo)
    var span_1 = createSpan()
    span_1.setAttribute("class","user_name")
    span_1.innerHTML=name;
    var  A_2 = createA()
    A_2.appendChild(span_1)
    var span_2 =createSpan()
    span_2.setAttribute("class","user_date")
    span_2.innerHTML=date;
    var p_1=document.createElement("p");
    var span_3 = createSpan();
    span_3.setAttribute("class","user_message");
    span_3.innerHTML=mes;
    p_1.appendChild(span_3);
    li_1.appendChild(A_1);
    li_1.appendChild(A_2);
    li_1.appendChild(span_2);
    li_1.appendChild(p_1);
    var ul_1 = document.getElementsByClassName("m_list_inf1")[0];
    ul_1.appendChild(li_1);

}

function createA(){
  var A=document.createElement("a");
  A.setAttribute("class","user");
  A.setAttribute("href","#");
  return A;
}

function createSpan(){
  var span=document.createElement("span");
  return span;
}



function addImg(obj,srcs){
  var Img=document.createElement("Img")
  Img.setAttribute("style" ,"width:20px;height:20px; border-radius: 50%");
  Img.setAttribute("src",srcs)
  obj.appendChild(Img);
}




// 从URL中获取商品id
function getQueryString(itemid) {
  var reg = new RegExp("(^|&)"+ itemid +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null){
    return  decodeURI(r[2]);
  } 
  return null;
}

// 加载商品信息
window.onload = function(){
  // 获取商品id
  var itemid = getQueryString("itemid");
  // 添加图片
  function addImg(obj,src){
    var Img=document.createElement("Img");
    Img.setAttribute("style","width:150px;height:150px;padding:0 0 0 5px");
    Img.setAttribute("src","../../pictures/"+src);
    obj.appendChild(Img);
  }
  // 从数据库从查找商品信息并导入
  $.ajax({
    'url':"http://127.0.0.1:5500/WEB-INF/templates/test2.json",
    'type':'GET',
    // 'dataType':'json',
    'success':function (res) {
      for(i=0;i<res.length;i++){
        if(res[i].itemid == itemid){
          var host = res[i].host;
          document.getElementsByClassName("goods_det")[0].innerHTML=res[i].itemname;
          document.getElementsByClassName("goods_way")[0].innerHTML=res[i].type;
          document.getElementsByClassName("send_date")[0].innerHTML=res[i].datetime;
          document.getElementsByClassName("b_name")[0].innerHTML=res[i].price;
          var A_Img = document.getElementsByClassName("owner_image")[0];
          var srcs = res[i].itempicture
          if(srcs != null){
            for(key in srcs)
            {
              if(key != "itemid" && srcs[key]!= null){
                addImg(A_Img,srcs[key])
              }
            }
          }else{
            srcs = "../../image/增加图片例图.png"
            addImg(A_Img,srcs)
          }
        }  
      } 
      // 从数据库从查找用户信息并导入
      $.ajax({
        'url':"http://127.0.0.1:5500/WEB-INF/templates/user.json",
        'type':'GET',
        // 'dataType':'json',
        'success':function (res) {
          for(i=0;i<res.length;i++){
            if(res[i].user.userid == host){
              document.getElementById("user_n").innerHTML=res[i].user.name;
              document.getElementById("user_a").innerHTML=res[i].user.schoolzone;
              var A_Img = document.getElementById("user_image");
              var src = res[i].headpicture.headpicture
              var Img=document.createElement("Img");
              Img.setAttribute("style","width:20px;height:20px; border-radius: 50%;");
              if(src != null){
                Img.setAttribute("src","../../pictures/"+src);
              }else{
                src = "../../image/增加图片例图.png"
                Img.setAttribute("src","../../pictures/"+src);
              }
              A_Img.appendChild(Img);
            }  
          } 
        }
      }) 
    }
  })  
  // 从后端获取到商品评论信息并展示
  $.ajax({
    'url':"http://127.0.0.1:5500/WEB-INF/templates/comment.json",
    'type':'GET',
    // 'dataType':'json',
    'success':function (res) {
      for(i=0;i<res.length;i++){
        if(res[i].itemid==itemid){
          var mes = res[i].comment;
          var userid = res[i].userid;
          var date = res[i].datetime;
          // 从数据库从查找用户信息并导入
          $.ajax({
            'url':"http://127.0.0.1:5500/WEB-INF/templates/user.json",
            'type':'GET',
            // 'dataType':'json',
            'success':function (res) {
              for(i=0;i<res.length;i++){
                if(res[i].user.userid == userid){
                  var name = res[i].user.name;
                  var src = "../../pictures/"+res[i].headpicture.headpicture;
                  addLi(src,name,mes,date)
                }  
              } 
            }
          }) 
        }
      }
    },
    error:function (XMLHttpRequest, textStatus, errorThrown) {
      console.log("请求失败")
      alert(XMLHttpRequest.status);
      alert(XMLHttpRequest.readyState);
      alert(textStatus);
    }
  })
}

// 点击加入购物车后向后端发送商品ID
// var cartbtn = document.getElementById("button_cart");
// cartbtn.onclick = function(){
//   // 获取商品id
//   var itemid = getQueryString("itemid");
//   // 向后台发送要加入购物车的商品id
//   $.ajax({
//     'url':"http://localhost:8080/items/add/shoppingCart/:itemid",
//     'type':'POST',
//     "data":{
//       "itemid":itemid
//     },
//     'dataType':'json',
//     'success':function () {
//       alert("success");
//     },
//     error:function (XMLHttpRequest, textStatus, errorThrown) {
//       console.log("请求失败")
//       alert(XMLHttpRequest.status);
//       alert(XMLHttpRequest.readyState);
//       alert(textStatus);
//     }
//   })
// }

// // 点击立即购买后向后端发送商品ID
// var salebtn = document.getElementById("button_sale");
// salebtn.onclick = function(){
//   // 获取商品id
//   var itemid = getQueryString("itemid");
//   // 向后台发送要加入购物车的商品id
//   $.ajax({
//     'url':"http://localhost:8080/order/add/order",
//     'type':'POST',
//     "data":{
//       "itemid":itemid
//     },
//     'dataType':'json',
//     'success':function () {
//       alert("success");
//     },
//     error:function (XMLHttpRequest, textStatus, errorThrown) {
//       console.log("请求失败")
//       alert(XMLHttpRequest.status);
//       alert(XMLHttpRequest.readyState);
//       alert(textStatus);
//     }
//   })
// }

