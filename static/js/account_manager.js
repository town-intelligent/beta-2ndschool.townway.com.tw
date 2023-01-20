$(function () {
    $("#accountChange").on("click", function(e) {
      e.preventDefault(); 
      $('input').prop("disabled",false)
      $('#accountConfirm').show()
    })
    $("#accountConfirm").on("click", function(e) {
        e.preventDefault(); 
        $('input').prop("disabled",true)
        $('#accountConfirm').hide()
      })
  })

function batch_new(){
    var form = new FormData();
    form.append("email", "yillkid@gmail.com");
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
        console.log(response);
      });
} 