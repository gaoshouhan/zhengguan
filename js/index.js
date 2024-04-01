window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop; // 获取滚动距离

    const headBk = document.querySelector('.head-bk'); // 获取头部元素

    // 如果滚动距离大于 0，则改变透明度，触发过渡效果
    if (scrollTop > 0) {
        headBk.style.opacity = '1';
        
    } else {
        headBk.style.opacity = '0';
    }
    
});
window.addEventListener('load', function () {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过小轮播图显示左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    //鼠标离开小轮播图隐藏左右按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });

    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current-pic';
            var index = this.getAttribute('index');

            animate(ul, -index * focusWidth);
        });
    }
    //把第一个li设置curernt-pic
    ol.children[0].className = 'current-pic';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    //点击
    arrow_r.addEventListener('click', function () {
        var focusWidth = focus.offsetWidth;
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
    });
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';

        }
        num--;
        animate(ul, -num * focusWidth);
    });
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);

    var head_arrow_l = this.document.querySelector('.head-arrow-l');
    var head_arrow_r = this.document.querySelector('.head-arrow-r');
    var head_focus = this.document.querySelector('.head-focus');
    var head_focusWidth = head_focus.offsetWidth;
    var head_num = 0;
    var head_ul = head_focus.querySelector('ul');
    var head_ol = head_focus.querySelector('.head-circle');
    for (var i = 0; i < head_ul.children.length; i++) {
        var head_li = document.createElement('li');
        head_li.setAttribute('index', i);
        head_ol.appendChild(head_li);
        head_li.addEventListener('click', function () {
            for (var i = 0; i < head_ol.children.length; i++) {
                head_ol.children[i].className = '';
            }
            this.className = 'head-current-pic';
            var head_index = this.getAttribute('index');
            head_num = head_index;
            head_circle = head_index;

            animate(head_ul, -head_index * head_focusWidth);
        });
    }
    head_ol.children[0].className = 'head-current-pic';
    var head_first = head_ul.children[0].cloneNode(true);
    head_ul.appendChild(head_first);

    var head_circle = 0;
    head_arrow_r.addEventListener('click', function () {
        head_focusWidth = head_focus.offsetWidth;
        if (head_num == head_ul.children.length - 1) {
            head_ul.style.left = 0;
            head_num = 0;
        }
        head_num++;
        animate(head_ul, -head_num * head_focusWidth);
        head_circle++;
        if (head_circle == head_ol.children.length) {
            head_circle = 0;
        }
        for (var i = 0; i < head_ol.children.length; i++) {
            head_ol.children[i].className = '';
        }
        head_ol.children[head_circle].className = 'head-current-pic';
    });

    head_arrow_l.addEventListener('click', function () {
        head_focusWidth = head_focus.offsetWidth;
        if (head_num == 0) {
            head_num = head_ul.children.length - 1;
            head_ul.style.left = -head_num * head_focusWidth + 'px';

        }
        head_num--;
        animate(head_ul, -head_num * head_focusWidth);
        head_circle--;
        if (head_circle < 0) {
            head_circle = head_ol.children.length - 1;
        }
        for (var i = 0; i < head_ol.children.length; i++) {
            head_ol.children[i].className = '';
        }
        head_ol.children[head_circle].className = 'head-current-pic';
    });

    var head_timer = setInterval(function () {
        head_arrow_r.click();
    }, 4000);
});

function animate(obj, target, callback) {
    clearInterval(obj.timer);
    var duration = 900;
    var frames = 60;
    var interval = duration / frames;
    var initialLeft = obj.offsetLeft;
    var distance = target - initialLeft;
    var frameCount = 0;

    obj.timer = setInterval(function () {
        frameCount++;
        var progress = frameCount / frames;
        var easedProgress = easeOutCubic(progress);
        var currentLeft = initialLeft + distance * easedProgress;
        obj.style.left = currentLeft + 'px';

        if (frameCount >= frames) {
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
            callback && callback();
        }
    }, interval);

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}
