/*主页加载头部，左侧，底部模块*/
$(function () {
    $(".xheader").load("head.html");
    $(".xleftsidebar").load("left.html");
    $(".xfoot").load("foot.html");
});
/*各中心区加载函数*/
function load_main(page) {
    $(".main").remove();
    $(".xmain").load(page);

}