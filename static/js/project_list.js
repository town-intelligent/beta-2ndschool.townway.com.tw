function set_page_info_project_list()
{
  // setLocalStorage("email", "400@gmail.com");
  var obj_list_projects = list_plans();
  var list_project_uuids = obj_list_projects.projects;
  console.log(list_project_uuids);
}