const getNowplayingMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
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

export default getNowplayingMovies
