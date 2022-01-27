const API_KEY='api_key=847f1ea037d22272ce3feba2f81ea470';
const BASE_URL='https://api.themoviedb.org/3';   
const URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const searchMovie=BASE_URL+'/search/movie?'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/original';

const getMovies=async(URL)=>{
    const res=await fetch(URL);
    const data=await res.json();
    showMovies(data.results);
}

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');


getMovies(URL);
const showMovies=(data)=>{
    main.innerHTML='';
    data.forEach(movie=>{
        const {title,poster_path,vote_average,overview}=movie;
        const movieE1=document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML=`
                <img src="${IMG_URL+poster_path}" alt=""/>
                        <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>
        `  
        main.appendChild(movieE1);
    })
}

const getColor=(vote)=>{
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit',e=>{
    e.preventDefault();
    const searching=search.value;
    if(searching){
        console.log("hi")
        getMovies(searchMovie+'&query='+searching);
    }
})