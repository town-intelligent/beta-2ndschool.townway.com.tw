import { get_task_comment } from './tasks.js'

export function set_page_info_admin_project_check (uuid) {
  var obj_resp_task_comment = get_task_comment(uuid);

  if (obj_resp_task_comment == false || obj_resp_task_comment.comment.lenght == 0)
    return;

  // Get task comment list
  var list_task_comment = obj_resp_task_comment.comment;

  // Get tbody for comment table
  var obj_tbody_task_comment = document.getElementById("tbody_task_comment");

  for (var index = 0; index < list_task_comment.length; index++) {
    // Element tr set
    var obj_tr = document.createElement("tr");

    // Checkbox
    var obj_th_checkbox = document.createElement("th");
    obj_th_checkbox.scope = "row";
    obj_th_checkbox.className = "text-center align-middle";
    var obj_div_checkbox = document.createElement("div");
    obj_div_checkbox.className = "form-check";
    var obj_input_checkbox = document.createElement("input");
    obj_input_checkbox.className = "form-check-input position-static checkbox-1x";
    obj_input_checkbox.type = "checkbox";

    obj_input_checkbox.onclick = function() {
      alert(list_task_comment[index].email);
    };

    obj_input_checkbox.id = list_task_comment[index].email;
    obj_input_checkbox.value = list_task_comment[index].email;
    obj_div_checkbox.append(obj_input_checkbox);
    obj_th_checkbox.append(obj_div_checkbox);
    obj_tr.append(obj_th_checkbox);

    // Email
    var obj_div_email = document.createElement("td");
    obj_div_email.className = "text-center align-middle";
    obj_div_email.innerHTML = list_task_comment[index].email;
    obj_tr.append(obj_div_email);

    // Weight
    var obj_div_weight = document.createElement("td");
    obj_div_weight.className = "text-center align-middle";
    obj_div_weight.innerHTML = "SDG04、SDG07、SDG11";
    obj_tr.append(obj_div_weight);

    // Comment
    var obj_div_comment = document.createElement("td");
    obj_div_comment.className = "text-center align-middle";
    obj_div_comment.innerHTML = list_task_comment[index].comment;
    obj_tr.append(obj_div_comment);

    // image
    var obj_a = document.createElement("a");
    obj_a.href = HOST_URL_TPLANET_DAEMON + list_task_comment[index].img;
    var obj_td_img = document.createElement("td");
    obj_td_img.className = "text-center align-middle";
    var obj_img = document.createElement("img");
    obj_img.src = HOST_URL_TPLANET_DAEMON + list_task_comment[index].img;
    obj_img.style = "max-width:60px";
    obj_a.append(obj_img);
    obj_td_img.append(obj_a);
    obj_tr.append(obj_td_img);

    // Tbody append
    obj_tbody_task_comment.append(obj_tr);

    console.log(typeof(list_task_comment[index]));
    console.log(list_task_comment[index]);
  }
}

export function selectComment(value = null) {
  alert("OK");
  alert(value);
}