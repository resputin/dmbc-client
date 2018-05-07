import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItineraries } from "../actions/ambassador-itineraries";
import moment from "moment";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ambassador-itinerary-carousel.css";

class AmbassadorPastItineraries extends Component {
  componentWillMount() {
    this.props.dispatch(fetchItineraries());
  }
  render() {
    let pastItinerariesList =
      this.props.itineraries &&
      this.props.itineraries.map((key, index) => {
        let myDate = Date.parse(this.props.itineraries[index].dateEnd);
        if (Date.now() > myDate) {
          return (
            <Slide
              className="ambassador-itinerary-slide"
              key={index}
              index={index}
            >
              <h4>{this.props.itineraries[index].destination.locationName}</h4>
              <h4>
                {moment(this.props.itineraries[index].dateStart).format("ll")}
              </h4>
              <h4>to</h4>
              <h4>
                {moment(this.props.itineraries[index].dateEnd).format("ll")}
              </h4>
            </Slide>
          );
        } else {
          return (
            <Slide className="ambassador-itinerary-slide">
              <h4>No Current Itineraries</h4>
            </Slide>
          );
        }
      });

    return (
      <div>
        <h1>Past Itineraries</h1>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={30}
          totalSlides={1 || this.props.itineraries.length}
          visibleSlides={2}
        >
          <Slider>{pastItinerariesList}</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading
});

export default connect(mapStateToProps)(AmbassadorPastItineraries);