function set_page_info_admin_agent_project(uuid){
    var list_project_obj = list_plans();
    var list_project_uuids = list_project_obj.projects;

    // List projects
    var obj_tbody = document.getElementById("tbody");    
    for (var index = 0; index < list_project_uuids.length; index ++) {
      // Get project info
      var obj_project = plan_info(list_project_uuids[index]);

      /*
      <tr>
        <td class="align-middle text-center">1</td>
        <td class="align-middle text-center">永鑫能源</td>
        <td class="align-middle text-center">元泰竹藝社、種子箖、台灣長虹</td>
        <td class="align-middle text-center">竹山創生輔導合作計畫</td>
        <td class="align-middle text-center">2022.05.04</td>
        <td class="align-middle text-center">2,000,000</td>
        <td class="align-middle text-center">2021.08.01~2022.07.31</td>
        <td class="align-middle text-center">SDG4、SDG8、SDG11、SDG15、SDG17</td>
        <td class="align-middle text-center">500</td>
        <td class="align-middle text-center">T-Planet @ 竹山</td>
        <td class="align-middle text-center">
          <a class="btn btn-primary btn-sm" href="#" role="button">待驗證</a>
        </td>
        <td class="align-middle text-center">小鎮文創</td>
      </tr>
      */
      var obj_tr = document.createElement("tr");
      var obj_td_uuid = document.createElement("td");
      obj_td_uuid.className = "align-middle text-center";
      obj_td_uuid.innerHTML = obj_project.uuid;
      var obj_td_a = document.createElement("td");
      obj_td_a.className = "align-middle text-center";
      obj_td_a.innerHTML = obj_project.project_a;
      var obj_td_b = document.createElement("td");
      obj_td_b.className = "align-middle text-center";
      obj_td_b.innerHTML = obj_project.project_b;
      var obj_td_name = document.createElement("td");
      obj_td_name.className = "align-middle text-center";
      obj_td_name.innerHTML = obj_project.name;
      var obj_td_create_date = document.createElement("td");
      obj_td_create_date.className = "align-middle text-center";
      obj_td_create_date.innerHTML = "2022.05.04";
      var obj_td_budget = document.createElement("td");
      obj_td_budget.className = "align-middle text-center";
      obj_td_budget.innerHTML = obj_project.budget;
      var obj_td_period = document.createElement("td");
      obj_td_period.className = "align-middle text-center";
      obj_td_period.innerHTML = obj_project.period;
      var obj_td_sdgs = document.createElement("td");
      obj_td_sdgs.className = "align-middle text-center";
      obj_td_sdgs.innerHTML = "SDG4、SDG8、SDG11、SDG15、SDG17";
      var obj_td_rp = document.createElement("td");
      obj_td_rp.className = "align-middle text-center";
      obj_td_rp.innerHTML = obj_project.relate_people;
      var obj_td_location = document.createElement("td");
      obj_td_location.className = "align-middle text-center";
      obj_td_location.innerHTML = "T-Planet @ 竹山";
      var obj_td_verify = document.createElement("td");
      obj_td_verify.className = "align-middle text-center";
      var obj_a = document.createElement("a");
      obj_a.className = "btn btn-primary btn-sm";
      obj_a.href = "#";
      obj_a.role = "button";
      obj_a.innerHTML = "待驗證";
      var obj_td_verifier = document.createElement("td");
      obj_td_verifier.className = "align-middle text-center";
      obj_td_verifier.innerHTML = "小鎮文創";

      // Append
      obj_tr.append(obj_td_uuid);
      obj_tr.append(obj_td_a);
      obj_tr.append(obj_td_b);
      obj_tr.append(obj_td_name);
      obj_tr.append(obj_td_create_date);
      obj_tr.append(obj_td_budget);
      obj_tr.append(obj_td_period);
      obj_tr.append(obj_td_sdgs);
      obj_tr.append(obj_td_rp);
      obj_tr.append(obj_td_location);

      obj_td_verify.append(obj_a);
      obj_tr.append(obj_td_verify);
      obj_tr.append(obj_td_verifier);

      obj_tbody.append(obj_tr);
    }
}