const APIKey =  'bbd6db2f'
const API = "http://www.omdbapi.com/?i=tt3896198&apikey=bbd6db2f"

let movieNameRef = document.getElementById("movie-name")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById('result')


//function to fetch data from api
let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?apikey=${APIKey}&t=${movieName})`

    //if input field is empty

    if(movieName.length <= ''){
        result.innerHTML = `<h3 class="msg"> Please enter a movie name</h3>`;
    }
    // if input is not empty
    else{
        fetch(url).then((rep) => rep.json()).then((data) =>{
            // if movie exist in the database
            if(data.Response == "True"){
                result.innerHTML = `
                    <div class= "info">
                        <img src="${data.Poster}" class = "poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class= "rating">
                                <img src = "star.png">
                                <h4>${data.imdbRating} </h4>
                            </div>
                            <div class = "details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                                <div class = "gerne">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `
            }
            // if movie does not exist in the database
            else{
                result.innerHTML=`<h3 class="msg">${data.Error}</h3>`
            }
        })
        //if error occurs
        .catch(() => {
            result.innerHTML = '<h3 class ="msg">Something went wrong, please try again later.</h3>'
        })
    }
}

searchBtn.addEventListener('click', getMovie);
window.addEventListener("load", getMovie);