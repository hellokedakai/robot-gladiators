// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    console.log("test")
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      console.log("test")
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight

     pickedEnemyObj.health = randomNumber(40,60);

      // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      break;
    }
  }

  // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Battlebots! Come back soon!');
  }
};

var fightOrSkip = function() {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();

  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === 'skip') {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      return true;
    }
  }
  return false;
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  //keep track of who goes first
  var isPlayerTurn = true;

  //randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or run
      if(fightOrSkip()) {
        break;
      }
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      //generate random damage vlaue based on player's attack power
      var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      console.log(
        playerInfo.name + 
        ' attacked ' + 
        enemy.name + 
        '. ' + 
        enemy.name + 
        ' now has ' + 
        enemy.health + 
        ' health remaining.'
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    //player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      // remove players's health by subtracting the amount set in the enemy.attack variable
      playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
      console.log(
        enemy.name + 
        ' attacked ' + 
        playerInfo.name + 
        '. ' + 
        playerInfo.name + 
        ' now has ' 
        + playerInfo.health + 
        ' health remaining.'
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }      
    }
    //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.'
  );

  // use switch case to carry out action
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      window.alert("Refilling player's health by 20 for 7 dollars.");
      break;
    case 2:
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      shop();
      break;
  }
};

var randomNumber = function(min,max) {
  var value =Math.floor(Math.random()*(max-min+1)+min);
  return value;
}

var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log('Your robot\'s name is ' + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.moeny = 10;
    this.attack = 100;//change back to 10!
  },
  refillHealth: function() {
    this.health += 20;
    this.money -= 7;
  },
  upgradeAttack: function() {
    this.attack += 6;
    this.money -=7;
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
]


// start first game when page loads
startGame();
