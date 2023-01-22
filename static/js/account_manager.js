$(function () {
    $("#accountChange").on("click", function(e) {
      e.preventDefault(); 
      $('input').prop("disabled",false)
      $('#accountConfirm').show()
    })
    $("#accountConfirm", ).on("click", function(e) {
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
        mbprintTable(subData)
      });
} 

function printTable(subData) {
    subData.forEach( (data, index) => {
        let tr = document.createElement("tr")
		document.querySelector("#tbody").appendChild(tr)
		let trInfo = `
        <td id="serialNumber"> <input type="text" value="${data.device_no}" style="width: 100%;" disabled></td>
        <td id ="userName"> <input type="text" value="${data.account_username}" style="width: 100%;" disabled></td>
        <td id ="healthNumber"> <input type="text" value="待更新" style="width: 100%;" disabled></td>
        <td id="email"> <input type="text" value="${data.account_email}" style="width: 100%;" disabled></td>
		`
		tr.innerHTML = trInfo
	})
}

function mbprintTable(subData) {
    subData.forEach( (data, index) => {
        let tab1 = document.createElement('div')
        tab1.style="border-bottom: 1px solid #000"
        tab1.className="my-2"

        document.querySelector('.mb-form-inner').appendChild(tab1)
        let tab_info = `
        <div class="mb-3">
            <label class="form-label">序號</label>
            <input type="text" class="form-control" value="${data.device_no}"disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">使用者名稱</label>
            <input type="text" class="form-control" value="${data.account_username}" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">健保卡號</label>
            <input type="text" class="form-control" value="待更新" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">電子郵件</label>
            <input type="text" class="form-control" value="${data.account_email}" disabled>
        </div>
        `
        tab1.innerHTML = tab_info
	})
}