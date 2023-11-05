

const putUserLikedMovies = async (user_id: String, liked_movies: Array<String>) => {
    console.log(user_id)
    const response = await fetch(`http://localhost:4000/users/${user_id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `[${liked_movies}]`
    });
    return response.json();
}

export default putUserLikedMovies
