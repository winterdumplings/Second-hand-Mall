const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId);
  bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('expander')
      bodypadding.classList.toggle('body-pd')
    })
  }
}

showMenu('nav-toggle', 'navbar', 'body-pd')


const linkColor = document.querySelectorAll(".nav_link")
function colorLink() {
  linkColor.forEach(l => l.classList.remove('active'))
  this.classList.add('active')
}
linkColor.forEach(l => l.addEventListener('click', colorLink))

const linkCollapse = document.getElementsByClassName('collapse__link')
var i

for (i = 0; i < linkCollapse.length; i++) {
  linkCollapse[i].addEventListener('click', function () {
    const collapseMenu = this.nextElementSibling
    collapseMenu.classList.toggle('showCollapse')

    const rotate = collapseMenu.previousElementSibling
    rotate.classList.toggle("")
  })
}

/*
    功能列表
    1，全选功能
        选中所有行，汇总价格
    2，单选功能
        选中或取消选中一行
    3，数量加减按钮
        增减商品数量，计算小计价格
    4，删除按钮
        移除当前行，重新计算总计价格
    5，删除被选中的商品
*/

// 获取所有加减按钮(得到的是一个数组)
var add = document.querySelectorAll(".Increase");
var reduce = document.querySelectorAll(".Reduce");
// 获取所有文本框
var inputs = document.querySelectorAll(".unum");
// 获取所有行
var rows = document.querySelectorAll(".row");
// 获取所有单选框 
var chooses = document.querySelectorAll(".choose");
// 获取所有全选按钮
var choose_alls = document.querySelectorAll(".choose_all");
// 获取所有删除按钮
var btn_dels = document.querySelectorAll(".btn-del");
// 删除选中的商品
var del_check = document.querySelector(".del_check");

// 计算总计价格 & 计算选中的商品总数 & 同时判断是否全选
function setTotal(){
  var total = 0;  // 商品总价
  var allNum = 0; // 商品总数
  // 重新获取行
  rows = document.querySelectorAll(".row");
  // 遍历所有行
  for(var i=0; i<rows.length; i++){
      // 查找被选中的行
      var checkbox = rows[i].querySelector(".choose");
      if(checkbox.checked){
          
          // 获取小计价格（得到的是字符串，不是数字，需要转化）
          var smallTotal = rows[i].querySelector(".subtotal").innerHTML;
          // 把小计价格转化为数字
          smallTotal = Number(smallTotal);
          total += smallTotal;
          // 计算商品总数
          allNum += 1;
      }
  }

  // 把总计放在它应在的位置 
  var totalPrice = document.querySelector(".t-price");
  totalPrice.innerHTML = total.toFixed(2);
  // 设置商品总数
  document.querySelector(".t-number").innerHTML = allNum;

}

// 删除当前行
for(var i=0; i<btn_dels.length; i++){
  btn_dels[i].onclick = function(){
      var tr = this.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
      setTotal();
  }
}

// 删除选中行
del_check.onclick = function(){
  rows = document.querySelectorAll(".row");
  for(var i=0; i<rows.length; i++){
      var checkbox = rows[i].querySelector(".choose");
      if(checkbox.checked){
          rows[i].parentNode.removeChild(rows[i]);
      }
  }
}

// 获取弹窗
var modal = document.getElementById('myModal');
 
// 打开弹窗的按钮对象
var btn = document.getElementById("myBtn");
 
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

