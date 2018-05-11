import React from 'react';
import {connect} from 'react-redux';


import {addCard} from '../actions/cards';
import requiresLogin from '../requires-login';
import { setToolbeltDisplay } from '../actions/dashboard';
import Background from '../assets/barPlaceHolder.jpg'


export class CreateCard extends React.Component {
  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    const distance = this.props.destination.distance;
    return (
      <div className="create-card-form">
        <form
          onSubmit={event => {
            event.preventDefault();
            let card = {
              name: this.name.value,
              address: this.address.value,
              description: this.description.value,
              hours: this.hours.value,
              latitude: this.props.latitude,
              longitude: this.props.longitude
            };
            this.props.dispatch(addCard(card, distance))
            this.props.dispatch(setToolbeltDisplay('cards'));
          }}>
          <h4>Create a Card</h4>
          <div className='card-container-expanded' key={this.props.index}>
          <div className='card-header' style={{'backgroundImage':`url(${Background})`}}>
            <div className="card-title">
              <span className='place-name'>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={this.props.name}
                  ref={input => this.name = input}
                />
              </span>
              <span className='card-blurb'>
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={this.props.location}
                  ref={input => this.address = input}
                />
              </span>
            </div>
          </div>
          <div className='place-tags'>
            <ul>
              {placeTags}
            </ul>
          </div>
          <div>
            <div className='card-body'>
              <span className='blurb-header'>Details</span>
              <span className='card-blurb'>
                <textarea
                  name="description"
                  id="description"
                  placeholder="description"
                  maxLength="100"
                  required
                  ref={input => this.description = input}
                />
              </span>
              <span className='card-blurb'>
                <input
                  type="text"
                  name="hours"
                  id="hours"
                  defaultValue="something"
                  ref={input => this.hours = input}
                />
              </span>
            </div>
            <div className='card-controls'>
              <button>Create</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination
});

export default requiresLogin()(connect(mapStateToProps)(CreateCard));