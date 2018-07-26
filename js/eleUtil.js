//获取元素的纵坐标（相对于窗口）
export function getOffsetTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getOffsetTop(e.offsetParent);
    return offset;
}

//获取元素的横坐标（相对于窗口）
export function getOffsetLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getOffsetLeft(e.offsetParent);
    return offset;
}

export function getOffsetPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
    var t = obj.offsetTop; //获取该元素对应父容器的上边距
    var l = obj.offsetLeft; //对应父容器的上边距
    //判断是否有父容器，如果存在则累加其边距
    while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
        t += obj.offsetTop; //叠加父容器的上边距
        l += obj.offsetLeft; //叠加父容器的左边距
    }
    return {top: t,left:l}
}

export function addClass(obj, cls){
    var obj_class = obj.className,//获取 class 内容.
    blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
  }

export  function removeClass(obj, cls){
    var obj_class = ' '+obj.className+' '//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
    var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
  }

export  function hasClass(obj, cls){
    var obj_class = obj.className,//获取 class 内容.
    obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    var x = 0;
    for(x in obj_class_lst) {
      if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
        return true;
      }
    }
    return false;
}

export function scrollTop(top,opts={}){
    top = top + (opts.from ? getOffsetTop(opts.from):0),
    window.scrollTo(0,top);
}
