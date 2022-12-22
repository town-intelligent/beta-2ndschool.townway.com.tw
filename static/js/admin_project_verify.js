import { list_plan_tasks } from './plan.js'
import { get_task_info, list_children_tasks } from './tasks.js'

export function set_page_info_admin_project_verify (uuid) {
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var parent = urlParams.get("parent")

  var obj_parent_tasks = null;
  if (parseInt(parent) == 1) {
    obj_parent_tasks = list_plan_tasks(uuid, parseInt(parent));
    if (obj_parent_tasks.tasks.length == 0)
      return;
  } else {
    obj_parent_tasks = list_children_tasks(uuid);
    if (obj_parent_tasks.length == 0)
      return;
  }

  var list_parent_tasks = [];
  
  if (parseInt(parent) == 1) {
    list_parent_tasks = obj_parent_tasks.tasks;
  } else {
    list_parent_tasks = obj_parent_tasks;
  }

  // Get tbody
  var obj_parent_tasks = document.getElementById("parent_tasks");

  for (var index = 0; index < list_parent_tasks.length; index++) {
    var obj_task = get_task_info(list_parent_tasks[index]);
    var obj_tr = document.createElement("tr");
    
    // Task name
    var obj_td_task_name = document.createElement("td");
    obj_td_task_name.className = "align-middle text-center"
    obj_td_task_name.innerHTML = obj_task.name;

    // Task period
    var obj_td_task_period = document.createElement("td");
    obj_td_task_period.className = "align-middle text-center"
    obj_td_task_period.innerHTML = obj_task.period;

    // Task type
    var obj_td_task_type = document.createElement("td");
    obj_td_task_type.className = "align-middle text-center"
    var obj_a_task_type = document.createElement("a");
    obj_a_task_type.className = "btn btn-primary btn-sm";

    if (parseInt(parent) == 0) {
      obj_a_task_type.href = "/backend/admin_project_check.html?uuid=" + list_parent_tasks[index];
    }
    else {
      obj_a_task_type.href = "/backend/admin_project_verify.html?uuid=" + list_parent_tasks[index] + "&parent=0";
    }
    obj_a_task_type.role = "button";
    obj_a_task_type.innerHTML = "驗證"
    obj_td_task_type.append(obj_a_task_type);
    
    // Append to tbody
    obj_tr.append(obj_td_task_name);
    obj_tr.append(obj_td_task_period);
    obj_tr.append(obj_td_task_type);
    obj_parent_tasks.append(obj_tr);

    console.log(list_parent_tasks[index]);
  }
}