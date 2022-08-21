function plan_submit(form, uuid = null) {
  form.append("email", getLocalStorage("email"));
  if (uuid != null) {
    form.append("uuid", uuid);
  }

  var resultJSON = {};
  $.ajax({
    "url": HOST_URL_TPLANET_DAEMON + "/projects/upload",
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

function plan_info(uuid) {
  var dataJSON = {};

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/projects/info/" + uuid,
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

function list_plan_tasks(uuid, parent) {
  var dataJSON = {};
  var returnDataJSON = {};
  dataJSON.uuid = uuid;
  dataJSON.parent = parent;

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/projects/tasks",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       returnDataJSON = JSON.parse(returnData);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
  return returnDataJSON;
}

function list_plans() {
  // Check required field and save to JSON struct
  var dataJSON = {};
  dataJSON.email = getLocalStorage("email");

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/projects/projects",
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
  return dataJSON;
}

function append_plan_submit_data(page, form) {
  if (page == "cms_plan_info.html") {
    form.append("name", document.getElementById("name").value);
    form.append("project_a", document.getElementById("project_a").value);
    form.append("project_b", document.getElementById("project_b").value);
    form.append("project_start_date", document.getElementById("project_start_date").value);
    form.append("project_due_date", document.getElementById("project_due_date").value);
    form.append("budget", document.getElementById("budget").value);
    form.append("philosophy", document.getElementById("philosophy").value);
  
  } else if (page == "cms_sdgs_setting.html") {
    // Get data
    var list_sdg = new Array(17).fill(0);
    for(var index = 1; index <= 17; index++) {
      if (document.getElementById("sdg_" + index.toString()).checked.toString() == "true") {
        list_sdg[index - 1] = 1;
      }
    }

    // Set local storage
    form.append("list_sdg", list_sdg);
  } else if (page == "cms_impact.html") {
    var dataJSON = {};
    for (var index = 0 ; index <17; index++) {
      // Append to JSON 
      if (document.getElementById("sdg_" + ("0" + (index + 1)).slice(-2) + "_des") == null) {
        continue;
      }
	    dataJSON[index] = document.getElementById("sdg_" + ("0" + (index + 1)).slice(-2) + "_des").value;
      
    }
    // {"0":"透過深度參與豐富指標","11":"定期聚板相關市集","14":"社區友善農業的產銷創生解方"}
    form.append("weight_description", JSON.stringify(dataJSON));
    } else if (page == "cms_contact_person.html") {
      form.append("hoster", document.getElementById("hoster").value);
      form.append("hoster_email", document.getElementById("email").value);
      form.append("org", document.getElementById("org").value);
      form.append("tel", document.getElementById("tel").value);
      var list_location = [0, 0, 0, 0, 0];
      for(var index = 1; index <= 5; index++) {
        if (document.getElementById("location_" + index.toString()).checked.toString() == "true") {
          list_location[index - 1] = 1;
        }
      }
      form.append("list_location", list_location);
    }

  return form;
}