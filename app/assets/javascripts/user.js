$(document).on("turbolinks:load", function () {

  var search_list = $("#user-search-result");


  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
    search_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <a class='chat-group-user__name'>${name}</a>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    $(".js-add-user").append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

      .done(function (users) {
        $("#user-search-result").empty();
        if (input.length === 0) {
        }
        else if (input.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          $("#user-search-result").empty();
          appendErrMsgToHTML("一致する名前はありません");
        }
      })
      .fail(function () {
        alert("ユーザーの検索に失敗しました");
      })
  });

  $(document).on("click", ".chat-group-user__btn--add", function () {

    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    appendMembers(name, user_id);
  });

  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });
});