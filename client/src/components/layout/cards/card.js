import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import ToggleButton from '@material-ui/lab/ToggleButton';

import {Inbox, Visibility, Delete, CheckCircle, Edit} from "@material-ui/icons";
import {Button} from "@material-ui/core";

//** Requires Material-UI **
//** under construction **

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        borderRadius: 20,
        boxShadow: "5px 5px 3px",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    publish: {
        backgroundColor: "green",

    },

}));

function JobPostingCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [published, setPublish] = React.useState(false);

    const handlePublishingClick = () => {
        setPublish(!published);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
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

                <ToggleButton
                    className={clsx(classes.publish, {
                        [classes.publish]: published,
                    })}
                    value="unpublished"
                    aria-label="publishing"
                    title={"Unpublished"}
                    onClick={handlePublishingClick}
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


                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
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