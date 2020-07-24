var that;
class Tab {
  constructor(id) {
    that = this;
    //获取元素
    this.main = document.querySelector(id);
    this.add = document.querySelector(".tabadd"); // li 的父元素
    this.ul = document.querySelector(".fisrstnav ul:first-child");
    // section 父元素
    this.fsection = this.main.querySelector(".tabscon");
    this.init();
  }
  //初始化
  init() {
    this.updateNode();
    this.add.onclick = this.addTab;
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;
      this.sections[i].ondblclick = this.editTab;
      this.spans[i].ondblclick = this.editTab;
    }
  }
  updateNode() {
    this.lis = document.querySelectorAll("li");
    this.sections = document.querySelectorAll("section");
    this.remove = document.querySelectorAll(".icon-guanbi");
    this.spans = document.querySelectorAll(".fisrstnav li span:first-child");
  }
  // 切换功能
  toggleTab() {
    console.log(this.index);
    that.clearClass();
    this.className = "liactive";
    that.sections[this.index].className = "conactive";
  }
  //清楚所有li和section的类
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = "";
      this.sections[i].className = "";
    }
  }
  // 添加功能
  addTab() {
    that.clearClass();
    var random = Math.random();
    var li =
      '<li class="liactive"><span > 新选项卡 </span><span class = "iconfont icon-guanbi"></span></li>';
    var section = '<section class="conactive">测试 ' + random + "</section>";
    that.ul.insertAdjacentHTML("beforeend", li);
    that.fsection.insertAdjacentHTML("beforeend", section);
    that.init();
  }
  //删除功能
  removeTab(e) {
    e.stopPropagation(); //阻止事件冒泡 防止触发li的切换点击事件
    var index = this.parentNode.index;
    console.log(index);
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    if (document.querySelector(".liactive")) return;
    index--;
    that.lis[index] && that.lis[index].click();
  }
  //编辑功能
  editTab() {
    var str = this.innerHTML;
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.innerHTML = '<input type="text" />';
    var input = this.children[0];
    input.value = str;
    input.select();
    input.onblur = function() {
      this.parentNode.innerHTML = this.value;
    };
    input.onkeyup = function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    };
  }
}
new Tab("#tab");
