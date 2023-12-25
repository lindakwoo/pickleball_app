import React, { useState, useEffect } from "react";
import { generateSchedule } from "../utils";

const Page = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState();
    const [numberOfCourts, setNumberOfCourts] = useState();
    const [gamesPerPlayer, setGamesPerPlayer] = useState();
    const [schedule, setSchedule] = useState();
   
    const HandleSubmit = (e) => {
        e.preventDefault();
        setSchedule(generateSchedule(numberOfPlayers, numberOfCourts, gamesPerPlayer));
        console.log(schedule)
    }
    const handleNumberOfPlayers = (e) => {
        console.log(e.target.value)
    setNumberOfPlayers(e.target.value-0)
    }

    const handleNunberOfCourts = (e) => {
        console.log(e.target.value)
    setNumberOfCourts(e.target.value-0)
    }

    const handleNumberOfGames = (e) => {
        console.log(e.target.value)
    setGamesPerPlayer(e.target.value-0)
    }

    useEffect(() => {
        console.log(schedule);
      }, [schedule]);

    return (
        <div>
            <h1>Leo and Linda's new pickleball app!</h1>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label>
                        Number of Players:
                        <input onChange = {handleNumberOfPlayers} type="number" />
                    </label>
                </div>

                <div>
                    <label>
                        Number of Courts:
                        <input type="number" onChange={handleNunberOfCourts} />
                    </label>
                </div>

                <div>
                    <label>
                        Games per Player:
                        <input type="number" onChange={handleNumberOfGames} />
                    </label>
                </div>

                <button type="Submit">Generate Schedule</button>

            </form>

            <div>
                <h2>Schedule: </h2>
                {schedule && schedule?.map(games => {
                   return(<div>{games}</div>)
               })}

            </div>
        </div>

    )
};

export default Page;
