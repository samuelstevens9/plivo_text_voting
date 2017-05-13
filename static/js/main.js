$(function(){
  var teamsRef = firebase.database().ref('teams');
  teamsRef.on('value', function(snapshot) {
    var teams = snapshot.val();
    $('#votes').html('');
    for(var t in teams){
      var tml = '<div class="vote-team">';
      tml += '<div class="vote-team-name">'+teams[t].name+'</div>';
      tml += '<div class="vote-team-votes"><div id="'+teams[t].key.toLowerCase()+'" class="votes"><span>0</span></div></div>';
      tml += '</div>';
      $('#votes').append(tml);
    }
    
  });
  
  
  var starCountRef = firebase.database().ref('messages');
  starCountRef.on('value', function(snapshot) {
    var voters = {};
    var judges = {};
    var votes = {};
    var _1stplace = "";
    
    var messages = snapshot.val();
    var msg_html = ""
    for(var k in messages){
      var teamName = messages[k].text.toLowerCase();
      if(_1stplace == ""){
        _1stplace = teamName;
      }
      votes[teamName] = votes[teamName] || 0;
      votes[teamName] += 1
      if(votes[teamName] > votes[_1stplace]){
        _1stplace = teamName;
      }
    }
    console.log(votes,_1stplace);
    for(var v in votes){
      var vp = (votes[v]/votes[_1stplace])*100;
      $('#'+v).css('width',vp+'%');
      $('#'+v+' span').html(votes[v]);
    }
    //document.getElementById('messages').innerHTML = msg_html;
  });

});