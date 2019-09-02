$(function(){
  function buildHTML(message){
    var html = `.message__upper-info
                  .message__upper-info__talker
                    ${message.user_name}
                  .message__upper-info__date
                    ${message.created_at}
                .message__text
                  - if message.body.present?
                    ${message.body}
                  = image_tag message.image.url, class: 'message__image' if message.image.present?`
    return html;
  }
  $('.form').on('submit', function(e){
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
      $('.message').append(html)
      $('messages').animate({scrollBottom: 0}, 500, 'swing');
      $('.input-box__text').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})