import { list_plan_tasks, plan_info } from './plan.js'
import { get_task_info, list_children_tasks } from './tasks.js'

function showChildTaskModal(uuid_parent_task) {
  // Get child task
  var result_list_children_tasks = list_children_tasks(uuid_parent_task);
  try{
    if (result_list_children_tasks.length == 0) {
      alert("目前沒有任何的任務")
      return
    }
  } catch (e) {
    alert("開啟任務時發生錯誤")
    return
  }

  // Append to modal
  var obj_child_task_uuis_container = document.getElementById("child_task_uuis_container");
  while (obj_child_task_uuis_container.lastElementChild) {
    obj_child_task_uuis_container.removeChild(obj_child_task_uuis_container.lastElementChild);
  }

  for (var index = 0; index <result_list_children_tasks.length; index++){
    
    // Get task info
    var obj_child_task = get_task_info(result_list_children_tasks[index])

    // UUID
    var element_task = document.createElement("p");
    element_task.innerHTML += obj_child_task.uuid;

    // Name
    element_task.innerHTML += "  " + obj_child_task.name;

    // Period
    element_task.innerHTML += "  " + obj_child_task.period;
    
    obj_child_task_uuis_container.append(element_task);

  }


  // Show modal
  $("#child_task_mail_modal").modal("show")
  
  $("#child_task_mail_modal_OK").on("click",function(e){
    $("#child_task_mail_modal").modal("hide")
  })
}

export function set_page_info_cms_project_detail (uuid) {
  var obj_project = plan_info(uuid);

  /* Set DOM */
  document.getElementById("uuid_project").innerHTML = uuid;
  document.getElementById("name_project").innerHTML = obj_project.name;

  // Weight
  var obj_sdg_container = document.getElementById("sdg_container");
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
    var obj_a = document.createElement("a");
    obj_a.href = "#"
  
    // <img class="w-100" src="/static/imgs/SDGs_04.jpg" alt="">
    var obj_img = document.createElement("img");
    obj_img.className = "w-100";
    obj_img.src = "/static/imgs/SDGs_" + ("0" + (index + 1)).slice(-2) + ".jpg";
    obj_img.alt = "";
  
    // Append
    obj_a.append(obj_img);
    obj_div.append(obj_a);
    obj_sdg_container.append(obj_div);
  }

  // Period
  document.getElementById("period_project").innerHTML = obj_project.period; 
  }

  // Location
  var list_location = [];
  
  try {
    list_location = obj_project.location.split(",");
  } catch (e) {}
  
  // Location
  var obj_location = document.getElementById("location");
  for (var index = 0; index < list_location.length; index++) {
    if (parseInt(list_location[index]) == 1) {
      if (index == 0) {
        obj_location.innerHTML = obj_location.innerHTML + "<br> @ 台北 <br>";
      } else if (index == 1){
        obj_location.innerHTML = obj_location.innerHTML + "<br> @ 竹山 <br>";
      } else if (index == 2){
        obj_location.innerHTML = obj_location.innerHTML + "<br> @ 高雄 <br>";
      } else if (index == 3){
        obj_location.innerHTML = obj_location.innerHTML + "<br> @ 花蓮 <br>";
      } else {
        obj_location.innerHTML = obj_location.innerHTML + "<br> @ 馬祖 <br>";
      }
    }
  }
  
  // Unit-A and B
  var obj_project_a = document.getElementById("project_a"); 
  obj_project_a.innerHTML = obj_project.project_a;
  var obj_project_b = document.getElementById("project_b"); 
  obj_project_b.innerHTML = obj_project.project_b;

  // Hoster
  var obj_hoster = document.getElementById("hoster"); 
  obj_hoster.innerHTML = obj_project.hoster;
  
  // Email
  var obj_email = document.getElementById("email"); 
  obj_email.innerHTML = obj_project.email;
  
  // Philosophy
  var obj_philosophy = document.getElementById("philosophy"); 
  obj_philosophy.innerHTML = obj_project.philosophy;

  // SDGs
  // <div class="row align-items-center mt-4">
  //   <img class="col-3 col-md-1" src="/static/imgs/SDGs_04.jpg" alt="">
  //   <p class="col-9 col-md-11 col-form-label pr-md-0">支持，SDG 4 良質教育，你的評論內容你的評論內容你的評論內容你的評論內容你的評論內容你的評論內容</p>
  // </div>

  var obj_sdg_container = document.getElementById("project_sdg_container");

  var list_weight = null;
  try {
    list_weight = JSON.parse(obj_project.weight_description);
    Object.keys(list_weight).forEach(function(key) {
      var index = parseInt(key) + 1;
      index = ("0" + index).slice(-2);

      var obj_div = document.createElement("div");
      obj_div.className = "row align-items-center mt-4";

      var obj_img = document.createElement("img");
      obj_img.className = "col-3 col-md-1";
      obj_img.src = "/static/imgs/SDGs_" + index + ".jpg";
      obj_img.alt = "";

      var obj_p = document.createElement("p");
      obj_p.className = "col-9 col-md-11 col-form-label pr-md-0";
      obj_p.innerHTML = list_weight[key];

      obj_div.append(obj_img);
      obj_div.append(obj_p);
      obj_sdg_container.append(obj_div);
    })
  } catch(e) {}

  // Set tasks
  var obj_tasks = list_plan_tasks(uuid ,1);

  var list_tasks = obj_tasks.tasks;
  var obj_tasks_container = document.getElementById("tasks_container");

  // for (var index = 0; index < list_tasks.length; index++) {
    list_tasks.forEach(uuin_task => {
    var obj_task = get_task_info(uuin_task);

    // Create DOM
    /*
    <div class="row mt-4 mt-md-5 mb-3">
      <div class="col-6 col-md-4">
        <img class="img-fluid" src="/static/imgs/product.jpg" alt="">
      </div>
      <div class="col-4 text-center d-none d-md-block">
        <img src="/static/imgs/qr_code.png" style="height: 188px;" alt="">
      </div>
      <div class="col-md-4 mt-4 mt-md-0">
        <p>活動設計名稱: <span>減塑產品設計</span></p>
        <p>日期: <span>2022.02.25</span></p>
        <p class="small">設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念設計理念</p>
      </div>
    </div>
    */
    var obj_div_root = document.createElement("div") 
    obj_div_root.className = "row mt-4 mt-md-5 mb-3";
  
    var obj_div_product = document.createElement("div")
    // obj_div_product.className = "col-md-4 mt-auto";
    obj_div_product.className = "col-md-4 d-flex justify-content-center align-items-center";

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
  
    var obj_div_qrocde = document.createElement("div")
    obj_div_qrocde.className = "col-md-4 m-auto d-flex justify-content-center";

    var obj_qrcode = document.createElement("qrcode");
    obj_tasks_container.append(obj_qrcode);

    var qrcode = new QRCode(obj_qrcode, {
      width : 250,
      height : 250,

    });

    // qrcode.style = "width:100px; height:100px; margin-top:15px;";
    qrcode.makeCode(location.protocol + "//" + window.location.host + "/tasks/" + obj_task.uuid);    

    var obj_div_des = document.createElement("div")
    obj_div_des.className = "col-md-4 mt-4 mt-md-0";
    var obj_p_name = document.createElement("p")
    obj_p_name.style = "font-size: 30px";
    obj_p_name.innerHTML = "活動設計名稱";
    var obj_p_name_left = document.createElement("span")
    obj_p_name_left.innerHTML = "("
    obj_p_name_left.style = "font-size: 20px";
    var uuid_title = document.createElement("span")
    uuid_title.innerHTML = "uuid:"
    uuid_title.style = "font-size: 20px";
    var UUID = document.createElement("span")
    UUID.innerHTML = obj_task.uuid;
    UUID.style = "font-size: 20px";
    var obj_p_name_right = document.createElement("span")
    obj_p_name_right.innerHTML = ")："
    obj_p_name_right.style = "font-size: 20px";
    var obj_span_name = document.createElement("span");
    obj_span_name.innerHTML = obj_task.name;
    obj_span_name.style = "font-size: 30px";
    var obj_p_period = document.createElement("p")
    obj_p_period.innerHTML = "日期： "
    obj_p_period.style = "font-size: 30px";
    var obj_span_period = document.createElement("span")
    obj_span_period.innerHTML = obj_task.period;
    obj_span_period.style = "font-size: 20px";
    var obj_p_idea = document.createElement("p")
    obj_p_idea.style = "font-size: 18px"
    obj_p_idea.innerHTML = obj_task.overview;

    var btn_outter = document.createElement("div")


    // TODO: 啟用讀卡機
    var btn = document.createElement("button")
    btn.innerHTML = "啟用讀卡機"
    btn.className = "border-0 w-100 p-2";
    btn.style = "border-radius: 8px";
    // btn_outter.append(btn);

    ///

    var icon_btn = document.createElement("a")
   // icon_btn.className = "btn border-1 w-100 p-2"
    icon_btn.className = "btn btn-block btn-outline-secondary"
    icon_btn.id = "icon_btn_" + obj_task.uuid;

    // icon_btn.dataset.target = "#SDGsModal"
    icon_btn.dataset.toggle = "modal"

    
    icon_btn.addEventListener("click", function(){
      showChildTaskModal(obj_task.uuid);
    })

    icon_btn.innerText = "啟用讀卡機 " + obj_task.uuid;
    icon_btn.style = "border-radius: 8px";
    btn_outter.append(icon_btn);

    // TODO: 啟用讀卡機



    obj_p_name.append(obj_p_name_left);
    obj_p_name_left.append(uuid_title);
    uuid_title.append(UUID);
    UUID.append(obj_p_name_right);
    obj_p_name_right.append(obj_span_name);

    obj_p_period.append(obj_span_period);
    obj_div_des.append(obj_p_name);
    obj_div_des.append(obj_p_period);
    obj_div_des.append(obj_p_idea);
    obj_div_des.append(btn_outter);

    obj_div_qrocde.append(obj_qrcode);	    
    obj_div_product.append(obj_img_product);
    obj_div_root.append(obj_div_product);
    obj_div_root.append(obj_div_qrocde);
    obj_div_root.append(obj_div_des);

    obj_tasks_container.append(obj_div_root);
  })

  // Set cover

  if (obj_project.img != null) { 
    var path_cover = HOST_URL_TPLANET_DAEMON + 
    "/static/project/" + uuid + 
    "/media/cover/cover.png";
    var obj_cover = document.getElementById("project_cover");
    obj_cover.src = path_cover;
  }
  /* Set DOM */
}

$(function () {
  $("#btn_send_mail").on("click", function(e) {
    e.stopPropagation();

    // Params
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid")
    var obj_project = plan_info(uuid);

    var mail_content = "";
    mail_content = str_send_mail.replace("RECEIVER", getLocalStorage("email"));
    mail_content = mail_content.replace("TITLE", obj_project.name);

    document.getElementById("send_mail").innerHTML = mail_content;
    $("#send_mail_modal").modal("show")
  });
});

$(function () {
  $("#submit_send_mail").on("click", function(e) {
    e.stopPropagation();

    // URL
    var url = new URL(window.location.href);

    // Params
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid")
    var obj_project = plan_info(uuid);

    var content = `<p>您有一個新的專案，請到 <a href="${url}?uuid=${uuid}">網址</a> 詳閱細節。</p>`

    var form = new FormData();
    form.append("receiver", getLocalStorage("email"));
    form.append("title", obj_project.name + " 邀請");
    form.append("content", content);

    var result = plan_send(form);

    $("#send_mail_modal").modal("hide")
  });
});
