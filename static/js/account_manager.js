$(function () {
    $("#accountChange").on("click", function(e) {
      e.preventDefault(); 
    //   $('input').prop("disabled",false)
      $('#accountConfirm').show()
    })
    $("#accountConfirm").on("click", function(e) {
        e.preventDefault(); 
        $('input').prop("disabled",true)
        $('#accountConfirm').hide()
      })
  })

export function batch_new(){
    var form = new FormData();
    const fileInput = document.getElementById('fileInput')
    form.append("email", getLocalStorage("email"));
    form.append("accounts", fileInput.files[0]);

    var settings = {
        "url": "https://beta-eid-backend.townway.com.tw/accounts/batch_new",
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
        console.log(subData);
        printTable(subData)
      });
} 

function printTable(subData) {
    let tbody = document.getElementById('tbody')
    let tr = document.getElementById('tr')
    let td1 = document.getElementById('serialNumber')
    let td2 = document.getElementById('userName')
    let td3 = document.getElementById('healthNumber')
    let td4 = document.getElementById('email')
    subData.forEach( (data, index) => {
        let tr = document.createElement("tr")
		document.querySelector("#tbody").appendChild(tr)
		let trInfo = `
        <td id="serialNumber"> <input type="text" value="${data.device_no}" style="width: 100%;"></td>
        <td id ="userName"> <input type="text" value="${data.account_username}" style="width: 100%;"></td>
        <td id ="healthNumber"> <input type="text" value="待更新" style="width: 100%;"></td>
        <td id="email"> <input type="text" value="${data.account_email}" style="width: 100%;"></td>
		`
		tr.innerHTML = trInfo
	})
}