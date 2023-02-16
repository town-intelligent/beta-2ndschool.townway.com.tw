import { news_add } from './news.js'

function DataURIToBlob(dataURI) {
  try {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  } catch (e) { return null; }
}

export function set_page_info_cms_add_news() {

  $(function () {
    $("form").on("submit", function(e){
      e.preventDefault();

      if ("title", document.getElementById("news_title").value == "") {
        alert("請至少填寫新聞標題！");
        return;
      }

      var form = new FormData();
      form.append("email", "Real.ability2022@gmail.com");
      
      try {
        var background_image = document.getElementById("news_banner").style.backgroundImage.replace('url("', '');
        background_image = document.getElementById("news_banner").style.backgroundImage.replace('")', '');
        form.append("banner", DataURIToBlob(background_image));
      } catch (e) {}

      form.append("title", document.getElementById("news_title").value);
      form.append("description", document.getElementById("news_description").value);
      
      if (DataURIToBlob(document.getElementById("news_img_0").src))
        form.append("img_0", DataURIToBlob(document.getElementById("news_img_0").src));
      
      if (DataURIToBlob(document.getElementById("news_img_1").src))
        form.append("img_1", DataURIToBlob(document.getElementById("news_img_1").src));
      
      if (DataURIToBlob(document.getElementById("news_img_2").src))
        form.append("img_2", DataURIToBlob(document.getElementById("news_img_2").src));
      
      var result_news = news_add(form);
      if (result_news.result == true) {
        alert("上架成功!");
        window.location.replace("/backend/cms_news_list.html");
      } else {
        alert("上架失敗，請檢查資料欄位!");
      }
    });
  });   
}

export function uploadNewsCover() {
  var file = new FileModal("image/*");
  file.onload = function(base64Img){

    // Preview
    document.getElementById("news_banner").style.backgroundImage =  "url(" + base64Img + ")";
  };
  file.show();
}

export function add_news_img(no) {
  var file = new FileModal("image/*");
  file.onload = function(base64Img){

    // Preview
    document.getElementById("news_img_" + no).src = base64Img;
    document.getElementById("news_img_" + no).style= "width:100%";
  };
  file.show();
}

export function changeNewsListBanner() {
  var file = new FileModal("image/*");
  file.onload = function(base64Img){

    // Preview
    document.getElementById("news_banner").style.backgroundImage =  "url(" + base64Img + ")";
  };
  file.show();

}