import { draws, draws_task_weight_chart } from './app.js'
import { plan_info, list_plan_tasks, getProjectWeight } from './plan.js'
import { get_task_info, list_children_tasks } from './tasks.js'

function project_weight_chart(obj_project) {
  var obj_digital_fp_chart1_img = document.createElement("div");
  obj_digital_fp_chart1_img.id = "observablehq-chart-" + obj_project.uuid;
  document.getElementById("obj_digital_fp_chart1").append(obj_digital_fp_chart1_img);

  // Draw
  draws(obj_project.uuid)
}

function task_weight_chart(obj_task) {
  var obj_digital_fp_chart1_img = document.createElement("div");
  obj_digital_fp_chart1_img.id = "observablehq-chart-" + obj_task.uuid;
  document.getElementById("obj_digital_fp_chart1").append(obj_digital_fp_chart1_img);

  // Draw
  draws_task_weight_chart(obj_task.uuid)
}

function set_location(obj_project) {
  // Location
  var list_location = [];
  
  try {
    list_location = obj_project.location.split(",");
  } catch (e) {}
  
  // Location
  var obj_location = document.getElementById("location");
  for (var index = 0; index < list_location.length; index ++) {
    if (parseInt(list_location[index]) == 1) {
      if (index == 0) {
        obj_location.innerHTML = obj_location.innerHTML + "T-Planet @ 台北";
      } else if (index == 1){
        obj_location.innerHTML = "T-Planet @ 竹山";
      } else if (index == 2){
        obj_location.innerHTML = obj_location.innerHTML + "T-Planet @ 高雄";
      } else if (index == 3){
        obj_location.innerHTML = obj_location.innerHTML + "T-Planet @ 花蓮";
      } else {
        obj_location.innerHTML = obj_location.innerHTML + "T-Planet @ 馬祖";
      }
    }
  }
}

function relate_people(obj_tasks) {
  var obj_project_relate_people = document.getElementById("relate_people");

  var list_weight = getProjectWeight(obj_tasks.tasks);

  var total_weight = 0;
  for(var key in list_weight){
    total_weight = total_weight + parseInt(list_weight[key]);
  }

  obj_project_relate_people.innerHTML = total_weight;
}

function add_task_sdgs(obj_task) {
  // Get child tasks
  var list_child_tasks = list_children_tasks(obj_task.uuid);

  // Get content of child tasks
  if (list_child_tasks.length == 0) {
    return null;
  }

  // SDGs element
  var obj_sdg_div = document.createElement("div");

  // Append content to result element
  for (var index = 0; index < list_child_tasks.length; index++) {
    var obj_child_task = get_task_info(list_child_tasks[index]);

    // Create SDGs icon
    for (var index_sdg = 1; index_sdg <= 17; index_sdg++) {
      var obj_content = JSON.parse(obj_child_task.content);

      if (parseInt(obj_content["sdgs-" + index_sdg]) == 1) {
        var obj_img_p = document.createElement("p");
        var obj_img = document.createElement("img");
        obj_img.className = "mr-2";
        
        if (index_sdg < 10) {
          obj_img.src = "/static/imgs/SDGs_0" + index_sdg + ".jpg"; 
        } else {
          obj_img.src = "/static/imgs/SDGs_" + index_sdg + ".jpg"; 
        }
      
        obj_img.alt = "";
        obj_img.style = "width: 30px";
        obj_sdg_div.append(obj_img); 
      }
    }
  } 

  return obj_sdg_div;
}

function add_project_sdgs_description(obj_project) {
  var obj_weight_description = document.getElementById("project_weight_description");

  var list_weight = null;
  try {
    list_weight = JSON.parse(obj_project.weight_description);
    Object.keys(list_weight).forEach(function(key) {
      var index = parseInt(key) + 1;
      index = ("0" + index).slice(-2);

      var obj_div = document.createElement("div");
      obj_div.className = "col-md-12 ml-3";

      var obj_p = document.createElement("p");
      obj_p.className = "mt-3";
      /* obj_p.innerHTML = list_weight[key]; */

      var obj_a = document.createElement("a");
      obj_a.innerHTML = list_weight[key];
      
      var obj_img = document.createElement("img");
      obj_img.className = "mr-3";
      obj_img.style = "width:90px";
      obj_img.src = "/static/imgs/SDGs_" + index + ".jpg";
      obj_img.alt = "";

      obj_p.append(obj_img);
      obj_p.append(obj_a);
      obj_div.append(obj_p);
      obj_weight_description.append(obj_div);
    })
  } catch(e) { console.log(e); }
}

function add_project_sdgs(obj_project) {
  var obj_sdgs_container = document.getElementById("project_sdg_container");

  var list_weight = [];

  try {
    list_weight = obj_project.weight.split(",");
  } catch (e) {}
  
  for (var index = 0; index < list_weight.length; index++) {
    // Append to DOM
    if (parseInt(list_weight[index]) == 1) {

      // <div class="col-2 col-md-1 pr-0">
      var obj_div = document.createElement("div");
      obj_div.className = "col-2 col-md-1 pr-0";

      // <a href="#">
      var obj_a = document.createElement("p");
      obj_a.href = "#"
    
      // <img class="w-100" src="/static/imgs/SDGs_04.jpg" alt="">
      var obj_img = document.createElement("img");
      obj_img.className = "w-100";
      obj_img.src = "/static/imgs/SDGs_" + ("0" + (index + 1)).slice(-2) + ".jpg";
      obj_img.alt = "";
    
      // Append
      obj_a.append(obj_img);
      obj_div.append(obj_a);
      obj_sdgs_container.append(obj_div);
    }
  }
}

export function set_page_info_content()
{ 
  // Get path
  var path = window.location.pathname;

  // Get parent uuid
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid")

  var obj_project = plan_info(uuid);

  // Project data

  /* document.getElementById("project_cover") */

  // Set cover
  if (obj_project.img != null) { 
    var path_cover = HOST_URL_TPLANET_DAEMON + 
    "/static/project/" + uuid + 
    "/media/cover/cover.png";
    var obj_cover = document.getElementById("project_cover");
    obj_cover.src = path_cover;
  }

  document.getElementById("project_name").innerHTML = obj_project.name;
  document.getElementById("project_period").innerHTML = obj_project.period;
  document.getElementById("project_uuid").innerHTML = "計畫編號: " + obj_project.uuid;
  document.getElementById("hoster").innerHTML = obj_project.hoster;
  document.getElementById("project_a").innerHTML = obj_project.project_a;
  document.getElementById("project_b").innerHTML = obj_project.project_b;
  document.getElementById("email").innerHTML = obj_project.email;
  document.getElementById("philosophy").innerHTML = obj_project.philosophy;
  document.getElementById("budget").innerHTML = obj_project.budget;

  // Location
  set_location(obj_project);

  // Project weight
  add_project_sdgs(obj_project);

  // Project weight descriptio11n
  add_project_sdgs_description(obj_project);

  // Task data
  var obj_tasks = list_plan_tasks(obj_project.uuid ,1);

  // Relate people
  relate_people(obj_tasks);

  project_weight_chart(obj_project);

  var list_tasks = obj_tasks.tasks;
  var obj_tasks_container = document.getElementById("tasks_container");

  for (var index = 0; index < list_tasks.length; index++) {
    var obj_task = get_task_info(list_tasks[index]);
  
    // Task container
    var obj_div_root = document.createElement("div") 
    obj_div_root.className = "row mt-4 mt-md-5 mb-3";
  
    var obj_div_product = document.createElement("div")
    obj_div_product.className = "col-6 col-md-4";
  
    var obj_img_product = document.createElement("img")
    obj_img_product.className = "img-fluid";

    if (obj_task.thumbnail == "") {
      // obj_img_product.src = "/static/imgs/ab_project_detail.png";
      obj_img_product.width = 300;
      obj_img_product.height = 300;
    } else {
      var path_cover = HOST_URL_TPLANET_DAEMON + obj_task.thumbnail;
      obj_img_product.src = path_cover;
    }
    
    obj_img_product.alt = "";

    var obj_div_img_root = document.createElement("div");
    obj_div_img_root.className = "col-md-4";
    var obj_div_img = document.createElement("div");
    obj_div_img.className = "h-100 d-flex align-items-center justify-content-center mt-4 mt-md-0 flex-column";
    var obj_img = document.createElement("img");
    obj_img.className = "w-75 h-100";

    // FIXME
    // task_weight_chart(obj_task.uuid);
    /* obj_img.src = "/static/imgs/chart_2.jpg";
    obj_img.alt = "";
    obj_div_img.append(obj_img);
    obj_div_img_root.append(obj_div_img); */

    var obj_digital_fp_chart1_img = document.createElement("div");
    obj_digital_fp_chart1_img.id = "observablehq-chart-" + obj_task.uuid;
    obj_div_img_root.append(obj_digital_fp_chart1_img);

    

    



    // <p class="mb-2 h5" style="font-weight: bolder;">活動設計名稱:
    // <span class="pl-2">減塑產品設計</span></p>
    var obj_div_des = document.createElement("div");
    obj_div_des.className = "mb-2 h5";
    obj_div_des.style = "font-weight: bolder;";
    var obj_p_name = document.createElement("p");
    obj_p_name.innerHTML = "活動設計名稱: ";
    var obj_span_name = document.createElement("span");
    obj_span_name.className = "pl-2";
    /* obj_span_name.innerHTML = "(" + obj_task.uuid + ") " + obj_task.name; */
    obj_span_name.innerHTML = obj_task.name;
    var obj_p_period = document.createElement("p")
    obj_p_period.innerHTML = "日期: "
    var obj_span_period = document.createElement("span")
    obj_span_period.innerHTML = obj_task.period;
    var obj_p_idea = document.createElement("p")
    obj_p_idea.className = "small";
    obj_p_idea.innerHTML = obj_task.overview;
    var obj_sdg_div = add_task_sdgs(obj_task);
    obj_p_name.append(obj_span_name);
    obj_p_period.append(obj_span_period);
    obj_div_des.append(obj_p_name);
    obj_div_des.append(obj_p_period);
    obj_div_des.append(obj_p_idea);

    if (obj_sdg_div != null) {
      obj_div_des.append(obj_sdg_div);
    }

    // TODO NFT:
    /* var obj_nft = get_nft(obj_task);
    var obj_p_nft = document.createElement("p");
    obj_p_nft.className = "small";
    obj_p_nft.innerHTML = "NFT:";
    obj_div_des.append(obj_p_nft); */
    

    obj_div_product.append(obj_img_product);
    obj_div_root.append(obj_div_product);
    obj_div_root.append(obj_div_img_root);
    obj_div_root.append(obj_div_des);
    obj_tasks_container.append(obj_div_root);

    // Draw task weight
    draws_task_weight_chart(obj_task.uuid)
  }
}
