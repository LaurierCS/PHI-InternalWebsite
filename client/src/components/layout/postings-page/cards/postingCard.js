import React from "react";
import clsx from "clsx";
import setState from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import {
  Inbox,
  LocationOn,
  Delete,
  CheckCircle,
  Bookmark,
  ExpandMore,
  RemoveCircle,
  Book,
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import "./postingCard.css";

//** under construction **

function JobUserPostingCard(props) {
  const [expanded, setExpanded] = React.useState(false); // default state is collapsed (not expanded)

  // handles the card expanding
  // TODO: expand button is not rotating when clicked
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Grid item class={"MuiGrid-item"}>
      <Card class="MuiCard-root">
        <CardHeader
          title={props.cardObject.title} // pulls title data from cardInfo array
          subheader={"Date Posted: " + props.cardObject.datePosted} // pulls deadline data from cardInfo array
        />
        <CardContent>
          <LocationOn />
          {props.cardObject.location}
        </CardContent>
        <CardActions disableSpacing>
          <ToggleButton
            size={"small"}
            style={{
              borderRadius: 10,
              padding: 7,
            }} //TODO: need to put this in the cards.css file and override the default CSS
            selected={props.cardObject.applied}
            onClick={() => {
              props.changeStatus(props.cardObject._id);
            }}
          >
            {props.cardObject.applied ? "Cancel" : "Apply"}
          </ToggleButton>
          <IconButton aria-label="Bookmark" title={"View Applications"}>
            <Bookmark />
          </IconButton>
          <IconButton // expand button
            className={clsx(
              class {
                "MuiCard-expand";
              },
              {
                [class {
                  "MuiCard-expandOpen";
                }]: expanded,
              }
            )}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>test</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
export default JobUserPostingCard;
