function plan_submit(uuid = null) {
  // Check required field and save to JSON struct
  var dataJSON = {};

  if (uuid != null) {
    dataJSON.uuid = uuid
  }

  dataJSON.email = getLocalStorage("email");
  dataJSON.name = getLocalStorage("cms_plan_name");
  dataJSON.project_a = getLocalStorage("cms_plan_project_a");
  dataJSON.project_b = getLocalStorage("cms_plan_project_b");
  dataJSON.project_start_date = getLocalStorage("cms_plan_project_start_date");
  dataJSON.project_due_date = getLocalStorage("cms_plan_project_due_date");
  dataJSON.budget = getLocalStorage("cms_plan_budget");
  dataJSON.philosophy = getLocalStorage("cms_plan_philosophy");
  dataJSON.list_sdg = getLocalStorage("cms_plan_list_sdg");
  dataJSON.weight_description = getLocalStorage("weight_description");
  dataJSON.hoster_email = getLocalStorage("cms_plan_email");
  dataJSON.hoster = getLocalStorage("cms_plan_hoster");
  dataJSON.org = getLocalStorage("cms_plan_org");
  dataJSON.tel = getLocalStorage("cms_plan_tel");
  dataJSON.list_location = getLocalStorage("cms_plan_list_location");

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/projects/upload",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       dataJSON.uuid = obj.uuid;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
  return dataJSON.uuid;
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

