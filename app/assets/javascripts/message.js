$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class="message__image" src="${ message.image }">`: "";
    var html = `<div class="message" data-messageid="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.body}
                  </div>
                  <div class="message__image">
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $('#submit-btn').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      document.getElementById('new_message').reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("messageid");
      $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
      //dataオプションでリクエストに値を含める
        data: {messageid: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML).animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages,5000);
});