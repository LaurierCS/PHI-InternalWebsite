import React from 'react';
import { Grid } from "@material-ui/core";

import './cardGrid.css';
import JobPostingCard from "./card";


// aligns cards in a grid
// currently filled with temp cards
function JobPostingGrid(){


    return (
            <Grid container class={"MuiGrid-container"}>
                <Grid item class={"MuiGrid-item"}>
                    <JobPostingCard/>
                </Grid>
                <Grid item class={"MuiGrid-item"}>
                    <JobPostingCard/>
                </Grid>
                <Grid item class={"MuiGrid-item"}>
                    <JobPostingCard/>
                </Grid>
                <Grid item class={"MuiGrid-item"}>
                    <JobPostingCard/>
                </Grid>

            </Grid>


    );

}
 export default JobPostingGrid;
