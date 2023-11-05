import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button, Paper } from '@mui/material';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import genres from './data/genres';

export interface MovieResults {
    poster_path: string
    overview: string
    original_title: string
    popularity: number
    vote_average: number
    vote_count: number
    genre_ids: Array<number>
}

interface DashboardProps {
    selectedMovieResults: MovieResults
    imageSelected: any
    setImageSelcted: any
    setUserLikedMovies: any
    userLikedMovies: any
}
export const getGenres = (genreIds: Array<number>) => {
    const myGenre = []
    for (let i = 0; i < genres.length; i++) {
        for (let j = 0; j < genreIds.length; j++) {
            if (genres[i].id == genreIds[j]) {
                myGenre.push(genres[i].name)
            }
        }
    }
    return myGenre
}
export default function Dashboard({ selectedMovieResults, imageSelected, setImageSelcted, setUserLikedMovies, userLikedMovies }: DashboardProps) {

    const navigate = useNavigate();



    const likeMovie = () => {
        setImageSelcted(imageSelected + 1)
        userLikedMovies.push(selectedMovieResults)
        setUserLikedMovies(userLikedMovies)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    backgroundColor: "#FEF9EF",
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: "100px" }}>
                    <Grid item xs={3} sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={() => setImageSelcted(imageSelected + 1)} sx={{ marginLeft: "130px" }}>
                            <SentimentVeryDissatisfiedIcon sx={{ height: "100px", width: "100px", color: "red" }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ left: 1150, top: 90, borderBottom: "5px solid black", position: "absolute", width: "120px", height: "120px", rotate: "45deg", transformOrigin: "100% 0", zIndex: 200 }}></div>
                        <div style={{ left: 1050, top: 10, borderBottom: "5px solid black", position: "absolute", width: "120px", height: "120px", rotate: "-45deg", transformOrigin: "100% 0", zIndex: 200 }}></div>
                        <Box sx={{ border: 15 }}>
                            <Paper sx={{ paddingTop: "50px", paddingBottom: "50px" }}>
                                <Grid container height="100%" gap={0}>
                                    <Grid item xs={6} height="100%">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${selectedMovieResults.poster_path}`}
                                            alt="new"
                                            width="70%"
                                            height="70%"
                                            style={{ marginLeft: "125px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ textAlign: "center" }}>
                                            <h1>{selectedMovieResults.original_title}</h1>
                                        </div>
                                        <div style={{ marginRight: "30px", fontSize: 23 }}>
                                            <p>{selectedMovieResults.overview}</p>
                                        </div>
                                        <div>
                                            <h2>Rating {selectedMovieResults.vote_average}</h2>
                                        </div>
                                        <div>
                                            {
                                                getGenres(selectedMovieResults.genre_ids).map((genreName) => (
                                                    <span>{genreName}</span>
                                                ))
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton onClick={() => likeMovie()} sx={{ marginLeft: "130px" }}>
                            <SentimentSatisfiedAltIcon sx={{ height: "100px", width: "100px", color: "green" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Button onClick={() => navigate('/review')}>
                Go to review
            </Button>
        </Box>
    );
}
