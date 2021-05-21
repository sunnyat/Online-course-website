/* obj 动画对象
   target 目标位置
   callback 回调函数 */
// 左右运动
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;  // step步长值
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 大于零向上取整,小于零向下取整
        if(obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}

// 上下运动
function animatetop(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetTop) / 10;  // step步长值
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 大于零向上取整,小于零向下取整
        if(obj.offsetTop == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.top = obj.offsetTop + step + 'px';
    }, 15)
}