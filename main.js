function weight() {
  // 関数を作る
  return parseFloat(document.getElementById("weightnum").value);
}
function showResult(num) {
  document.getElementById("box").innerHTML = num;
}

//weight() == NaN)
document.getElementById("energy-buttom").onclick = function() {
  if (isNaN(weight()) || weight() == undefined || weight() == 0) {
    console.log("what is this keyboard!!!");
    showResult("please insert number");
  } else {
    window.localStorage.setItem("weight", weight());
    window.localStorage.setItem("energy", 70 * Math.pow(weight(), 0.75) * 1.6);

    showResult(70 * Math.pow(weight(), 0.75) * 1.6);
  }
};
//////////////////////////////////////////////////////////
// 1dayKcal=(70*weight^0.75)*activity coeffient活動係数
// 1time foodQ/2=(((70*weight^0.75)*activity coeffient活動係数)/foodKcal100g*100)/2
/////////////////////////////////////////////////////////



// <!--RER安静時の必要エネルギー「70×体重(kg)の0.75乗」:minimum calories for the dog
//     RER=70× "weight"^0.75	 -->
// <!--DER一日に必要なカロリー量「RER×活動係数」:minimum calories for the dog that not neutered.			-->
// <!--not neutered: 1.8	DER=RER*1.8-->
// <!--DER一日に必要なカロリー量「RER×活動係数」:minimum calories for the dog that neutered.			-->
// <!--neutered:	1.6	DER=RER*1.8-->
// <!--1日に必要なフードの量Quantity of the food of the day＝DER÷(food calories/100g)*100				-->

$(document).ready(function(){

	var saveStorage = function(val){
		localStorage.setItem("myChart", JSON.stringify(val));
	};

	var getStorage = function(){
		var obj = localStorage.getItem("myChart");
		return JSON.parse(obj);
	};

	var add = function(){
		var ttl = $(".memoForm #title").val();
				bdy = $(".memoForm #body").val();
		addMemo(ttl,bdy);
		saveMemo(ttl,bdy);
	};

	var addMemo = function(ttl,bdy){
		    var template =
                    '<input type="text" id="title" class="form-control" readonly="readonly" value="%s"/>' +
          '<textarea class="form-control" rows="3" id="body" readonly="readonly">%s</textarea>';
                    template = template.replace('%s',ttl).replace('%s',bdy);

		$("#memoArea").append(template);

		$(".memoForm #title").val('');
		$(".memoForm #body").val('');
	}

	memoArr = [];
	var storageKey = 'memoObj';

	var saveMemo = function(ttl,bdy){
		var memoObj = {
			ttl : ttl,
			bdy : bdy
		};
		memoArr.push(memoObj);
		saveStorage(storageKey,memoArr);
	}

	var resetMemo = function(){
		$("#memoArea").children().remove();
		window.localStorage.clear();
	}

	var readMemo = function(){
		var memoObjs = getStorage(storageKey);
		if (memoObjs.length == null) return;
		for (var i = 0; i < memoObjs.length; i ++) {
			var memoObj = memoObjs[i];
			var ttl = memoObj.ttl;
			var bdy = memoObj.bdy;
			var memoObj = {
				ttl : ttl,
				bdy : bdy
			};
		memoArr.push(memoObj);
		saveStorage(storageKey,memoArr);
			addMemo(ttl,bdy);
		}
	};

	// todo クリック時にこの�������で値を成型する
	var dummy = {
	  weight: "25kg",
	  weather: "40度"
	};

// 	saveStrageを使って保存する
	saveStorage(dummy);

// 	値の呼び出し
var datas = getStorage();
	console.log(datas);

var ctx = document.getElementById('myChart').addEventListener("click",function(){
var datas = getStorage();
  type: 'bar',
  data: {
    labels: ['datas', 'datas', 'datas', 'datas', 'datas', 'datas', 'datas'],
    datasets: [{
      label: '愛犬の体重',
      type: "line",
      fill: false,
      data: [11, 11.5, 11, 12, 14, 12, 11],
      borderColor: "rgb(154, 162, 235)",
      yAxisID: "y-axis-1",
    }, {
      label: '気温',
      data: [30, 32, 28, 35, 30, 35, 30],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      yAxisID: "y-axis-2",
    }]
  },
  options: {
    tooltips: {
      mode: 'nearest',
      intersect: false,
    },
    responsive: true,
    scales: {
      yAxes: [{
        id: "y-axis-1",
        type: "linear",
        position: "left",
        ticks: {
          max: 30,
          min: 0,
          stepSize: 10
        },
      }, {
        id: "y-axis-2",
        type: "linear",
        position: "right",
        ticks: {
          max: 70,
          min: 0,
          stepSize: 5
        },
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    },
  }
});
