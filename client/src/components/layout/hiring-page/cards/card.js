import React from 'react';
import clsx from 'clsx';
import setState from 'react';
import { makeStyles, Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Typography, Grid} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {Inbox, Visibility, Delete, CheckCircle, Edit, ExpandMore, RemoveCircle} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import './card.css';

//** under construction **

function JobPostingCard (props){
    const [expanded, setExpanded] = React.useState(false); // default state is collapsed (not expanded)

    // handles the card expanding
    // TODO: expand button is not rotating when clicked
    function handleExpandClick() {
        setExpanded(!expanded);
    };

        return (
            <Grid item class={"MuiGrid-item"}>
                <Card class="MuiCard-root">
                    <CardHeader

                        action={
                            <IconButton aria-label="Edit" title={"Edit Posting"}>
                                <Edit/>
                            </IconButton>
                        }
                        title={props.cardObject.title} // pulls title data from cardInfo array
                        subheader={"Deadline: " + props.cardObject.deadline} // pulls deadline data from cardInfo array
                    />
                    <CardContent>

                        <Button title="applications">
                            {props.cardObject.applications + " applications"}
                        </Button>
                    </CardContent>
                    <CardActions disableSpacing>

                        <ToggleButton
                            size={"small"}
                            style={{
                                borderRadius: 10,
                                padding: 7
                            }} //TODO: need to put this in the cards.css file and override the default CSS
                            selected={props.cardObject.published}
                            onClick={() => {props.changeStatus(props.cardObject._id)}}
                        >
                            {props.cardObject.published ? "Unpublish" : "Publish"}
                        </ToggleButton>
                        <IconButton aria-label="Inbox" title={"View Applications"}>
                            <Inbox/>
                        </IconButton>
                        <IconButton aria-label="View as member" title={"View as member"}>
                            <Visibility/>
                        </IconButton>
                        <IconButton aria-label={"Delete"} title={"Delete Posting"}>
                            <Delete/>
                        </IconButton>
                        <IconButton // expand button
                            className={clsx(
                                class {
                                    "MuiCard-expand"
                                }, {
                                    [class {
                                        "MuiCard-expandOpen"
                                    }]: expanded,
                                })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMore/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                test
                            </Typography>

                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
}
export default JobPostingCard;