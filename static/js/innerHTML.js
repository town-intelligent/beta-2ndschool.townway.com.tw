const str_parent_task_block = ` <div class="row h-100">
<div class="col-md-6">
  <div id="coverImg_UUID_TASK" class="border d-flex align-items-center justify-content-center h-100">
  <button type="button" id="btnUploadImg_UUID_TASK" onclick="uploadTaskCover(UUID_TASK)">
    <div id="divUploadImg_UUID_TASK" class="bg-contain" style="background-image: url(/static/imgs/image_icon.svg); width: 100px; height: 100px; background-repeat: no-repeat" ></div>
  </button>
</div>
</div>
<div class="col-md-6">
<form>
  <div class="form-row">
    <div class="form-group col-12 mt-3 mt-md-0">
      <label for="inputEvent">活動設計名稱</label>
      <input id="parent_task_name_UUID_TASK" type="text" class="form-control" id="inputEvent" placeholder="">
    </div>
    <div class="form-group col-6">
      <label for="inputDatePicker1">開始日期</label>
      <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
        <input type="text" id="parent_task_start_date_UUID_TASK" class="form-control datetimepicker-input" data-target="#datetimepicker1"/>
        <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
        </div>
      </div>
    </div>
    <div class="form-group col-6">
      <label for="inputDatePicker2">結束日期</label>
      <div class="input-group date" id="datetimepicker2" data-target-input="nearest">
        <input type="text" id="parent_task_due_date_UUID_TASK" class="form-control datetimepicker-input" data-target="#datetimepicker2"/>
        <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="textareaIdea">理念傳達</label>
    <textarea id="parent_task_overview_UUID_TASK" class="form-control" id="textareaIdea" placeholder="" style="resize: none"></textarea>
  </div>
  <button type="button" id="btn_cms_plan_add_parent_tasks" class="btn btn-block btn-outline-secondary" name="UUID_TASK" onclick="cms_plan_add_parent_tasks('UUID_TASK')">新增任務 +</button>
</div>
</div> 
<hr class="my-4">`

const str_project_block_in_project_page_page = `<div class="col-md-4">
<div class="card mb-4 rounded-0">
  <div class="d-flex justify-content-center">
    <div class="img-fluid bg-cover" style="background-image:url(/static/imgs/project_img.jpg); width:100% ;height:200px"></div>
  </div>
  <div class="card-body d-flex flex-column">
    <div class="d-flex justify-content-between">
      <p class="h5 mb-0">永續發展計畫</p>
      <p class="text-danger mb-0">能源</p>
    </div>
    <p class="card-text mt-4">提案者:<span class="pl-2">永鑫能源<span></p>
    <p class="card-text">期間: <span class="pl-2">____ . __ . __ ~ ____ . __ . __<span></p>
    <p class="card-text">預算: <span class="pl-2">新台幣 __________ 元<span></p>
    <a href="/content.html" class="stretched-link"></a>
    <div class="d-flex align-items-center mt-2" style="position: relative;">
      <p class="mb-0">SDGs: </p>
      <div class="pl-2">
        <a href="#" class="stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%" src="/static/imgs/SDGs_01.jpg" alt="">
        </a>
        <a href="#" class="pl-1 stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%" src="/static/imgs/SDGs_04.jpg" alt="">
        </a>
        <a href="#" class="pl-1 stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%"  src="/static/imgs/SDGs_06.jpg" alt="">
        </a>
        <a href="#" class="pl-1 stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%"  src="/static/imgs/SDGs_09.jpg" alt="">
        </a>
        <a href="#" class="pl-1 stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%"  src="/static/imgs/SDGs_11.jpg" alt="">
        </a>
        <a href="#" class="pl-1 stretched-link" style="position: relative; text-decoration: none;">
          <img style="width:13%"  src="/static/imgs/SDGs_13.jpg" alt="">
        </a>
      </div>
    </div>
  </div>
</div>
</div>`