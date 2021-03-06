import React from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Events.css';

class EventsPage extends React.Component {
  state = {
    modalVisible: false,
    events: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents()  
  }

  toggleCreateModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  
  confirmModalHandler = () => {
    this.setState({ modalVisible: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      description.trim().length === 0
    ) {
      console.log('fail');
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", price: ${price}, description: "${description}", date:"${date}"}) {
            _id
            title
            description
            date
            price
            creator {
              _id
              email  
            }  
          }  
        }      
      `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
      })
      .catch(err => console.log(err));
  };

  fetchEvents = () => {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email  
            }
          }  
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res)
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        this.setState({events})
      })
      .catch(err => console.log(err));
  };

  render() {
    const eventList = this.state.events.map(event => {
      return <li key={event._id} className="events__list-item">{event.title}</li>
    })
    
    return (
      <>
        {this.state.modalVisible && <Backdrop />}
        {this.state.modalVisible && (
          <Modal
            title="create event"
            showCancel
            showConfirm
            onCancel={this.toggleCreateModal}
            onConfirm={this.confirmModalHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>share your own event</p>
            <button className="btn" onClick={this.toggleCreateModal}>
              Create Event
            </button>
          </div>
        )}
        <ul className="events__list">
        {eventList}
        </ul>
      </>
    );
  }
}

export default EventsPage;
