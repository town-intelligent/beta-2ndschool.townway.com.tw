export function set_page_info_cms_deep_participation(){
    var index = 0;
    while (true) {
      if (document.getElementById("task_start_date_" + index) == null)
            break;
      $("#task_start_date_" + index).timepicker();
      $("#task_due_date_" + index).timepicker();
      index ++;
    }
}