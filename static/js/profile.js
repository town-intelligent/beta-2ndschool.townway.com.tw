export function accountDelete() {

  var form = new FormData();
  form.append("email", getLocalStorage("email"));
  
  var settings = {
    "url": HOST_URL_EID_DAEMON + "/accounts/delete",
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

// Add_parent_tasks
$(function () {
    $("#account-Delete").on("click", function(e) {
        accountDelete();
    })
  })
