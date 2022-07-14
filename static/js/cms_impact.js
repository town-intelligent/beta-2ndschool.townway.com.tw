function add_sdgs_comment(index) {
    // Format index
    var index = ("0" + index).slice(-2);
  
    // {"0":"指標執行-1","1":"指標執行-1","2":"指標執行-1"}
    var str_weight_description = getLocalStorage("weight_description");
    var obj_weight_description = JSON.parse(str_weight_description);
  
    // Get textedit
    var obj_textedit = document.getElementById("sdg_" + index + "_des");
  
    var index_weight = parseInt(index)-1;
    obj_textedit.innerText = obj_weight_description[ index_weight.toString() ];
  }

function add_sdgs_input(index) {
    // Format index
    var index = ("0" + index).slice(-2);
  
    // Get container
    var obj_sdgs_container = document.getElementById("sdgs_container");
  
    // Create SDGs element
    // <div class="d-flex mt-2">
    var obj_div = document.createElement("div");
    obj_div.className = "d-flex mt-2";
  
    // Create image
    // <img src="/static/imgs/SDGs_11.jpg" alt="" style="width:60px">
    var img = document.createElement("img");
    img.src = "/static/imgs/SDGs_" + index + ".jpg";
    img.setAttribute("width", "60px");
    img.setAttribute("height", "60px");
  
    // Create input
    // <textarea class="form-control ml-3" placeholder="填寫符合此指標的執行方式" style="resize: none"></textarea>
    var obj_textarea = document.createElement("textarea");
    obj_textarea.id = "sdg_" + index + "_des";
    obj_textarea.className = "form-control ml-3";
    obj_textarea.placeholder = "填寫符合此指標的執行方式";
    obj_textarea.style = "resize: none";
  
    // Append
    obj_div.appendChild(img);
    obj_div.appendChild(obj_textarea);
    obj_sdgs_container.append(obj_div);
  }
  
function add_social_impact_chkbox() {
  // Load social impact items
  var cms_plan_list_sdg = getLocalStorage("cms_plan_list_sdg");
  var list_cms_plan_list_sdg = cms_plan_list_sdg.split(",");

  for (var index = 0 ; index <17; index++) {
    if (list_cms_plan_list_sdg[index] == "1") {
      add_sdgs_input(index + 1);
      
      // Check if this page redirect from add task flow
      var str_weight_description = getLocalStorage("weight_description");
      if (str_weight_description != "") {
        add_sdgs_comment(index + 1);
      }
    }
  }
}

function set_page_info_cms_impact(uuid) {
    var index_parent_task_start_date_ = 0;
    while (true) {
      if (document.getElementById("parent_task_start_date_" + index_parent_task_start_date_) == null)
	    break;

      $("#parent_task_start_date_" + index_parent_task_start_date_).datepicker();
      $("#parent_task_due_date_" + index_parent_task_start_date_).datepicker();
      
      index_parent_task_start_date_ ++;
    }

    // Add parent task info
    if (getLocalStorage("list_parent_tasks") != "") {
      var list_parent_tasks = JSON.parse(getLocalStorage("list_parent_tasks"));
    
      for (var index = 0; index < list_parent_tasks.length; index++) {
        document.getElementById("parent_task_name_" + index).value = list_parent_tasks[index].parent_task_name;
        document.getElementById("parent_task_start_date_" + index).value = list_parent_tasks[index].parent_task_start_date;
        document.getElementById("parent_task_due_date_" + index).value = list_parent_tasks[index].parent_task_due_date;
        document.getElementById("parent_task_overview_" + index).value = list_parent_tasks[index].parent_task_overview;
      }
    }

    add_social_impact_chkbox();
  
    // Get project data
    if (uuid != null) {
      // Set project sdgs
      var obj_project = plan_info(uuid);
      var obj_weight_description = JSON.parse(obj_project.weight_description);
      Object.keys(obj_weight_description).forEach(function(key) {
        // Create SDGs
        add_sdgs_input(parseInt(key)+1);

        var sdg_index = ("0" + (parseInt(key)+1).toString()).slice(-2);
        document.getElementById("sdg_" + sdg_index + "_des").value = obj_weight_description[key];
      })

      // Set parent tasks
      var obj_list_parent_tasks = list_plan_tasks(uuid, 1);
      var list_parent_tasks = obj_list_parent_tasks.tasks;

      for (var index = 0; index<list_parent_tasks.length; index++) {
        // Get project
        var obj_task = get_task_info(list_parent_tasks[index]);

        // Parent project
        document.getElementById("parent_task_name_" + index).value = obj_task.name;
        var period = obj_task.period.split("-");
        document.getElementById("parent_task_start_date_" + index).value = period[0];
        document.getElementById("parent_task_due_date_" + index).value = period[1];
        document.getElementById("parent_task_overview_" + index).value = obj_task.overview;

        // TODO: Fix parent uuid
        var obj_ = document.getElementById("btn_cms_plan_add_parent_tasks");
        obj_btn_cms_plan_add_parent_tasks.name = obj_task.uuid;

        // btnUploadImg
        var obj_btnUploadImg = document.getElementById("btnUploadImg");
        obj_btnUploadImg.name = obj_task.uuid;

      }
    }
  }

// TODO: Add_parent_tasks
$(function () {
  $("#add_parent_tasks").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)
    // alert("hello, add_parent_tasks");
  })
})

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
      if (obj.result) {
        console.log("OK");
      } else {
        console.log("False");
      }
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function uploadTaskCover() {
  // Params
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid")

  var file = new FileModal("image/png");

  file.onload = function(d){
    if (uuid == "" || uuid == null){
      console.log("TODO: submit plan ...");
      // TODO: submit plan
      // update uuid
    }

    // TODO: Resize to 1 MB

    // Upload base64 image file
    if (d.length > 1000000) {
      alert("您的圖檔大小需要在 1MB 以下");
      return;
    }

    // TODO: submit task cover
    var uuid_task = document.getElementById("btn_cms_plan_add_parent_tasks").name;
    // alert(uuid_task);
    submitTaskCover(d, uuid_task);
    
    // TODO: update task cover
    var path_cover = HOST_URL_TPLANET_DAEMON + 
    "/static/project/" + uuid + 
    "/tasks/" + uuid_task + "/cover.png";
    document.getElementById("divUploadImg").style.backgroundImage =  "";
    document.getElementById("btnUploadImg").style.display = "none";
    document.getElementById("coverImg").style.backgroundImage =  "url(" + path_cover + ")";
  };
  file.show();
}