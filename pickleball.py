import itertools
import random

def generate_schedule(num_players, num_courts, games_per_player):

    if num_players < 4 * num_courts :
        return "Error: not enough players"

    players = list(range(num_players)) #list of players
    random.shuffle(players)

    history_tracker = [[0] * num_players for _ in range(num_players)]  #2d list that keeps track of number of times each pair of players are in same game. Starts out as [0 0 0 0]
    team_history_tracker = [[0] * num_players for _ in range(num_players)] #keeps track of which pair of players have been teammates
    games_counter = [0] * num_players #list keeps track of number of game each player plays
    schedule = [] #list will store final game schedule
    
    def has_played_together(p1, p2):
        return history_tracker[p1][p2] > 0
    
    def has_been_teammates(p1, p2):
        return team_history_tracker[p1][p2] > 0

    def valid_teams(combination):
        for team in itertools.combinations(combination, 2):
            if not has_been_teammates(team[0], team[1]):
                remaining_players = set(combination) - set(team)
                other_team = tuple(remaining_players)

                if not has_been_teammates(other_team[0], other_team[1]):

                    team_history_tracker[team[0]][team[1]] += 1
                    team_history_tracker[team[1]][team[0]] += 1

                    team_history_tracker[other_team[0]][other_team[1]] += 1
                    team_history_tracker[other_team[1]][other_team[0]] += 1

                    return team, other_team

    #otherwise return none
        return None, None

    total_games = num_players * games_per_player // 4
    games_scheduled = 0

    print("num players: ", num_players)
    print("num courts: ", num_courts)
    print("total games: ", total_games)

    while games_scheduled <  total_games:
        

    #list to store all valid combinations for given players
        valid_combinations = [
            #add to array if the gamecount for every player is less than total expected games for every possible pair of players
            combination for combination in itertools.combinations(players,4)
            if all(games_counter[p] < games_per_player for p in combination)
        ]

        if not valid_combinations:
            break

        for _ in range(num_courts):
            if games_scheduled >= total_games:
                break

            #choose players with least # of games played
            least_combination = min(valid_combinations, key=lambda x: sum(games_counter[p] for p in x)) #min of combined number of games played for each pair
            team1, team2 = valid_teams(least_combination)
            if not team1 or not team2:
                continue
            schedule.append((team1, team2))

            games_scheduled += 1

            #update the player history tracker and games counters
            for p1, p2 in itertools.combinations(least_combination, 2):
                history_tracker[p1][p2] += 1
                history_tracker[p2][p1] += 1
            for p in least_combination:
                games_counter[p] += 1
    return schedule

schedule1 = generate_schedule(10, 2, 3)
print(schedule1)

schedule2 = generate_schedule(10, 2, 5)
print(schedule2)
schedule3 = generate_schedule(13, 2, 3)
print(schedule3)

schedule4 = generate_schedule(15, 3, 2)
print(schedule4)



print(schedule1)
print(schedule2)
print(schedule3)
print(schedule4)