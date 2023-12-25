

const create2DArray = (x) => {
    return Array.from({ length: x }, () => Array.from({ length: x }).fill(0));
}

const generateCombinations = (arr, combinationSize) => {
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

const createArrayFrom1ToX = (x) => {
    const resultArray = [];
    for (let i = 0; i < x; i++) {
        resultArray.push(i);
    }
    return resultArray;
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const generateSchedule = (numberOfPlayers, numberOfCourts, gamesPerPlayer) => {
    if (numberOfPlayers < 4 * numberOfCourts) {
        throw new Error('not enough players!!');

    }

    const playerList = createArrayFrom1ToX(numberOfPlayers);

    const randomizedPlayers = [...playerList]
    shuffle(randomizedPlayers);

    const playHistoryTracker = create2DArray(numberOfPlayers);
    const teammateHistoryTracker = create2DArray(numberOfPlayers);
    let gamesCounter = Array.from({ length: numberOfPlayers }).fill(0);
    gamesCounter = [1, 2, 2, 0, 1, 1, 0, 0, 0, 0];
    const schedule = [];
    const hasPlayedTogether = (p1, p2) => {
        return playHistoryTracker[p1 - 1][p2 - 1] > 0;
    }
    const hasBeenTeammates = (p1, p2) => {
        return teammateHistoryTracker[p1 - 1][p2 - 1] > 0 || teammateHistoryTracker[p2 - 1][p1 - 1] > 0;
    }

    const all4PlayerCombinations = generateCombinations(randomizedPlayers, 4);



    const validTeams = (combination) => {
        const twoTeams = generateCombinations(combination, 2);
        let team1 = null;
        let team2 = null;
        twoTeams.forEach((team) => {
            if (!hasBeenTeammates(team[0], team[1])) {
                const otherTeam = combination.filter(player => {
                    return player !== team[0] && player !== team[1]
                })
                console.log('other', otherTeam)

                if (!hasBeenTeammates(otherTeam[0], otherTeam[1])) {

                    teammateHistoryTracker[team[0]][team[1]] += 1;
                    teammateHistoryTracker[team[1]][team[0]] += 1;


                    teammateHistoryTracker[otherTeam[0]][otherTeam[1]] += 1;
                    teammateHistoryTracker[otherTeam[1]][otherTeam[0]] += 1;
                    console.log('two teams', team, otherTeam)

                    team1 = team;
                    team2 = otherTeam;

                }
            }
        })
        return { team1, team2 }
    }

    const totalGames = numberOfCourts * gamesPerPlayer
    let gamesScheduled = 0;

    const findArrayWithSmallestSum = (arrays) => {
        // if (arrays.length === 0) {
        //     return null; // Return null for an empty array
        // }

        let minSum = Infinity; // Initialize minSum to positive infinity
        let minSumArray = [];

        for (const array of arrays) {
            const sum = gamesCounter[array[0]] + gamesCounter[array[1]] + gamesCounter[array[2]] + gamesCounter[array[3]]
            if (sum < minSum) {
                minSum = sum;
                minSumArray = array;
            }
        }
        return minSumArray;
    }


    for (let i = 1; i < 2;i++){

    const validCombinations = all4PlayerCombinations.filter(combo => {
        return combo.every(player => {
            return gamesCounter[player] < gamesPerPlayer;
        })
    })

    if (!validCombinations) {
        return;
    }
    for (let i = 1; i <= numberOfCourts; i++) {
        const leastCombination = findArrayWithSmallestSum(validCombinations)

        console.log('leat', leastCombination)
        const { team1, team2 } = validTeams(leastCombination);
        if (team1 && team2) {
            schedule.push([team1, team2]);
            gamesScheduled += 1;
            console.log('games', gamesScheduled);
            leastCombination.forEach(player => {
                gamesCounter[player] += 1;
            })
        }
    }

    }







    console.log('schedule', schedule)
}





