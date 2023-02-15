
$(document).ready(function () {
  list_device()
    $("#account_upload").on("click",function(e) {
      $(".file-div").show()
    })

    $("#upload").on("click",function(e) {
      batch_new()
    })

    $("#accountChange").on("click", function(e) {
      e.preventDefault(); 
      $('.username,.device_no,.email').prop("disabled",false)
      $('#accountConfirm').show()
    })
    $("#accountConfirm", ).on("click", function(e) {
        e.preventDefault(); 
        $('.username,.device_no,.email').prop("disabled",true)
        $('#accountConfirm').hide()
        $(".file-div").hide()
        update ()
      })

  })

function list_device(){
  var form = new FormData();
  form.append("email", "Real.ability2022@gmail.com");

  var settings = {
    "url": HOST_URL_EID_DAEMON +"/accounts/list_device",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let data = JSON.parse(response)
    let subData = (data.content)
    aprintTable(subData)
  });
}


function aprintTable(subData) {
  subData.forEach( (data, index) => {
      let tr = document.createElement("tr")
  document.querySelector("#tbody").appendChild(tr)
  let trInfo = `
      <td><input type="text" class="uuid" value="${data.uuid}" style="width: 100%;" disabled placeholder="待更新"></td>
      <td><input type="text" class="username" value="${data.account_username}" style="width: 100%;" disabled placeholder="待更新"></td>
      <td><input type="text" class="device_no" value="${data.device_no}" style="width: 100%;" disabled placeholder="待更新"></td>
      <td><input type="text" class="email" value="${data.account_email}" style="width: 100%;" disabled placeholder="待更新"></td>
  `
  tr.innerHTML = trInfo
})
}

  
function update () {
    let content = []
    let Parentdata = document.querySelector('.uuid').closest('tbody')

    Parentdata.querySelectorAll('tr').forEach((subData,idx) => {
        let data ={} 
        data.uuid = subData.querySelector(".uuid").value
        data.account_username= subData.querySelector(".username").value
        data.device_no= subData.querySelector(".device_no").value
        data.account_email= subData.querySelector(".email").value
        content.push(data)
    })

    const stringifycontent = JSON.stringify(content)

    var form = new FormData();
    form.append("accounts",stringifycontent)
    form.append("email", getLocalStorage("email"));
    var settings = {
        "url": HOST_URL_EID_DAEMON + "/accounts/batch_modify",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      $.ajax(settings).done(function (response) {
        console.log(response)
      });
} 


export function batch_new(){
    var form = new FormData();
    const fileInput = document.getElementById('fileInput')
    form.append("email", getLocalStorage("email"));
    form.append("accounts", fileInput.files[0]);

    var settings = {
        "url": HOST_URL_EID_DAEMON +"/accounts/batch_new",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      $.ajax(settings).done(function (response) {
        let data = JSON.parse(response)
        let subData = (data.content)
        console.log("data",data)
        location.reload()
        list_device()
      });
} 

function printTable(subData) {
    subData.forEach( (data, index) => {
        let tr = document.createElement("tr")
		document.querySelector("#tbody").appendChild(tr)
		let trInfo = `
        <td><input type="text" class="uuid" value="${data.uuid}" style="width: 100%;" disabled placeholder="待更新"></td>
        <td><input type="text" class="username" value="${data.account_username}" style="width: 100%;" disabled placeholder="待更新"></td>
        <td><input type="text" class="device_no" value="${data.device_no}" style="width: 100%;" disabled placeholder="待更新"></td>
        <td><input type="text" class="email" value="${data.account_email}" style="width: 100%;" disabled placeholder="待更新"></td>
		`
		tr.innerHTML = trInfo
	})
}

