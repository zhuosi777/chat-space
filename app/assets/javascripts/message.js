$(document).on('turbolinks:load', function () {
  function buildHTML(message) {

    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                  </div >
                  <div class="upper-message__date">
                    ${message.data}
                  </div>
                </div >
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${message.content}
                    <div>
                      ${img}
                    </div>
                  </div >
                </div >`
    return html;
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('form')[0].reset();
        scrollBottom();
      })
      .fail(function (data) {
        alert('メッセージが送信できませんでした');
      })
      .always(function (data) {
        $('.form__submit').prop('disabled', false);
      })
  })
  function scrollBottom() {
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({
        url: "api/messages",
        type: "GET",
        data: { id: last_message_id },
        dataType: "json"
      })
        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $(".messages").append(insertHTML);
          })
          $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, 'fast');
        })
        .fail(function () {
          alert("自動更新に失敗しました");
        });
    };
  };
  setInterval(reloadMessages, 5000);
});