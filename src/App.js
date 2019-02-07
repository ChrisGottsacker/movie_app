import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';




class App extends Component {

  componentWillMount(){
    // {this.state.movies.map((movie, index) => {
    //   return <Movie title={movie.title} poster={movie.poster} key={index}/>
    // })}
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      console.log(movie)
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        key={movie.id}/>
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }
  
  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  state = {}

  render() {
    console.log('did render')
    const { movies } = this.state;
    // same as const movies = this.state.movies;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading...'}
      </div>
    );
  }

  componentDidMount(){
    this._getMovies();

    
    // setTimeout(() => {
      // this.setState({
      //   movies: [
      //     {
      //       title: "Matrix",
      //       poster: "https://images-na.ssl-images-amazon.com/images/I/51oBxmV-dML._SL500_AC_SS350_.jpg"
      //     },
      //     {
      //       title: "Full Metal Jacket",
      //       poster: "https://images-na.ssl-images-amazon.com/images/I/41VXPrZfDXL.jpg"
      //     },
      //     {
      //       title: "Oldboy",
      //       poster: "https://images-na.ssl-images-amazon.com/images/I/51U%2BG%2BZgGgL.jpg"
      //     },
      //     {
      //       title: "Star Wars",
      //       poster: "https://imgc.allpostersimages.com/img/print/u-g-F69FKX0.jpg?w=300&h=450"
      //     },
      //     {
      //       title: "Trainspotting",
      //       poster: "https://www.interviewmagazine.com/wp-content/uploads/2012/01/img-ewan-mcgregor-new-again_171105787046-833x1000.jpg"
      //     }
      //   ]
      // })
    // }, 1000)
  }
}

export default App;
