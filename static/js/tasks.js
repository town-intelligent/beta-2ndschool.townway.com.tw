export function get_task_info(uuid) {
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

export function task_submit(form) {
  var resultJSON = {};
  $.ajax({
    "url": HOST_URL_TPLANET_DAEMON + "/tasks/new",
    "method": "POST",
    "async": false,
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}

export function list_children_tasks(task) {
  var dataJSON = {};
  dataJSON.uuid = task;

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/tasks/get_child_tasks",
    type: "POST",
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

  return dataJSON.task;
}

function submitTaskCover(base64Img, uuid_task) {
  var dataJSON = {};
  // dataJSON.email = getLocalStorage("email");
  dataJSON.uuid = uuid_task;
  dataJSON.img = base64Img;
  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/tasks/push_task_cover",
    type: "POST",
    async: true,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
      const obj = JSON.parse(returnData);
    }
  });
}

function onclickuploadTaskCover(uuid) {
  uploadTaskCover(uuid);
}

export function uploadTaskCover(uuid_task) {
  // Get project uuid
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid")

  var file = new FileModal("image/*");

  file.onload = function(base64Img){
    
    // FIXME: Resize to 1 MB
    if (base64Img.length > 1000000) {
      alert("您的圖檔大小需要在 1MB 以下");
      console.log(base64Img);

      return;
    }

    // Submit task cover
    var url_uuid_cover = submitTaskCover(base64Img, uuid_task);
    
    // Update task cover
    document.getElementById("divUploadImg_" + uuid_task).style.backgroundImage =  "";
    document.getElementById("btnUploadImg_" + uuid_task).style.display = "none";
    document.getElementById("coverImg_" + uuid_task).style.backgroundImage =  "url(" + base64Img + ")";
    document.getElementById("coverImg_" + uuid_task).style.backgroundRepeat = "no-repeat";
    document.getElementById("coverImg_" + uuid_task).style.backgroundSize = "100% 100%";
    
    var oDiv = document.getElementById("coverImg_" + uuid_task);
    oDiv.onclick = function() {
      onclickuploadTaskCover(uuid_task);
    }
  
  };
  file.show();
}

export function child_task_submit(page){

  // Get DOM data for parent task
  if (page == "cms_support_form.html" || page == "cms_deep_participation.html") {
    var list_target_sdgs = [];
    var list_tasks = [];
    
    // Get parent uuid
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid")
    var task = urlParams.get("task")

    for (var index = 1; index < 18; index++) {
      var index_sdg = ("0" + index).slice(-2);
      if (document.getElementById("target_sdgs_" + index_sdg) == null) {
        continue;
      }

      // Get SDGs tasks
      var dataJSON = {}; 
      dataJSON.sdg = index;
      dataJSON.des = document.getElementById("target_sdgs_" + index_sdg).value;
      list_tasks.push(JSON.stringify(dataJSON));
    }

    // Set parent task
    var dataJSONTask = {};

    dataJSONTask.task_parent_id = task;
    list_tasks.push(JSON.stringify(dataJSONTask));

    setLocalStorage("list_target_sdgs", JSON.stringify(list_tasks));
 
    // Task submit ...
    var list_target_sdgs = getLocalStorage("list_target_sdgs");
    var obj_list_target_sdgs = JSON.parse(list_target_sdgs);
    var form = new FormData();

    // Add type cms_deep_participation.html
    var type = 0;

    if (page == "cms_deep_participation.html") {
      type = 3;
    }

    if (page == "cms_deep_participation.html") {
      type = 3;
      form.append("name", document.getElementById("name").value);
      form.append("task_start_date", document.getElementById("task_start_date_0").value);
      form.append("task_due_date", document.getElementById("task_due_date_0").value);
    } 

    // Task submit
    form.append("uuid", uuid);
    form.append("tasks", obj_list_target_sdgs);
    form.append("email", getLocalStorage("email"));
    form.append("type", type);

    var obj_result = task_submit(form);
  }
}