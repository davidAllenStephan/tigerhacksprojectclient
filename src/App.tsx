import React, { useCallback, useContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { MovieResults } from './Dashboard';

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
    async function getPopularMovies() {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE1MDE2MWJhMGRhY2IyN2UzYWNkYmZjYjU3YTEyNSIsInN1YiI6IjY1NDU5YmZiZDhjYzRhMDBhZDIyYjBiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6lD8y6f2-Q-aJ8dZALSCBL3uGce70xa2SqJUkuU2fgw",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        return response.json();
    }

    useEffect(() => {
        getPopularMovies().then((data) => {
            setMovieResults(data)
        });
    }, [])

    useEffect(() => {
        const selectedMovieData = movieResults.results[imageSelected] as imageDataResultsProps
        setSelectedMovieResults({ poster_path: selectedMovieData.poster_path, overview: selectedMovieData.overview, original_title: selectedMovieData.original_title, popularity: selectedMovieData.popularity, vote_average: selectedMovieData.vote_average, vote_count: selectedMovieData.vote_count, genre_ids: selectedMovieData.genre_ids })
    }, [imageSelected])

    return (
        <div className="App">
            <Dashboard selectedMovieResults={selectedMovieResults} imageSelected={imageSelected} setImageSelcted={setImageSelcted} />
        </div>
    );
}

export default App;
