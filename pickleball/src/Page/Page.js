import React from "react";

const Page = () => {
    const HandleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Leo and Linda's new pickleball app!</h1>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label>
                        Number of Players:
                        <input type="number" />
                    </label>
                </div>

                <div>
                    <label>
                        Number of Courts:
                        <input type="number" />
                    </label>
                </div>

                <div>
                    <label>
                        Games per Player:
                        <input type="number" />
                    </label>
                </div>

                <button type="Submit">Generate Schedule</button>

            </form>

            <div>
                <h2>Schedule: </h2>

            </div>
        </div>

    )
};

export default Page;
