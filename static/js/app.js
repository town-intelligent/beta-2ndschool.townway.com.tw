import { convert_project_weight_to_render_json } from './render.js'
import { getProjectWeight, list_plan_tasks } from './plan.js'
import { getTaskWeight } from './tasks.js'

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import notebook from  "https://api.observablehq.com/d/4fa2bd8dea76886a@508.js?v=3";

export function draws(id_project) {
  var arr_task_uuid = list_plan_tasks(id_project);//[id_project];
  if (arr_task_uuid.tasks.length == 0)
    return;
  
  var weight_project = getProjectWeight(arr_task_uuid.tasks);
  var input_for_render = convert_project_weight_to_render_json(weight_project);
  const runtime = new Runtime();
  const main = runtime.module(notebook, name => {
    if (name === "chart") {
      // return new Inspector(document.querySelector("#observablehq-chart-4bac1ac8"));
      return new Inspector(document.querySelector("#observablehq-chart-" + id_project));
    }
    return ["udpdate","trigger"].includes(name);
  });
  main.redefine("alphabet", input_for_render);
}

export function draws_task_weight_chart(uuid_task) {
  var weight_task = getTaskWeight(uuid_task);
  var input_for_render = convert_project_weight_to_render_json(weight_task);

  const runtime = new Runtime();
  const main = runtime.module(notebook, name => {
    if (name === "chart") {
      // return new Inspector(document.querySelector("#observablehq-chart-4bac1ac8"));

      return new Inspector(document.querySelector("#observablehq-chart-" + uuid_task));
    }
    return ["udpdate","trigger"].includes(name);
  });
  main.redefine("alphabet", input_for_render);
}