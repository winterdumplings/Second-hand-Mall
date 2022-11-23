const showMenu = (toggleId,navbarId,bodyId)=>{
  const toggle = document.getElementById(toggleId),
  navbar = document.getElementById(navbarId);
  bodypadding = document.getElementById(bodyId);

  if(toggle && navbar){
      toggle.addEventListener('click',()=>{
          navbar.classList.toggle('expander')
          bodypadding.classList.toggle('body-pd')
      })
  }
}

showMenu('nav-toggle','navbar','body-pd')


const linkColor = document.querySelectorAll(".nav_link")
function colorLink(){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click',colorLink))

const linkCollapse = document.getElementsByClassName('collapse__link')
var i

for(i=0;i<linkCollapse.length;i++){
  linkCollapse[i].addEventListener('click',function(){
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