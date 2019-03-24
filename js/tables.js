/*面板缩小、关闭*/
$("#collapse").on("click",function (e) {
    e.preventDefault();
$(this).closest(".panel").find(".panel-body").slideToggle();
});
$("#close").on("click",function (e) {
   e.preventDefault();
   $(this).closest(".panel").remove();
});
/*构造导航条*/
function build_pageNav(pageInfoData,tableName) {
    $("#page_nav").empty();
    let ul=$("<ul></ul>").addClass("pagination");
    let firstPage =$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    let prePage =$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(pageInfoData["hasPreviousPage"]===false){
        firstPage.addClass("disabled");
        prePage.addClass("disabled");
    }else {
        firstPage.on('click',function () {
            switch (tableName) {
                case "devInfo":
                    build_devInfo(1,pageSize);
                    break;
                case "devCustom":
                    build_devCustom(1,pageSize);
                    break;
                case "devBatch":
                    build_devBatch(1,pageSize);
                    break;
                case "devFavorite":
                    build_devFavorite(1,pageSize);
                    break;
            }
        });
        prePage.on('click',function () {
            switch (tableName) {
                case "devInfo":
                    build_devInfo(pageInfoData["pageNum"]-1,pageSize);
                    break;
                case "devCustom":
                    build_devCustom(pageInfoData["pageNum"]-1,pageSize);
                    break;
                case "devBatch":
                    build_devBatch(pageInfoData["pageNum"]-1,pageSize);
                    break;
                case "devFavorite":
                    build_devFavorite(pageInfoData["pageNum"]-1,pageSize);
                    break;
            }
        });
    }
    let lastPage=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    let nextPage=$("<li></li>").append($("<a></a>").append("&raquo;"));
    if(pageInfoData["hasNextPage"]===false){
        lastPage.addClass("disabled");
        nextPage.addClass("disabled");
    }else{
        lastPage.on('click',function () {
            switch (tableName) {
                case "devInfo":
                    build_devInfo(pageInfoData["pages"],pageSize);
                    break;
                case "devCustom":
                    build_devCustom(pageInfoData["pages"],pageSize);
                    break;
                case "devBatch":
                    build_devBatch(pageInfoData["pages"],pageSize);
                    break;
                case "devFavorite":
                    build_devFavorite(pageInfoData["pages"],pageSize);
                    break;
            }
        });
        nextPage.on('click',function () {
            switch (tableName) {
                case "devInfo":
                    build_devInfo(pageInfoData["pageNum"]+1,pageSize);
                    break;
                case "devCustom":
                    build_devCustom(pageInfoData["pageNum"]+1,pageSize);
                    break;
                case "devBatch":
                    build_devBatch(pageInfoData["pageNum"]+1,pageSize);
                    break;
                case "devFavorite":
                    build_devFavorite(pageInfoData["pageNum"]+1,pageSize);
                    break;
            }
        });
    }
    ul.append(firstPage).append(prePage);
    $.each((pageInfoData)["navigatepageNums"],function (number,value) {
        let li=$("<li></li>").append($("<a></a>").append(value));
        if((pageInfoData)["pageNum"]===value){
            li.addClass("active");
        }
        li.on('click',function () {
            switch (tableName) {
                case "devInfo":
                    build_devInfo(value,pageSize);
                    break;
                case "devCustom":
                    build_devCustom(value,pageSize);
                    break;
                case "devBatch":
                    build_devBatch(value,pageSize);
                    break;
                case "devFavorite":
                    build_devFavorite(value,pageSize);
                    break;
            }
        });
        li.appendTo(ul);
    })
    ul.append(nextPage).append(lastPage);
    let nav=$("<nav></nav>").append(ul);
    nav.appendTo($("#page_nav"));
}

/*构造导航信息*/
function build_pageInfo(pageInfoData) {
    let pageNum=pageInfoData["pageNum"];
    let pages=pageInfoData["pages"];
    let total=pageInfoData["total"];
    $("#page_info").empty().append("当前第 "+pageNum+" 页,总共 "+pages+" 页,总共 "+total+" 条记录");
}

function setpageSize(number,tableName) {
    pageSize=number;
    switch (tableName) {
        case "devInfo":
            build_devInfo(pageNum,number);
            break;
        case "devCustom":
            build_devCustom(pageNum,number);
            break;
        case "devBatch":
            build_devBatch(pageNum,number);
            break;
        case "devFavorite":
            build_devFavorite(pageNum,number);
            break;
    }
    build_devCustom(pageNum,pageSize);
}
/*常量*/
const API="http://106.12.20.45:8081/tcms/";

/*获取表全部数据*/
function build_devInfo(pagenum,pagesize) {
    let jsonObj={};
    jsonObj.pageNum=pagenum;
    jsonObj.pageSize=pagesize;
    $.ajax({
        type:"get",
        dataType:"json",
        url:API+"device/DevBasicInfo",
        //url:"http://localhost:8080/tcms/device/DevBasicInfo",
        data:jsonObj,
        success:function (result){
            if(result.code === "101"){
                build_devInfo_table(((result.data)["allDeviceBasicInfo"])["list"]);
                build_pageInfo((result.data)["allDeviceBasicInfo"]);
                build_pageNav((result.data)["allDeviceBasicInfo"],"devInfo");
            }
            if(result.code === "102"){

            }
        }
    })
}

function build_devInfo_table(tableData) {
    $("#devInfo_table tbody").empty();
    $.each(tableData,function (index,obj) {
        let choose=$("<td><input type='checkbox' class='check_item'></td>");
        let deviceMac=$("<td></td>").append(obj["deviceMac"]);
        let deviceId=$("<td></td>").append(obj["deviceId"]);
        let batch=$("<td></td>").append(obj["batch"]);
        let version=$("<td></td>").append(obj["version"]);
        let openId=$("<td></td>").append(obj["openId"]);
        let authorizeTime=$("<td></td>").append(obj["authorizeTime"]);
        let edit=$("<div></div>").addClass("editBtn").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del=$("<div></div>").addClass("delBtn").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation=$("<td></td>").append(edit).append(del);
        $("<tr></tr>").append(choose)
            .append(choose)
            .append(deviceMac)
            .append(deviceId)
            .append(batch)
            .append(version)
            .append(openId)
            .append(authorizeTime)
            .append(operation)
            .appendTo("#devInfo_table");

    });
}


function build_devCustom(pagenum,pagesize) {
    let jsonObj={};
    jsonObj.pageNum=pagenum;
    jsonObj.pageSize=pagesize;
    $.ajax({
        type:"get",
        dataType:"json",
        //url:"http://localhost:8080/tcms/device/DevCustomizedInfo",
        data:jsonObj,
        url:API+"device/DevCustomizedInfo",
        success:function (result){
            if(result.code === "101"){
                build_devCustom_table(((result.data)["allDevCustomizedInfo"])["list"]);
                build_pageInfo((result.data)["allDevCustomizedInfo"]);
                build_pageNav((result.data)["allDevCustomizedInfo"],"devCustom");
            }
            if(result.code === "102"){

            }
        }
    })
}
function build_devCustom_table(tableData) {
    $("#devCustom_table tbody").empty();
    $.each(tableData,function (index,obj) {
        let choose=$("<td><input type='checkbox' class='check_item'></td>");
        let deviceId=$("<td></td>").append(obj["deviceId"]);
        let voice=$("<td></td>").append(obj["voice"]);
        let speed=$("<td></td>").append(obj["speed"]);
        let ttsVoice=$("<td></td>").append(obj["ttsVoice"]);
        let playMethod=$("<td></td>").append(obj["playMethod"]);
        let ageRange=$("<td></td>").append(obj["minAge"]+"~"+obj["minAge"]);
        let turnOnLevel=$("<td></td>").append(obj["turnOnLevel"]);
        let turnOnPlay=$("<td></td>").append(obj["turnOnPlay"]);
        let edit=$("<div></div>").addClass("editBtn").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del=$("<div></div>").addClass("delBtn").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation=$("<td></td>").append(edit).append(del);
        $("<tr></tr>").append(choose)
            .append(choose)
            .append(deviceId)
            .append(voice)
            .append(speed)
            .append(ttsVoice)
            .append(playMethod)
            .append(ageRange)
            .append(turnOnLevel)
            .append(turnOnPlay)
            .append(operation)
            .appendTo("#devCustom_table");

    });
}
function build_devBatch(pagenum,pagesize) {
    let jsonObj={};
    jsonObj.pageNum=pagenum;
    jsonObj.pageSize=pagesize;
    $.ajax({
        type:"get",
        dataType:"json",
        // url:"http://localhost:8080/tcms/device/BatchBasicInfo",
        data:jsonObj,
        url:API+"device/BatchBasicInfo",
        success:function (result){
            if(result.code === "101"){
                build_devBatch_table(((result.data)["allBatchBasicInfo"])["list"]);
                build_pageInfo((result.data)["allBatchBasicInfo"]);
                build_pageNav((result.data)["allBatchBasicInfo"],"devBatch");
            }
            if(result.code === "102"){

            }
        }
    })
}
function build_devBatch_table(tableData) {
    $("#batch_table tbody").empty();
    $.each(tableData,function (index,obj) {
        let choose=$("<td><input type='checkbox' class='check_item'></td>");
        let batch=$("<td></td>").append(obj["batch"]);
        let text=$("<td></td>").append(obj["text"]);
        let levelCode=$("<td></td>").append(obj["levelCode"]);
        let audioMin=$("<td></td>").append(obj["audioMin"]);
        let audioMax=$("<td></td>").append(obj["audioMax"]);
        let modelId=$("<td></td>").append(obj["modelId"]);
        let deviceCount=$("<td></td>").append(obj["deviceCount"]);
        let edit=$("<div></div>").addClass("editBtn").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del=$("<div></div>").addClass("delBtn").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation=$("<td></td>").append(edit).append(del);
        $("<tr></tr>").append(choose)
            .append(batch)
            .append(text)
            .append(levelCode)
            .append(audioMin)
            .append(audioMax)
            .append(modelId)
            .append(deviceCount)
            .append(operation)
            .appendTo("#batch_table");

    });
}
function build_devFavorite() {
    let jsonObj={};
    jsonObj.pagenum=pagenum;
    jsonObj.pagesize=pagesize;
    checkUndefined(jsonObj);
    $.ajax({
        type:"GET",
        url:API+"device/DevFavouriteInfo",
        data:JSON.stringify(jsonObj),
        success:function (result){
            if(result.code === "101"){
                build_devFavorite_table(((result.data)["allBatchBasicInfo"])["list"]);
                build_pageInfo((result.data)["allBatchBasicInfo"]);
                build_pageNav((result.data)["allBatchBasicInfo"],"devFavorite");
            }
            if(result.code === "102"){

            }
        }
    })
}
function build_devFavorite_table(tableData) {
    $("#batch_table tbody").empty();
    $.each(tableData,function (index,obj) {
        let choose=$("<td><input type='checkbox' class='check_item'></td>");
        let batch=$("<td></td>").append(obj["batch"]);
        let text=$("<td></td>").append(obj["text"]);
        let levelCode=$("<td></td>").append(obj["levelCode"]);
        let audioMin=$("<td></td>").append(obj["audioMin"]);
        let audioMax=$("<td></td>").append(obj["audioMax"]);
        let modelId=$("<td></td>").append(obj["modelId"]);
        let deviceCount=$("<td></td>").append(obj["deviceCount"]);
        let edit=$("<div></div>").addClass("editBtn").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        edit.attr('id','#exampleModal');
        let del=$("<div></div>").addClass("delBtn").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        $("<tr></tr>").append(choose)
            .append(batch)
            .append(text)
            .append(levelCode)
            .append(audioMin)
            .append(audioMax)
            .append(modelId)
            .append(deviceCount)
            .append(operation)
            .appendTo("#batch_table");

    });
}
let $div=$("div");



/*$(document).ready(function(){
      $(".editBtn").attr("data-toggle","model");
      $(".editBtn").attr("data-target","#exampleModal");
  });*/
  
$div.delegate(".editBtn","click",function (event) {
    $("#exampleModal").modal({backdrop:  false, keyboard: false, show: true});


    event.stopPropagation();
    
    

});
$div.delegate(".delBtn","click",function (event) {
    event.stopPropagation();
    alert("删除");
});
$div.delegate(".check_item","click",function (event) {
    event.stopPropagation();
    let flag=$(".check_item:checked").length===$(".check_item").length;
    $(".allchoose").prop("checked",flag);
});
//sss

