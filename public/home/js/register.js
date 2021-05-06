var honeyname = document.querySelector("#honeyname");
var p1 = document.querySelector(".p1");
var pwd = document.querySelector("#pwd");
var p2 = document.querySelector(".p2");
honeyname.onblur = function() {
    if(this.value.length < 2 || this.value.length > 8) {
        p1.className = 'p1 wrong1';
        p1.innerHTML = '不符合规范！';
    } else {
        p1.className = 'p1 right1';
        p1.innerHTML = '输入正确';
    }
}
pwd.onblur = function() {
    if(this.value.length < 6 || this.value.length > 16) {
        p2.className = 'p2 wrong2';
        p2.innerHTML = '不符合规范！';
    } else {
        p2.className = 'p2 right2';
        p2.innerHTML = '输入正确';
    }
}