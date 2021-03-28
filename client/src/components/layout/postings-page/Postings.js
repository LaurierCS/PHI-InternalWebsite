import React, { Component } from "react";
import {} from "../hiring-page/Hiring.css";

import JobUserPostingGrid from "./cards/postingCardGrid";

class Postings extends Component {
    render() {
        return (
            <div>
                <JobUserPostingGrid/>
            </div>

        );

    }
}

export default Postings;