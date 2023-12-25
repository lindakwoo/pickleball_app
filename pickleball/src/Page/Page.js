import React from "react";
import { generateSchedule } from "../utils";

const Page = () => {
    generateSchedule(10, 2, 5);
    return (
        <div>Leo and Linda's new pickleball app!</div>
    )
};

export default Page;
