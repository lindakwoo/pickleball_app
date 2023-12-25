export const generateSchedule = (numPlayers, numCourts, gamesPerPlayer) => {
  console.log(numPlayers,numCourts,gamesPerPlayer)
    if (numPlayers < 4 * numCourts) {
      return "Error: not enough players";
    }
  
    let players = Array.from({ length: numPlayers }, (_, index) => index);
    players.sort(() => Math.random() - 0.5);
  
    let historyTracker = Array.from({ length: numPlayers }, () =>
      Array(numPlayers).fill(0)
    );
    let teamHistoryTracker = Array.from({ length: numPlayers }, () =>
      Array(numPlayers).fill(0)
    );
    let gamesCounter = Array(numPlayers).fill(0);
    let schedule = [];
  
    function hasPlayedTogether(p1, p2) {
      return historyTracker[p1][p2] > 0;
    }
  
    function hasBeenTeammates(p1, p2) {
      return teamHistoryTracker[p1][p2] > 0;
    }
  
    function validTeams(combination) {
      for (let team of combinations(combination, 2)) {
        if (!hasBeenTeammates(team[0], team[1])) {
          let remainingPlayers = new Set(combination.filter((p) => !team.includes(p)));
          let otherTeam = Array.from(remainingPlayers);
  
          if (!hasBeenTeammates(otherTeam[0], otherTeam[1])) {
            teamHistoryTracker[team[0]][team[1]] += 1;
            teamHistoryTracker[team[1]][team[0]] += 1;
  
            teamHistoryTracker[otherTeam[0]][otherTeam[1]] += 1;
            teamHistoryTracker[otherTeam[1]][otherTeam[0]] += 1;
  
            return [team, otherTeam];
          }
        }
      }
      return [null, null];
    }
  
    let totalGames = (numPlayers * gamesPerPlayer) / 4;
    let gamesScheduled = 0;
  
    while (gamesScheduled < totalGames) {
      let validCombinations = combinations(players, 4).filter((combination) => {
        return combination.every((p) => gamesCounter[p] < gamesPerPlayer);
      });
  
      if (validCombinations.length === 0) {
        break;
      }
  
      for (let _ = 0; _ < numCourts; _++) {
        if (gamesScheduled >= totalGames) {
          break;
        }
  
        let leastCombination = validCombinations.reduce((min, current) => {
          let sumCurrent = current.reduce((sum, p) => sum + gamesCounter[p], 0);
          let sumMin = min.reduce((sum, p) => sum + gamesCounter[p], 0);
          return sumCurrent < sumMin ? current : min;
        }, validCombinations[0]);
  
        let [team1, team2] = validTeams(leastCombination);
        if (!team1 || !team2) {
          continue;
        }
        schedule.push([team1, team2]);
  
        gamesScheduled += 1;
  
        for (let [p1, p2] of combinations(leastCombination, 2)) {
          historyTracker[p1][p2] += 1;
          historyTracker[p2][p1] += 1;
        }
  
        for (let p of leastCombination) {
          gamesCounter[p] += 1;
        }
      }
    }
    console.log(schedule)
  
    return schedule;
  }
  
  // Helper function to generate combinations of elements
  const combinations = (arr, combinationSize) => {
    const combinations = [];

    // Ensure combinationSize is valid
    // if (combinationSize <= 0 || combinationSize > arr.length) {
    //     console.log('Please enter a combination size greater than zero and less than or equal to the number of players')
    //     return combinations;
    // }

    // Generate combinations iteratively
    for (let i = 0; i < 1 << arr.length; i++) {
        if (i.toString(2).split('1').length - 1 === combinationSize) {
            const combination = [];
            for (let j = 0; j < arr.length; j++) {
                if ((i & (1 << j)) !== 0) {
                    combination.push(arr[j]);
                }
            }
            combinations.push(combination);
        }
    }

    return combinations;
}