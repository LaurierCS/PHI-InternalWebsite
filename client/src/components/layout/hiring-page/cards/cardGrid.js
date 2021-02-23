import React from 'react';
import {Grid} from "@material-ui/core";

import './cardGrid.css';
import JobPostingCard from "./card";


// aligns cards in a grid
// currently filled with temp cards


class JobPostingGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardData: [
                // temp data to generate cards from.
                {_id: 1, deadline: "02/07/2021", title: "Junior Backend Developer", applications: 2, published: false},
                {_id: 2, deadline: "02/09/2021", title: "Junior Frontend Developer", applications: 6, published: true},
                {_id: 3, deadline: "01/09/2021", title: "Senior Software Engineer", applications: 10, published: false}
            ]
        }
        this.handlePublish = this.handlePublish.bind(this);
    }



    //TODO: get rid of this, and pull data from database instead


    indexFinder(data, id) {
        return data._id === id;
    }


    handlePublish(id) {
        /*console.log(this.props.cardObject.published);
        console.log(id);
        console.log(event);*/
        this.setState((prevState, prevProp) => {
            let index = prevState.cardData.findIndex((data) => {
                return this.indexFinder(data, id);
            })
            let newCardData = prevState.cardData;
            console.log(newCardData);
            console.log(id);
            newCardData[index].published = !newCardData[index].published;
            return ({cardData: newCardData});
        })


    }

    /* communication with MongoDB server
    let getCardData;
    getCardData = () => {
        axios.get('/api') // communication with the server
            .then((response) => {
                const data = response.data;
                //this.setState({cards: data})
                console.log('Data has been received!');
            })
            .catch(() => { // handling error
                console.log('Error retrieving data!');
            });
    }
    */

    //TODO: dynamically render all cards in grid format
    // uses the hard-coded card objects from the cardInfo array
    render() {
        return (
            <Grid container class={"MuiGrid-container"}>
                {this.state.cardData.map((data) => {
                    return (<JobPostingCard changeStatus={this.handlePublish} cardObject={data}></JobPostingCard>)
                })}

            </Grid>
        );
    }
}

export default JobPostingGrid;
