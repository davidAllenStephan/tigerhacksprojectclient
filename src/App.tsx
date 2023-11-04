import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { MovieResults } from './Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from './Review';
import Header from './Header';
import getPopularMovies from './api/getPopularMovies';
import getUpcomingMovies from './api/getUpcomingMovies';
import getNowplayingMovies from './api/getNowplayingMovies';
import getTopratedMovies from './api/getTopratedMovies';
import shuffle from './util/shuffle';

function App() {
    interface imageDataResultsProps {
        poster_path: string
        overview: string
        original_title: string
        popularity: number
        vote_average: number
        vote_count: number
        genre_ids: Array<number>
    }
    interface imageDataProps {
        results: Array<imageDataResultsProps>
    }
    const [selectedMovieResults, setSelectedMovieResults] = useState({ poster_path: "", overview: "", original_title: "", popularity: 0, vote_average: 0, vote_count: 0, genre_ids: [0] } as MovieResults)
    const [imageSelected, setImageSelcted] = useState(0)
    const [movieResults, setMovieResults] = useState({ results: [{ poster_path: "", overview: "", original_title: "", popularity: 0, vote_average: 0, vote_count: 0, genre_ids: [0] }] } as imageDataProps)
    const [userLikedMovies, setUserLikedMovies] = useState([] as Array<imageDataResultsProps>)
    const [selectedList, setSelectedList] = useState('popular')

    useEffect(() => {
        switch (selectedList) {
            case 'popular': getPopularMovies().then((data) => {
                data.results = shuffle(data.results)
                setMovieResults(data)
            });
                break;
            case 'upcoming': getUpcomingMovies().then((data) => {
                data.results = shuffle(data.results)
                setMovieResults(data)
            })
                break;
            case 'nowplaying': getNowplayingMovies().then((data) => {
                data.results = shuffle(data.results)
                setMovieResults(data)
            })
                break;
            case 'toprated': getTopratedMovies().then((data) => {
                data.results = shuffle(data.results)
                setMovieResults(data)
            })
        }

    }, [selectedList])

    useEffect(() => {
        const selectedMovieData = movieResults.results[imageSelected] as imageDataResultsProps
        setSelectedMovieResults({ poster_path: selectedMovieData.poster_path, overview: selectedMovieData.overview, original_title: selectedMovieData.original_title, popularity: selectedMovieData.popularity, vote_average: selectedMovieData.vote_average, vote_count: selectedMovieData.vote_count, genre_ids: selectedMovieData.genre_ids })
    }, [imageSelected])

    return (
        <div className="App">
            <Header selectedList={selectedList} setSelectedList={setSelectedList} setImageSelected={setImageSelcted} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard selectedMovieResults={selectedMovieResults} imageSelected={imageSelected} setImageSelcted={setImageSelcted} setUserLikedMovies={setUserLikedMovies} userLikedMovies={userLikedMovies} />} />
                    <Route path="/review" element={<Review />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
