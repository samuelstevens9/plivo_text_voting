$(function(){
  var teams = null;
  var judges = null;
  var config = null;
  var messages = null;
  
  var teamsRef = firebase.database().ref('teams');
  teamsRef.on('value', function(snapshot) {
    teams = snapshot.val();
    $('#votes').html('');
    for(var t in teams){
      var tml = '<div class="vote-team">';
      tml += '<div class="vote-team-name">'+teams[t].name+'</div>';
      tml += '<div class="vote-team-votes"><div id="'+teams[t].key.toLowerCase()+'" class="votes"><span>0</span></div></div>';
      tml += '</div>';
      $('#votes').append(tml);
    }
  });
  var judgeRef = firebase.database().ref('judges');
  judgeRef.on('value',function(snapshot){
    judges = snapshot.val();
  });
  var configRef = firebase.database().ref('config');
  configRef.on('value',function(snapshot){
    config = snapshot.val();
  });
  //For no we can assume ^ is finished first but may need some checks: if(teams && judges && config){ countVotes(); }
  
  var messagesRef = firebase.database().ref('messages');
  messagesRef.on('value', function(snapshot) {
    console.log(teams,judges,config);
    var voters = {};
    var votes = {};
    var _1stplace = "";
    
    messages = snapshot.val();
    var msg_html = ""
    for(var k in messages){
      var teamName = messages[k].text.toLowerCase();
      if(_1stplace == ""){
        _1stplace = teamName;
      }
      votes[teamName] = votes[teamName] || 0;
      if(judges[messages[k].from]){
        judges[messages[k].from].votes = judges[messages[k].from].votes || 0;
        if(judges[messages[k].from].votes >= config.max_judge_votes){
          continue;
        }
        judges[messages[k].from].votes += 1;
      }else{
        voters[messages[k].from] = voters[messages[k].from] || 0;
        if(voters[messages[k].from] >= config.max_votes){
          continue;
        }
        voters[messages[k].from] += 1;
      }
      
      votes[teamName] += 1
      if(votes[teamName] > votes[_1stplace]){
        _1stplace = teamName;
      }
    }
    console.log(votes,_1stplace,voters);
    for(var v in votes){
      var vp = (votes[v]/votes[_1stplace])*100;
      $('#'+v).css('width',vp+'%');
      $('#'+v+' span').html(votes[v]);
    }
    //document.getElementById('messages').innerHTML = msg_html;
  });

});