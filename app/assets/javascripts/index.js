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

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();

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
        });
      }else{
        $("#user-search-result").empty();
        html = NoUser("一致するユーザーがいません");
      }
      $("#user-search-result").append(html);
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
});