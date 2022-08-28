function set_page_info_cms_plan_info(uuid){
    if (uuid != null) {   
        obj_project = plan_info(uuid);
  
        /* Set DOM */
        document.getElementById("name").value = obj_project.name;
        document.getElementById("project_a").value = obj_project.project_a;
        document.getElementById("project_b").value = obj_project.project_b;
        var list_period = [];
        
        try {
          list_period = obj_project.period.split("-");
        } catch (e) {}
        if (list_period.length == 2) {
          document.getElementById("project_start_date").value = list_period[0];
          document.getElementById("project_due_date").value = list_period[1];
        }

        document.getElementById("budget").value = obj_project.budget;
        document.getElementById("philosophy").value = obj_project.philosophy;
      }
}

function submitProjectCover(base64Img, uuid) {
  var resultJSON = {};
  var dataJSON = {};
  // dataJSON.email = getLocalStorage("email");
  dataJSON.uuid = uuid;
  dataJSON.img = base64Img;
  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/projects/push_project_cover",
    type: "POST",
    async: true,
    crossDomain: true,
    data:  dataJSON,
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

function uploadProjectCover() {
  // Params
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid")

  var file = new FileModal("image/png");

  file.onload = function(base64Image){
    
    // TODO: Resize to 1 MB

    // Upload base64 image file
    console.log(base64Image);
    console.log(base64Image.length);
    if (base64Image.length > 1000000) {
      alert("您的圖檔大小需要在 1MB 以下");
      return;
    }
    var obj_project_cover = submitProjectCover(base64Image, uuid);
    var path_cover = HOST_URL_TPLANET_DAEMON + 
    "/static/project/" + uuid + 
    "/media/cover/cover.png";
    document.getElementById("divUploadImg").style.backgroundImage =  "";
    document.getElementById("btnUploadImg").style.display = "none";
    document.getElementById("coverImg").style.backgroundImage =  "url(" + base64Image + ")";
  };
  file.show();
}