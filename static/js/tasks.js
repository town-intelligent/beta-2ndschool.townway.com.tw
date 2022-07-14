function get_task_info(uuid) {
  var dataJSON = {};

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/tasks/get/" + uuid,
    type: "GET",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       dataJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return dataJSON;
}

function parent_task_submit(uuid, task) {
  // Get the last data
  if (getLocalStorage("list_parent_tasks") == "")
    return;

  var dataJSON = {};
  dataJSON.email = getLocalStorage("email");
  dataJSON.uuid = uuid;

  var list_parent_tasks = JSON.parse(getLocalStorage("list_parent_tasks"));
  dataJSON.name = list_parent_tasks[list_parent_tasks.length - 1].parent_task_name;
  dataJSON.task_start_date = list_parent_tasks[list_parent_tasks.length - 1].parent_task_start_date;
  dataJSON.task_due_date = list_parent_tasks[list_parent_tasks.length - 1].parent_task_due_date;
  dataJSON.overview = list_parent_tasks[list_parent_tasks.length - 1].parent_task_overview;
  dataJSON.tasks = task;

  // Submit data
  var parent_task_uuid = 0;
  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/tasks/new",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       parent_task_uuid = returnData;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return parent_task_uuid;
}

function task_submit(form) {

  var settings = {
    "url": HOST_URL_TPLANET_DAEMON + "/tasks/new",
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
