$(document).on('turbolinks:load', function () {
  function buildHTML(message) {

    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message">
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
});