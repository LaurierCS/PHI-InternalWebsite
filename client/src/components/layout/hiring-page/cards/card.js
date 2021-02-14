import React from 'react';
import clsx from 'clsx';
import { makeStyles, Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {Inbox, Visibility, Delete, CheckCircle, Edit, ExpandMore, RemoveCircle} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import './card.css'

//** Requires Material-UI **
//** under construction **

function JobPostingCard() {
    const [expanded, setExpanded] = React.useState(false); // default state is collapsed (not expanded)
    const [published, setPublish] = React.useState(false); // default state is unpublished

    // supposed to handle the publish button toggle (not working rn)
    const handlePublishingClick = () => {
        setPublish(!published);
    };

    // handles the card expanding
    // TODO: expand button is not rotating when clicked
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card class="MuiCard-root">
            <CardHeader

                action={
                    <IconButton aria-label="Edit" title={"Edit Posting"}>
                        <Edit />
                    </IconButton>
                }
                title="Junior Backend Developer"
                subheader="Deadline: 02/07/2021"
            />
            <CardContent>

                <Button>
                    12 Applications
                </Button>
            </CardContent>
            <CardActions disableSpacing>

                <ToggleButton // Publish button
                    /*className={clsx(classes.publish, {
                        [classes.publish]: published,
                    })}
                    value="unpublished"
                    aria-label="publishing"
                    title={"Unpublished"}
                    onClick={handlePublishingClick}
                    */
                    >
                     <RemoveCircle />
                </ToggleButton>
                <IconButton aria-label="Inbox" title={"View Applications"}>
                    <Inbox />
                </IconButton>
                <IconButton aria-label="View as member" title={"View as member"}>
                    <Visibility/>
                </IconButton>
                <IconButton aria-label={"Delete"} title={"Delete Posting"}>
                    <Delete/>
                </IconButton>
                <IconButton // expand button
                    className={clsx(
                        class{"MuiCard-expand"}, {
                        [class{"MuiCard-expandOpen"}]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
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
    );
}

export default JobPostingCard;