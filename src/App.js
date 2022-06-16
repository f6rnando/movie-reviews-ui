import React, { useState } from "react";
import './App.css';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [newReview, setNewReview] = useState('');
  const [allMovies, setAllMovies] = useState([]);

  const submitReview = () => {
    Axios.post('http://localhost:3001/movies/add', {
      movieName: movieName,
      movieReview: review
    }).then(() => {alert("Successful insert")});
  };

  const getMovies = () => {
    Axios.get('http://localhost:3001/movies')
      .then((result) => {
        console.log(result.data);
        setAllMovies(result.data);
      });
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/movies/delete/${id}`);
  };

  const updateReview = (id, newReview) => {
    Axios.put(`http://localhost:3001/movies/update/${id}`, {
      newReview: newReview
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <Form.Label>Movie name:</Form.Label>
        <Form.Control type="text" name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }} />
        <Form.Label>Movie review:</Form.Label>
        <Form.Control type="text" name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }} />
        <Button variant="primary" variant="success" onClick={submitReview}>
          Submit review
        </Button>
      </div>
      <div className="movies">
        <Button variant="secondary"
          onClick={getMovies}>
          Get Movies
        </Button>
        {allMovies.map((value) => {
          return (
            <div className="card" key={value.id}>
              <h1>{value.movieName}</h1>
              <p>{value.movieReview}</p>
              <div className="updateDelete">
                <Form.Control type="text" name="newReview"
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}/>
                <span>
                  <Button variant="primary"
                    onClick={() => {updateReview(value.id, newReview)}}>
                    Update Review
                  </Button>
                  <Button variant="danger"
                    onClick={() => {deleteReview(value.id)}}>
                    Delete
                  </Button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
