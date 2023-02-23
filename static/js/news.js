export function news_list() {
  var resultJSON = {};
  var dataJSON = {};
  dataJSON.email = "Real.ability2022@gmail.com";

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/news/news_list",
    type: "POST",
    async: false,
    crossDomain: true,
    data: dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}

export function news_get(uuid) {
  var resultJSON = {};
  var dataJSON = {};
  dataJSON.uuid = uuid;

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/news/news_get",
    type: "GET",
    async: false,
    crospsDomain: true,
    data: dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}

export function news_delete(uuid) {
  var resultJSON = {};
  var dataJSON = {};
  dataJSON.email = "Real.ability2022@gmail.com";
  dataJSON.uuid = uuid;

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/news/news_delete",
    type: "POST",
    async: false,
    crossDomain: true,
    data: dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}

export function news_add(form) {
  var resultJSON = {};

  var settings = {
    "url": HOST_URL_TPLANET_DAEMON + "/news/news_create",
    "method": "POST",
    async: false,
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    const obj = JSON.parse(response);
    resultJSON = obj;
    

  });
  
  return resultJSON;
}

export function news_banner_push(form) {
  var resultJSON = {};

  var settings = {
    "url": HOST_URL_TPLANET_DAEMON + "/mockup/new",
    "method": "POST",
    async: false,
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    const obj = JSON.parse(response);
    resultJSON = obj;
  });
  
  return resultJSON;
}

export function mockup_get() {
  var resultJSON = {};
  var form = new FormData();
  form.append("email", "Real.ability2022@gmail.com");

  $.ajax({
    url: HOST_URL_TPLANET_DAEMON + "/mockup/get",
    type: "POST",
    async: false,
    crospsDomain: true,
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}