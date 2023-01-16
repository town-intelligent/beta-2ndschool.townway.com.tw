import { set_page_info_cms_agent } from './cms_agent.js'
import { set_page_info_cms_project_detail } from './cms_project_detail.js'
import { set_page_info_cms_plan_info } from './cms_plan_info.js'
import { set_page_info_cms_sdgs_setting } from './cms_sdgs_setting.js'
import { set_page_info_cms_impact } from './cms_impact.js'
import { set_page_info_cms_missions_display } from './cms_missions_display.js'
import { set_page_info_cms_deep_participation } from './cms_deep_participation.js'
import { set_page_info_cms_contact_person } from './cms_contact_person.js'
import { set_page_info_admin_project_verify } from './admin_project_verify.js'
import { set_page_info_admin_project_check } from './admin_project_check.js'
import { set_page_info_kpi } from './kpi.js'
import { set_page_info_content } from './content.js'

export function set_page_info() {
  /* Get path and parameters */
  // Path
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var url = new URL(window.location.href);
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid")
  var task = urlParams.get("task")

  // TODO
  if (page == "admin_project_check.html") {
    set_page_info_admin_project_check(uuid)
  }

  if (page == "admin_project_verify.html") {
    set_page_info_admin_project_verify(uuid)
  }
  
  if (page == "cms_impact.html") {
    set_page_info_cms_impact(uuid);
  }

  if (page == "cms_missions_display.html") {
    set_page_info_cms_missions_display(uuid, task);
  }

  if (page == "cms_deep_participation.html") {
    set_page_info_cms_deep_participation();
  }

  if (page == "cms_project_detail.html") {
    set_page_info_cms_project_detail(uuid);
  }

  if (page == "cms_agent.html") {
    set_page_info_cms_agent(uuid);
  }

  if (page == "cms_plan_info.html") {
    set_page_info_cms_plan_info(uuid);
  }

  if (page == "cms_sdgs_setting.html") {
    set_page_info_cms_sdgs_setting(uuid);
  }

  if (page == "cms_contact_person.html") {
    set_page_info_cms_contact_person(uuid);
  }

  if (page == "project_list.html" || page == "project_list_local.html") {
    set_page_info_project_list();
  }

  if (page == "kpi.html") {
    set_page_info_kpi(null, null);
  }

  if (page == "kpi_filter.html") {
    set_page_info_kpi_filter();
  }

  if (page == "content.html") {
    set_page_info_content();
  }
}