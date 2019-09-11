$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${ user.id } data-user-name= ${ user.name }>追加</div>
                </div>`
    return html;
  }

  function NoUser(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    return html;
  }
  function addUser(userId,userName) {
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                    <input name='group[user_ids][]' type='hidden' value='${userId}'>
                      <p class='chat-group-user__name'>${userName}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    return html;
      }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    console.log

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      if (users.length !==0) {
        $("#user-search-result").empty();
        users.forEach(function(user){
          html = appendUser(user);
      $("#user-search-result").append(html);
        });
      }else{
        $("#user-search-result").empty();
        html = NoUser("一致するユーザーがいません");
      $("#user-search-result").append(html);
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
  $(document).on("click", ".user-search-add", function(){
    $('#chat-group-users').val();
    var userId=$(this).data('user-id');
    var userName = $(this).data('user-name');
    html = addUser(userId,userName);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });
  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });
});