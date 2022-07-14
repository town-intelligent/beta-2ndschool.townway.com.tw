const cms_project_submit_pages = ["cms_plan_info.html", "cms_sdgs_setting.html", "cms_impact.html", "cms_contact_person.html"];
const cms_support_format = ["cms_missions_display.html", "cms_support_form.html", "cms_deep_participation.html"]

function set_local_storage(page){
  if (page == "cms_plan_info.html") {
    // Get data
    var name = document.getElementById("name").value;
    var project_a = document.getElementById("project_a").value;
    var project_b = document.getElementById("project_b").value;
    var project_start_date = document.getElementById("project_start_date").value;
    var project_due_date = document.getElementById("project_due_date").value;
    var budget = document.getElementById("budget").value;
    var philosophy = document.getElementById("philosophy").value;

    // Set local storage
    setLocalStorage("cms_plan_name", name); 
    setLocalStorage("cms_plan_project_a", project_a); 
    setLocalStorage("cms_plan_project_b", project_b);
    setLocalStorage("cms_plan_project_start_date", project_start_date); 
    setLocalStorage("cms_plan_project_due_date", project_due_date); 
    setLocalStorage("cms_plan_budget", budget); 
    setLocalStorage("cms_plan_philosophy", philosophy); 
  }

  if (page == "cms_sdgs_setting.html") {
    // Get data
    var list_sdg = new Array(17).fill(0);
    for(var index = 1; index <= 17; index++) {
      if (document.getElementById("sdg_" + index.toString()).checked.toString() == "true") {
        list_sdg[index - 1] = 1;
      }
    }

    // Set local storage
    setLocalStorage("cms_plan_list_sdg", list_sdg);
  }

  if (page == "cms_impact.html") {
    // Load social impact items and save to local storage
    var cms_plan_list_sdg = getLocalStorage("cms_plan_list_sdg");
    var list_cms_plan_list_sdg = cms_plan_list_sdg.split(",");

    var dataJSON = {};
    for (var index = 0 ; index <17; index++) {
      if (list_cms_plan_list_sdg[index] == "1") {
	      // Append to JSON 
	      dataJSON[index] = document.getElementById("sdg_" + ("0" + (index + 1)).slice(-2) + "_des").value;
      }
    }

    // Get DOM
    var obj_parent_task_name = document.getElementById("parent_task_name_0").value;
    var obj_task_start_date = document.getElementById("parent_task_start_date_0").value;
    var obj_task_due_date = document.getElementById("parent_task_due_date_0").value;
    var obj_overview = document.getElementById("parent_task_overview_0").value;
    
    /* Set to localstorage */
    setLocalStorage("weight_description", JSON.stringify(dataJSON));

    // For parent task
    var list_parent_tasks = [];
    var JSONdata = {};

    // Append data to parent task list
    // TODO: Add parent tasks counter
    var index = 0;
    while (true) {
      if (document.getElementById("parent_task_name_" + index) == null) {
        break;
      }

      JSONdata.parent_task_name = document.getElementById("parent_task_name_" + index).value;
      JSONdata.parent_task_start_date = document.getElementById("parent_task_start_date_" + index).value;
      JSONdata.parent_task_due_date = document.getElementById("parent_task_due_date_" + index).value;
      JSONdata.parent_task_overview = document.getElementById("parent_task_overview_" + index).value;

      list_parent_tasks.push(JSONdata);
      setLocalStorage("list_parent_tasks", JSON.stringify(list_parent_tasks));
    
      index ++;
    }

    /* Set to localstorage */
  }

  // Get DOM data for parent task
  if (page == "cms_support_form.html" || page == "cms_deep_participation.html") {
    var list_target_sdgs = [];
    var list_tasks = [];
    
    // Get parent uuid
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    uuid = urlParams.get("uuid")
    task = urlParams.get("task")

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
    var form = new FormData();
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

    task_submit(form);
  }

  if (page == "cms_contact_person.html") {
    // Get data
    var hoster = document.getElementById("hoster").value;
    var email = document.getElementById("email").value;
    var org = document.getElementById("org").value;
    var tel = document.getElementById("tel").value;
    var list_location = [0, 0, 0, 0, 0];
    for(var index = 1; index <= 5; index++) {
      if (document.getElementById("location_" + index.toString()).checked.toString() == "true") {
        list_location[index - 1] = 1;
      }
    }

    // Set local storage
    setLocalStorage("cms_plan_hoster", hoster);
    setLocalStorage("cms_plan_email", email);
    setLocalStorage("cms_plan_org", org);
    setLocalStorage("cms_plan_tel", tel);
    setLocalStorage("cms_plan_list_location", list_location);
  }
}

$(function () {
  $("#add_c_project").on("click", function(event) {
    event.preventDefault();
    window.location.replace("/backend/cms_plan_info.html"); 
  });
});

function get_page_index(page) {
  // FIXME: Hard coding for cms_support_format
  for (var index = 0; index < cms_support_format.length; index++) {
    if (page == cms_support_format[index]) {
	  return 1
    }
  }
  
  for (var index = 0; index < cms_project_submit_pages.length; index++) {
    if (page == cms_project_submit_pages[index])
          return index
  }
  return null
}

function get_index_page(index) {
  return cms_project_submit_pages[index];
}

// Previous page
$(function () {
  $("#btn_ab_project_prev").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Get index
    var index = get_page_index(page);

    // Replace page
    if (index > 0)
      window.location.replace(get_index_page(index - 1));
    else
      window.location.replace(get_index_page(0));
  });
});

// Submit to next page
$(function () {
  $("form").on("submit", function(e){
    e.preventDefault();

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Get parent uuid
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    uuid = urlParams.get("uuid")
    task = urlParams.get("task")

    // Set local storage
    set_local_storage(page);

    // Get index
    var index = get_page_index(page);

    // Set params
    var param = "";
    if (uuid != null) {
      param = param + "?uuid=" + uuid;
    }
    if (task != null) {
      param = param + "&task=" + task;
    }

    // Replace page
    if (index < cms_project_submit_pages.length - 1) {
      var next_page = get_index_page(index + 1);
      window.location.replace("/backend/" + next_page + param);
    } else {
      window.location.replace("/backend/" + get_index_page(cms_project_submit_pages.length - 1) + param);
    }

    // Submit
    if (page == "cms_contact_person.html") {
      var uuid_project = null;
      if (getLocalStorage("uuid_project") != "") {
        uuid_project = getLocalStorage("uuid_project");

        plan_submit(uuid_project);
      }

      // Redirect
      window.location.replace("/backend/cms_project_detail.html?uuid=" + uuid_project);
    }
  });
});

$(function () {
  $("#btn_cms_plan_save").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Set localstorage
    set_local_storage(page)

    // Submit
    var uuid_project = null;
    if (getLocalStorage("uuid_project") != "") {
      uuid_project = getLocalStorage("uuid_project");
    }

    var uuid = plan_submit(uuid_project);
    setLocalStorage("uuid_project", uuid);

    alert("儲存成功");
  });
});

$(function () {
  $("#btn_cms_plan_preview").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Set localstorage
    set_local_storage(page)

    // Submit
    var uuid_project = null;
    if (getLocalStorage("uuid_project") != "") {
      uuid_project = getLocalStorage("uuid_project");
    }

    var uuid = plan_submit(uuid_project);
    setLocalStorage("uuid_project", uuid);

    // New preview window
    window.open("/backend/cms_project_detail.html?uuid=" + uuid);
  });
});

$(function () {
  $("#btn_cms_plan_add_parent_tasks").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Create parent UUID
    var task = null;

    if (this.name != "") {
      task = this.name;
    } 

    // Set localstorage
    set_local_storage(page)

    // Submit
    var uuid_project = null;
    if (getLocalStorage("uuid_project") != "") {
      uuid_project = getLocalStorage("uuid_project");
    }

    var uuid_plan = plan_submit(uuid_project);
    setLocalStorage("uuid_project", uuid_plan);

    // Parent task submit
    if (this.name == "") {
      task = parent_task_submit(uuid_plan, task); 
    }

    // Redirect to add parent window
    window.location.replace("/backend/cms_missions_display.html?uuid=" + uuid_plan + "&task=" + task);
  });
});

// btn_cms_plan_add_form_task
$(function () {
  $("#btn_cms_plan_add_form_task").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Path
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var url = new URL(window.location.href);
    // Params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    uuid = urlParams.get("uuid")
    task = urlParams.get("task")

    // Set localstorage
    set_local_storage(page)

    // Submit
    var uuid_project = null;
    if (getLocalStorage("uuid_project") != "") {
      uuid_project = getLocalStorage("uuid_project");
    }

    var uuid = plan_submit(uuid_project);
    setLocalStorage("uuid_project", uuid);

    // Redirect to add parent window
    window.location.replace("/backend/cms_support_form.html?uuid=" + uuid + "&task=" + task);
  });
});

// btn_cms_plan_add_deep_task
$(function () {
  $("#btn_cms_plan_add_deep_task").on("click", function(e) {
    e.preventDefault(); // To prevent following the link (optional)

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Get Parent uuid
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    task = urlParams.get("task")

    // Set localstorage
    set_local_storage(page)

    // Submit
    var uuid_project = null;
    if (getLocalStorage("uuid_project") != "") {
      uuid_project = getLocalStorage("uuid_project");
    }

    var uuid = plan_submit(uuid_project);
    setLocalStorage("uuid_project", uuid);

    // Redirect to add parent window
    window.location.replace("/backend/cms_deep_participation.html?uuid=" + uuid + "&task=" + task);
  });
});

// btn sdg trigger
$(function () {
  $("[id='btn_sdg']").on("click", function(e) {
    e.stopPropagation();
    var obj_name = $(this).attr("name");

    for(var index = 1; index <= 17; index++) {
      var index_sdg = "";
      if (index  < 10) {
        index_sdg = ("0" + index).slice(-2);
      } else {
        index_sdg = index;
      }

      document.getElementsByName(index_sdg.toString())[0].style.backgroundColor = "";
    }

    // Set task sdgs
    document.getElementsByName(obj_name)[0].style.backgroundColor = "gray";
    setLocalStorage("target_sdgs", obj_name);
  });
});

// btn_add_sdg_into_task
$(function () {
  $("#btn_add_sdg_into_task").on("click", function(e) {
    e.stopPropagation();
    var list_target_sdgs = [];
    if (getLocalStorage("list_target_sdgs") != "") {
      list_target_sdgs = getLocalStorage("list_target_sdgs").split(",");
    }
    
    list_target_sdgs.push(getLocalStorage("target_sdgs"));

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    // Show widget
    var obj_sdgs_container = document.getElementById("sdgs_container");

    if (page == "cms_support_form.html") {

      // Create SDGs element - row
      // <div class="row align-items-center justify-content-center mt-4">
      var obj_div_row = document.createElement("div");
      obj_div_row.className = "row align-items-center justify-content-center mt-4";

      // Create image
      // <img class="col-3 col-md-1" src="/static/imgs/SDGs_04.jpg" alt="">
      var obj_img = document.createElement("img");
      obj_img.className = "col-3 col-md-1";
      obj_img.src = "/static/imgs/SDGs_" + getLocalStorage("target_sdgs") + ".jpg";
      obj_img.setAttribute("width", "49px");
      obj_img.setAttribute("height", "49px");

      // Create label
      // <label class="col-3 col-md-1 col-form-label pr-0">支持，</label>
      var obj_label = document.createElement("label");
      obj_label.className = "col-3 col-md-1 col-form-label pr-0";
      obj_label.innerHTML = "支持，";

      // Create div_child
      // <div class="mt-3 mt-md-0 col-md-10 pl-md-0">
      var obj_div_child = document.createElement("div");
      obj_div_child.className = "mt-3 mt-md-0 col-md-10 pl-md-0";

      // Create input
      // <input type="text" class="form-control" placeholder="SDG 15 陸地生態保育，請留下您的支持評論。">
      var obj_input = document.createElement("input");
      obj_input.id = "target_sdgs_" + getLocalStorage("target_sdgs");
      obj_input.type = "text";
      obj_input.className = "form-control";
      obj_input.placeholder = "請留下您的支持評論。"

      // Append
      obj_div_child.append(obj_input);
    
      obj_div_row.append(obj_img);
      obj_div_row.append(obj_label);
      obj_div_row.append(obj_div_child);
      obj_sdgs_container.append(obj_div_row);
    }

    if (page == "cms_deep_participation.html") {
      // id = icon_container
      var obj_icon_container = document.getElementById("icon_container");
      
      // <a class="d-block">
      var obj_a = document.createElement("a");
      obj_a.className = "d-block";

      // <img class="mr-3" src="/static/imgs/SDGs_04.jpg" alt="" style="width:60px">
      var obj_img = document.createElement("img");
      obj_img.id = "target_sdgs_" + getLocalStorage("target_sdgs");
      obj_img.className = "mr-3";
      obj_img.src = "/static/imgs/SDGs_" + getLocalStorage("target_sdgs") + ".jpg";
      obj_img.alt = "";
      obj_img.style = "width:60px";

      // Append
      obj_a.append(obj_img);
      obj_icon_container.append(obj_a);
    }
	  
    // Finish
    $("#SDGsModal").modal("hide");
  });
});

function set_page_info_cms_agent(uuid){
  /* Create DOM */
  var list_project_obj = list_plans();
  var list_project_uuids = list_project_obj.projects;
  //  <div id="project_list">
  var obj_project_list = document.getElementById("project_list");

  for (var index = 0; index < list_project_uuids.length; index++) {
    // Get project info
    var obj_project = plan_info(list_project_uuids[index]);

    // <div class="row mt-5 mb-4">
    var obj_div_root = document.createElement("div"); 
    obj_div_root.className = "row mt-5 mb-4";
    
    // <div class="col-12 d-md-none">
    var obj_div_project_list = document.createElement("div"); 
    obj_div_project_list.className = "col-12 d-md-none";
    
    // <p class="h4">專案列表</p>
    var obj_p_project_list = document.createElement("p");
    obj_p_project_list.className = "h4";
    obj_p_project_list.innerHTML = "專案列表";
    
    // Append
    obj_div_project_list.append(obj_p_project_list);
    obj_div_root.append(obj_div_project_list);
    
    // <div class="col-md-4 mt-4">
    var obj_div_col_md_4 = document.createElement("div");
    obj_div_col_md_4.className = "col-md-4 mt-4";
    
    // <div class="card mb-4 rounded-0">
    var obj_div_card_md4 = document.createElement("div");
    obj_div_card_md4.className = "card mb-4 rounded-0";

    obj_div_card_md4.addEventListener('click', function() {
      location.href = location.protocol + "//" + 
        window.location.host + 
        "/backend/cms_project_detail.html?uuid=" + 
        obj_project.uuid;
    }, true);


    // <div class="d-flex justify-content-center">
    var obj_div_d_flex = document.createElement("div");
    obj_div_d_flex.className = "d-flex justify-content-center";

    // <div class="img-fluid bg-cover" style="background-image:url(/static/imgs/project_img_02.png); width:100% ;height:200px"></div>
    var obj_project_img = document.createElement("div");
    obj_project_img.className = "img-fluid bg-cover";
    // obj_project_img.style = "background-image:url(/static/imgs/project_img_02.png); width:100% ;height:200px";
    var path_cover = HOST_URL_TPLANET_DAEMON + 
    "/static/project/" + obj_project.uuid + 
    "/media/cover/cover.png";
    obj_project_img.style = "background-image:url(" + path_cover + "); width:100% ;height:200px";
    
    // Append
    obj_div_d_flex.append(obj_project_img);
    obj_div_card_md4.append(obj_div_d_flex);
    obj_div_col_md_4.append(obj_div_card_md4);
    obj_div_root.append(obj_div_col_md_4);

    var obj_div_card_body_project = document.createElement("div");
    obj_div_card_body_project.className = "card-body d-flex flex-column";
    
    // <p class="h5">竹山創生輔導合作計畫</p>
    var obj_p_project_name = document.createElement("p");
    obj_p_project_name.className = "h5";
    obj_p_project_name.innerHTML = obj_project.name;

    // Append
    obj_div_card_body_project.append(obj_p_project_name);
    obj_div_card_md4.append(obj_div_card_body_project);

    // <p class="card-text mt-4">永續企業:<span class="pl-2">永鑫能源<span></p>
    var obj_p_project_a = document.createElement("p");
    obj_p_project_a.className = "card-text mt-4";
    obj_p_project_a.innerHTML = "永續企業: ";
    var obj_span_project_a = document.createElement("span");
    obj_span_project_a.className = "pl-2";
    obj_span_project_a.innerHTML = obj_project.project_a;//"永鑫能源";

    // Append
    obj_p_project_a.append(obj_span_project_a);
    obj_div_card_body_project.append(obj_p_project_a);
    //obj_div_card_md4.append(obj_div_card_body_project);

    // <p class="card-text">地方團隊:<span class="pl-2">元泰竹藝社、台灣長虹、東埔蚋溪環境保護協會<span></p>
    var obj_p_project_b = document.createElement("p");
    obj_p_project_b.className = "card-text";
    obj_p_project_b.innerHTML = "地方團隊: ";
    var obj_span_project_b = document.createElement("span");
    obj_span_project_b.className = "pl-2";
    obj_span_project_b.innerHTML = obj_project.project_b;//"元泰竹藝社、台灣長虹、東埔蚋溪環境保護協會";

    // Append
    obj_p_project_b.append(obj_span_project_b);
    obj_div_card_body_project.append(obj_p_project_b);
    //obj_div_card_md4.append(obj_div_card_body_project);

    // <p class="card-text">期間:<span class="pl-2">2021.08.01~2022.07.31<span></p>
    var obj_p_period = document.createElement("p");
    obj_p_period.className = "card-text";
    obj_p_period.innerHTML = "期間: ";
    var obj_span_period = document.createElement("span");
    obj_span_period.className = "pl-2";
    obj_span_period.innerHTML = obj_project.period;//"2021.08.01~2022.07.31";

    // Append
    obj_p_period.append(obj_span_period);
    obj_div_card_body_project.append(obj_p_period);

    // <div class="row mt-3"> 
    var obj_sdg_container = document.createElement("div");
    obj_sdg_container.className = "row mt-3";
    var obj_sdg_div = document.createElement("div");
    obj_sdg_div.className = "col-2 pr-0";
    var obj_a = document.createElement("a");
    obj_a.href = "#";
    var obj_sdg_img = document.createElement("img");
    obj_sdg_img.className = "w-100";
    obj_sdg_img.src = "/static/imgs/SDGs_04.jpg";
    obj_sdg_img.alt = "";

    // Append
    obj_a.append(obj_sdg_img);
    obj_sdg_div.append(obj_a);
    obj_sdg_container.append(obj_sdg_div);
    obj_div_card_body_project.append(obj_sdg_container);

    // <a href="#" class="stretched-link"></a>
    var obj_stretched = document.createElement("a");
    obj_stretched.href = "#";
    obj_stretched.className = "stretched-link";

    // Append
    obj_div_card_md4.append(obj_stretched);

    // <div class="col-12 d-md-none">
    var obj_div_digital_fp = document.createElement("div");
    obj_div_digital_fp.className = "col-12 d-md-none";
    var obj_p_digital_fp = document.createElement("p");
    obj_p_digital_fp.className = "h4";
    obj_p_digital_fp.innerHTML = "數位足跡";

    // Append
    obj_div_digital_fp.append(obj_p_digital_fp);
    obj_div_root.append(obj_div_digital_fp);

    // <div class="col-md-4">
    var obj_digital_fp_chart1 = document.createElement("div");
    obj_digital_fp_chart1.className = "col-md-4";
    // <div class="card h-100 border-0">
    var obj_digital_fp_chart1_card = document.createElement("div");
    obj_digital_fp_chart1_card.className = "card h-100 border-0";

    // <div class="card-body h-100 d-flex flex-column justify-content-between text-center">
    var obj_digital_fp_chart1_card_body = document.createElement("div");
    obj_digital_fp_chart1_card_body.className = "card-body h-100 d-flex flex-column justify-content-between text-center";
    // <img src="/static/imgs/agent_foot_print.png" class="card-img-top" alt="">
    var obj_digital_fp_chart1_img = document.createElement("img");
    obj_digital_fp_chart1_img.src = "/static/imgs/agent_foot_print.png";
    obj_digital_fp_chart1_img.className = "card-img-top";
    obj_digital_fp_chart1_img.alt = "";
    // <div>
    var obj_div_btn_mf = document.createElement("div");
    // <a href="#" class="btn btn-primary d-none d-md-block">修改表單</a>
    var obj_a_d_md_block_mf = document.createElement("a");
    obj_a_d_md_block_mf.href = location.protocol + "//" + window.location.host + "/backend/cms_plan_info.html?uuid=" + obj_project.uuid;
    obj_a_d_md_block_mf.className = "btn btn-primary d-none d-md-block";
    obj_a_d_md_block_mf.innerHTML = "修改表單";
    // <a href="#" class="btn btn-primary btn-block d-md-none">修改表單</a>
    var obj_a_d_md_none_mf = document.createElement("a");
    obj_a_d_md_none_mf.href = location.protocol + "//" + window.location.host + "/backend/cms_plan_info.html?uuid=" + obj_project.uuid; 
    obj_a_d_md_none_mf.className = "btn btn-primary btn-block d-md-none";
    obj_a_d_md_none_mf.innerHTML = "修改表單";

    // Append
    obj_div_btn_mf.append(obj_a_d_md_block_mf);
    obj_div_btn_mf.append(obj_a_d_md_none_mf);
    obj_digital_fp_chart1_card_body.append(obj_digital_fp_chart1_img);
    obj_digital_fp_chart1_card_body.append(obj_div_btn_mf);
    obj_digital_fp_chart1_card.append(obj_digital_fp_chart1_card_body);
    obj_digital_fp_chart1.append(obj_digital_fp_chart1_card);
    obj_div_root.append(obj_digital_fp_chart1);

    // <div class="col-md-4">
    var obj_div_add_task = document.createElement("div");
    obj_div_add_task.className = "col-md-4";
    // <div class="card h-100 border-0"> 
    var obj_div_add_task_card = document.createElement("div");
    obj_div_add_task_card.className = "card h-100 border-0";
    // <div class="card-body h-100 d-flex flex-column justify-content-between text-center"> 
    var obj_div_add_task_card_body = document.createElement("div");
    obj_div_add_task_card_body.className = "card-body h-100 d-flex flex-column justify-content-between text-center";
    // <img src="/static/imgs/agent_chart.png" class="card-img-top" alt="">
    var obj_div_add_task_img = document.createElement("img");
    obj_div_add_task_img.src = "/static/imgs/agent_chart.png";
    obj_div_add_task_img.className = "card-img-top";
    obj_div_add_task_img.alt = "";
    // <div> 
    var obj_div_btn_nt = document.createElement("div");
    // <a href="#" class="btn btn-primary d-none d-md-block">新增任務</a>
    var obj_a_btn_d_d_block_nt = document.createElement("a");
    obj_a_btn_d_d_block_nt.href = location.protocol + "//" + window.location.host + 
      "/backend/cms_impact.html?uuid=" + obj_project.uuid; 
    obj_a_btn_d_d_block_nt.className = "btn btn-primary d-none d-md-block";
    obj_a_btn_d_d_block_nt.innerHTML = "新增任務";
    // <a href="#" class="btn btn-primary btn-block d-md-none">新增任務</a>
    var obj_a_btn_d_d_none_nt = document.createElement("a");
    obj_a_btn_d_d_none_nt.href = location.protocol + "//" + window.location.host + 
      "/backend/cms_impact.html?uuid=" + obj_project.uuid; 
    obj_a_btn_d_d_none_nt.className = "btn btn-primary btn-block d-md-none";
    obj_a_btn_d_d_none_nt.innerHTML = "新增任務";

    // Apend
    obj_div_btn_nt.append(obj_a_btn_d_d_block_nt);
    obj_div_btn_nt.append(obj_a_btn_d_d_none_nt);
    obj_div_add_task_card_body.append(obj_div_add_task_img);
    obj_div_add_task_card_body.append(obj_div_btn_nt);
    obj_div_add_task_card.append(obj_div_add_task_card_body);
    obj_div_add_task.append(obj_div_add_task_card);
    obj_div_root.append(obj_div_add_task);

    /* Append */
    obj_project_list.append(obj_div_root);
  }
  /* Create DOM */
}
