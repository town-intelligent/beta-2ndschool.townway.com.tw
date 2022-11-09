import { set_page_info } from './set_page_info.js'

function navbar(group) {
  if (group != ""){
    // home logo
    if (group == "200" || group == "201" ) {
      document.getElementById("index_logo").href = 
      "/backend/admin_agent_dashboard.html";
    }

    // login icons
    var list_sigup = document.getElementsByName("signup_logo");
    for(var index = 0; index<list_sigup.length; index++){
      list_sigup[index].style.display="none";
    }

    var list_sigin = document.getElementsByName("signin_logo");
    for(var index = 0; index<list_sigin.length; index++) {
      list_sigin[index].style.visibility = "hidden";
    }
  }
}

/* export function init() { */

  // Get path
  var path = window.location.pathname;
  var page = path.split("/").pop();

  // Get group
  var group = getLocalStorage("group");

  // set page info
  set_page_info();

  // navbar
  navbar(group);
/* } */
