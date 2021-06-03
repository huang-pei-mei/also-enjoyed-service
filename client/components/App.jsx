import React from 'react';

import requests from 'axios';
import BookItem from './BookItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookId: null,
      relatedIds: [],
      relatedIdData: []
    };
  }

  componentDidMount() {
    const bookId = this.getBookId();
    requests.get(`http://localhost:4000/api/relatedIds/${bookId}`)
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

  getBookId() {
    const qString = window.location.search;
    const urlParams = new URLSearchParams(qString);
    return urlParams.get('bookId');
  }

  async getRelatedIdData() {
    const { relatedIds } = this.state;
    return requests.get('http://localhost:2002/api/books')
      .then(response => {
        return response.data.filter(book => relatedIds.includes(book.id))
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { isLoading } = this.state;
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
              <span className='also-enjoyed-toggle-arrow' id='also-enjoyed-previous'></span>
              <span className='also-enjoyed-toggle-arrow' id='also-enjoyed-next'></span>
            </div>
            {relatedIdData.map((book) => {
              return <BookItem
              book={book}
              key={book.id}
              />;
            })}
          </div>
        </>
      );
    }
  }
}

export default App;