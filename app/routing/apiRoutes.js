

var friendsData = require("../data/friends");


module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  
  app.post("/api/friends", function (req, res) {
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    for (var i = 0; i < friendsData.length; i++) {
      var scoresDiff = 0;
      for (var x = 0; x < newFriendScores.length; x++) {
        scoresDiff += (Math.abs(parseInt(friendsData[i].scores[x]) - parseInt(newFriendScores[x])));
      }

      scoresArray.push(scoresDiff);
}

for (var i = 0; i < scoresArray.length; i++) {
  if (scoresArray[i] <= scoresArray[bestMatch]) {
    bestMatch = i;
  }
}

var bestfriend = friendsData[bestMatch];
res.json(bestfriend)
friendsData.push(req.body);
  });

  

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendsData.length = [];
    
    res.json({ ok: true });
  });
};