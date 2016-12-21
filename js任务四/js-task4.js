/**
 * Created by mm on 2016/12/20.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqiList=[];
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById('aqi-city-input').value.replace(/^\s+|\s+$/g,"");
    console.log(city);
    var number=document.getElementById('aqi-value-input').value.replace(/^\s+|\s+$/g,"");
    var reg=/^([\u4e00-\u9fa5]+)[A-Za-z]*$/ig;
    var r = /^\d{2}$/g;
    if(reg.test(city)&&r.test(number)){
        aqiData[city]=number;
        aqiList.push([city,number,"删除"]);
    }else{
        //需要重置正则搜索的位置
        reg.lastIndex=0;
        r.lastIndex=0;
        if(reg.test(city)){
            alert("空气质量指数必须是2位整数，请重新输入！");
        }else if(r.test(number)){
            alert("城市名称必须是中英文字符，请重新输入！");
        }else{
            alert("输入格式错误，请重新输入！");
        }
    }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    if(aqiList.length!=0){
        var html="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        aqiList.forEach(function(ele,i){
            html+=`
        <tr>
            <td>${ele[0]}</td><td>${ele[1]}</td><td><button>删除</button></td>
        </tr>`;
        });
        document.getElementById('aqi-table').innerHTML=html;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
    //清除输入框内的内容，方便下一次添加
    document.getElementById('aqi-city-input').value="";
    number=document.getElementById('aqi-value-input').value="";
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    var target=e.target;
    if(target.nodeName=="BUTTON"){
        document.getElementById('aqi-table').deleteRow(target.parentElement.parentElement.rowIndex);
        var delNum=target.parentElement.previousSibling.innerHTML;
        var delCity=target.parentElement.previousSibling.previousSibling.innerHTML;
        aqiList.forEach(function (elem, i) {
            if(elem[0]==delCity&&elem[1]==delNum){
                aqiList.splice(i,1);
                console.log(aqiList);
            }
        });
    }else{
        alert("您点击的位置不对，请点击删除按钮！");
    }
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').onclick=addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById('aqi-table').addEventListener('click',delBtnHandle,false);
}

init();
