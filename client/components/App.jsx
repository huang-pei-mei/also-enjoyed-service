import React from 'react';
import LazyLoad from 'react-lazyload';
import requests from 'axios';
import BookItem from './BookItem.jsx';
import ToggleDots from './ToggleDots.jsx';
import Modal from './Modal.jsx';
const REACT_ENV = 'dev';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookId: null,
      relatedIds: [],
      relatedIdData: [],
      isHovering: null
    };
    this.onPageToggle = this.onPageToggle.bind(this);
    this.onDotToggle = this.onDotToggle.bind(this);
    this.changeBookId = this.changeBookId.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    const bookId = this.getBookId();
    this.getBookData(bookId);
  }

  getBookId() {
    const qString = window.location.search;
    const urlParams = new URLSearchParams(qString);
    return urlParams.get('bookId');
  }

  changeBookId(id) {
    const key = encodeURIComponent('bookId');
    const value = encodeURIComponent(id);
    const paramToSet = `${key}=${value}`;
    let newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${paramToSet}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.location.reload(false);
    // this.getBookData(id);
  }

  getBookData(bookId) {
    const url = REACT_ENV === 'dev' ? 'http://localhost' : 'http://ec2-35-162-103-218.us-west-2.compute.amazonaws.com';
    requests.get(`${url}:4000/api/relatedIds/${bookId}`)
      .then((data) => {
        return this.setState({
          relatedIds: data.data.related_ids,
          bookId: bookId
        })
      })
      .then(() => {
        return this.getRelatedIdData();
      })
      .then(filteredData => {
        this.setState({
          relatedIdData: filteredData,
          isLoading: false
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getRelatedIdData() {
    const { relatedIds } = this.state;
    return requests.get('http://13.57.14.144:2002/api/books')
      .then(response => {
        return response.data.filter(book => relatedIds.includes(book.id))
      })
      .then(filteredData => {
        filteredData.forEach((book, index) => {
          book.i = index;
        });
        return filteredData;
      })
      .catch(err => {
        console.error(err);
      });
  }

  onPageToggle(e) {
    e.preventDefault();
    let data;
    if (e.target.id === 'also-enjoyed-previous') {
      if (this.state.relatedIdData[0].i === 0) {
        return;
      } else {
        data = this.state.relatedIdData;
        for (let i = 0; i < 6; i++) {
          data.unshift(data.pop());
        }
      }
    } else {
      if (this.state.relatedIdData[0].i === 12) {
        return;
      } else {
        data = this.state.relatedIdData;
        for (let i = 0; i < 6; i++) {
          data.push(data.shift());
        }
      }
    }
    this.setState({
      relatedIdData: data
    });
  }

  onDotToggle(e) {
    e.preventDefault();
    const page = parseInt(e.target.id[4]);
    if (this.state.relatedIdData[0].i / 6 === page) {
      return;
    } else {
      let data = this.state.relatedIdData;
      while(data[0].i / 6 !== page) {
        data.push(data.shift());
      }
      this.setState({
        relatedIdData: data
      });
    }
  }

  handleHover(e) {
    e.stopPropagation();
    e.preventDefault();
    const hoverTarget = parseInt(e.target.id) % 6;
    this.setState({
      isHovering: this.state.isHovering || hoverTarget === undefined || isNaN(hoverTarget) ? null : hoverTarget
    });
  }

  render() {
    const { isLoading } = this.state;
    const modalLeft = this.state.isHovering !== null ? (this.state.isHovering + 1) * (150 + 20) + 180 : 0;
    console.log('isLoading:', isLoading);

    if (isLoading) {
      return <div>Loading ...</div>;
    } else {
      const { relatedIdData } = this.state;
      console.log(relatedIdData);
      return (
        <>
          <h2 className='also-enjoyed-title'>Listeners also enjoyed...</h2>
          <div className='also-enjoyed-carousel'>
            <div className='also-enjoyed-toggle-arrows-container'>
              <span
                className='also-enjoyed-toggle-arrow'
                id='also-enjoyed-previous'
                onClick={this.onPageToggle}
              ></span>
              <span
                className='also-enjoyed-toggle-arrow'
                id='also-enjoyed-next'
                onClick={this.onPageToggle}
              ></span>
            </div>
            {relatedIdData.map((book, index) => {
              if (index < 6) {
                return <BookItem
                book={book}
                key={book.id}
                changeBookId={this.changeBookId}
                handleHover={this.handleHover}
                />;
              } else {
                return (
                <LazyLoad height={150} once key={book.id} style={{display: 'inline-block'}}>
                  <BookItem
                    book={book}
                    key={book.id}
                    changeBookId={this.changeBookId}
                    handleHover={this.handleHover}
                  />
                </LazyLoad>
                );
              }
            })}
          </div>
          <ToggleDots firstIndex={this.state.relatedIdData[0].i} onDotToggle={this.onDotToggle}></ToggleDots>
          {
            this.state.isHovering !== null &&
              <Modal
                book={this.state.relatedIdData[this.state.isHovering]}
                modalLeft={modalLeft}
              ></Modal>
          }
        </>
      );
    }
  }
}

export default App;