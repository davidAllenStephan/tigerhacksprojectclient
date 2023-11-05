import genres from './data/genres';
import { getGenres } from './Dashboard';
import { Grid } from '@mui/material';

const Qualities = ({ userLikedMovies }) => {
    const determineFavoriteGenre = () => {
        const favoriteGenresIds = []
        const genreCounts = {}
        for (let i = 0; i < userLikedMovies.length; i++) {
            const likedMovie = userLikedMovies[i]
            for (let j = 0; j < likedMovie.genre_ids.length; j++) {
                if (genreCounts[likedMovie.genre_ids[j]]) {
                    genreCounts[likedMovie.genre_ids[j]] += 1
                } else {
                    genreCounts[likedMovie.genre_ids[j]] = 1
                }
            }
        }
        const uniqueGenres = Object.keys(genreCounts)
        let first, second, third;
        third = first = second = Number.MIN_VALUE;
        for (let i = 0; i < uniqueGenres.length; i++) {
            if (genreCounts[uniqueGenres[i]] > first) {
                third = second;
                second = first;
                first = genreCounts[uniqueGenres[i]];
                favoriteGenresIds[2] = favoriteGenresIds[1]
                favoriteGenresIds[1] = favoriteGenresIds[0]
                favoriteGenresIds[0] = uniqueGenres[i];
            }
            else if (genreCounts[uniqueGenres[i]] > second) {
                third = second;
                second = genreCounts[uniqueGenres[i]]
                favoriteGenresIds[1] = favoriteGenresIds[0]
                favoriteGenresIds[1] = uniqueGenres[i]
            }
            else if (genreCounts[uniqueGenres[i]] > third) {
                third = genreCounts[uniqueGenres[i]];
                favoriteGenresIds[2] = uniqueGenres[i]
            }
        }
        const result = getGenres(favoriteGenresIds)
        return result
    }


    const determineHighestRatedMovies = () => {
        const highestRatedMovies = []
        let first, second, third
        third = first = second = Number.MIN_VALUE
        for (let i = 0; i < userLikedMovies.length; i++) {
            if (userLikedMovies[i].vote_average > first) {
                third = second;
                second = first;
                first = userLikedMovies[i].vote_average
                highestRatedMovies[2] = highestRatedMovies[1]
                highestRatedMovies[1] = highestRatedMovies[0]
                highestRatedMovies[0] = { "title": userLikedMovies[i].original_title, "rating": userLikedMovies[i].vote_average }
            }
            else if (userLikedMovies[i].vote_average > second) {
                third = second;
                second = userLikedMovies[i].vote_average
                highestRatedMovies[1] = highestRatedMovies[0]
                highestRatedMovies[1] = { "title": userLikedMovies[i].original_title, "rating": userLikedMovies[i].vote_average }

            }
            else if (userLikedMovies[i].vote_average > third) {
                third = userLikedMovies[i].vote_average
                highestRatedMovies[2] = { "title": userLikedMovies[i].original_title, "rating": userLikedMovies[i].vote_average }

            }

        }
        return highestRatedMovies
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid container gap={30}>
                <Grid item>
                    <h1 style={{ fontSize: 50 }}>Top Three Genres</h1>
                    {
                        determineFavoriteGenre().map((genre, i) => {
                            return (
                                <h2 style={{ fontSize: 30, textAlign: "left" }}>{i + 1}. {genre}</h2>
                            )
                        })
                    }
                </Grid>
                <Grid item>
                    <h1 style={{ fontSize: 50 }}>Top Three Rated Movies</h1>
                    {
                        determineHighestRatedMovies().map((movie, i) => {
                            return (
                                <div>
                                    <h2 style={{ fontSize: 30, textAlign: "left" }}>{i + 1}. {movie.title}-------{movie.rating} rating</h2>
                                </div>

                            )
                        })
                    }
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div >
    )
}

export default Qualities
