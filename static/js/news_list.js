import { news_list, news_get, news_delete } from './news.js'

export function set_page_info_news_list() {
  var obj_news_list = news_list();

  obj_news_list.content.forEach(function(uuid){
    var obj_news = news_get(uuid);

    if (obj_news.result == false) {
      return;
    }

    /*
    <div class="col-md-4">
      <div class="mb-4 rounded-0">
        <div class="img-fluid bg-cover" style="background-image:url(/static/imgs/news1.jpg); width:100% ;height:288px; background-repeat: no-repeat">
          <div class="d-flex flex-column h-100 justify-content-end pl-3 text-white">
            <p class="mb-0 text-shadow">2022.03.29</p>
            <p class="text-shadow">亞洲城鄉創生沙龍</p>
          </div>
          <a href="#" class="stretched-link"></a>
        </div>
      </div>
    </div>
    */

    // Create DOMs
    var col_md_4 = document.createElement("div");
    col_md_4.className = "col-md-4";

    var mb_4_rounded_0 = document.createElement("div");
    mb_4_rounded_0.className = "mb-4 rounded-0";

    var img_fluid_bg_cover = document.createElement("div");
    img_fluid_bg_cover.className = "img-fluid bg-cover";
    img_fluid_bg_cover.style = "background-image:url(" + 
    HOST_URL_TPLANET_DAEMON + obj_news.content.static.banner + 
    "); width:100% ;height:288px; background-repeat: no-repeat";

    var d_flex_flex_column = document.createElement("div");
    d_flex_flex_column.className = "d-flex flex-column h-100 justify-content-end pl-3 text-white";

    var stretched_link = document.createElement("a");
    stretched_link.href = "/news_content.html?uuid=" + obj_news.content.uuid;
    stretched_link.className = "stretched-link";

    var mb_0 = document.createElement("p");
    mb_0.className = "mb-0 text-shadow";
    // FIXME
    mb_0.innerHTML = "2023";

    var text = document.createElement("p");
    text.className = "text-shadow";
    text.innerHTML = obj_news.content.title;

    // Append to DOM
    d_flex_flex_column.append(mb_0);
    d_flex_flex_column.append(text);
    img_fluid_bg_cover.append(d_flex_flex_column);
    img_fluid_bg_cover.append(stretched_link);
    mb_4_rounded_0.append(img_fluid_bg_cover);
    col_md_4.append(mb_4_rounded_0);

    var obj_news_container = document.getElementById("news_container");
    obj_news_container.append(col_md_4);
  });
}

export function set_page_info_cms_news_list() {

  var obj_news_list = news_list();

  obj_news_list.content.forEach(function(uuid) {
    var obj_news = news_get(uuid);

    if (obj_news.result == false) {
      return;
    }

/*   <div class="col-md-4">
      <div class="mb-4 rounded-0">
        <div class="img-fluid bg-cover" style="background-image:url(/static/imgs/news2.jpg); width:100% ;height:288px; background-repeat: no-repeat">
          <div class="d-flex flex-column h-100 justify-content-end pl-3 text-white">
            <p class="mb-0 text-shadow">2021.11.06</p>
            <p class="text-shadow">亞洲城鄉創生沙龍</p>
          </div>
          <a href="#" class="stretched-link"></a>
        </div>
      </div>
      <div class="text-center mb-4">
        <a href="#" class="btn btn-danger">刪除</a>
      </div>
    </div> */


      // Create DOMs
      var col_md_4 = document.createElement("div");
      col_md_4.id = "id_" + obj_news.content.uuid;
      col_md_4.className = "col-md-4";
  
      var mb_4_rounded_0 = document.createElement("div");
      mb_4_rounded_0.className = "mb-4 rounded-0";
  
      var img_fluid_bg_cover_a = document.createElement("a");
      img_fluid_bg_cover_a.href = "/news_content.html?uuid=" + obj_news.content.uuid;

      var img_fluid_bg_cover = document.createElement("div");
      img_fluid_bg_cover.className = "img-fluid bg-cover";
      
      img_fluid_bg_cover.style = "background-image:url(" + 
        HOST_URL_TPLANET_DAEMON + obj_news.content.static.banner + 
        "); width:100% ;height:288px; background-repeat: no-repeat";
  
      var d_flex_flex_column = document.createElement("div");
      d_flex_flex_column.className = "d-flex flex-column h-100 justify-content-end pl-3 text-white";
  
      var mb_0 = document.createElement("p");
      mb_0.className = "mb-0 text-shadow";
      // FIXME
      mb_0.innerHTML = "2023";
  
      var text = document.createElement("p");
      text.className = "text-shadow";
      text.innerHTML = obj_news.content.title;


      /* <div class="text-center mb-4">
        <a href="#" class="btn btn-danger">刪除</a>
      </div> */
      var obj_del = document.createElement("div");
      obj_del.className = "text-center mb-4";

      var obj_del_a_href = document.createElement("a");
      obj_del_a_href.className = "btn btn-danger";
      obj_del_a_href.onclick = function() {
        if (confirm("即將刪除 : " + obj_news.content.title) == true) {
          var obj_delete_result = news_delete(obj_news.content.uuid);

          if (obj_delete_result.result == true) {
            location.reload();
          }
        }
      };
      obj_del_a_href.innerHTML = "刪除";

      // Append to DOM
      obj_del.append(obj_del_a_href);
      d_flex_flex_column.append(mb_0);
      d_flex_flex_column.append(text);

      img_fluid_bg_cover_a.append(img_fluid_bg_cover);
      img_fluid_bg_cover.append(d_flex_flex_column);
      mb_4_rounded_0.append(img_fluid_bg_cover_a);
      col_md_4.append(mb_4_rounded_0);
      col_md_4.append(obj_del);
  
      var obj_news_container = document.getElementById("news_container");
      obj_news_container.append(col_md_4);
    });
}