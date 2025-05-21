import axios from "axios";


//url da api
//base url = https://api.themoviedb.org/3
// https://api.themoviedb.org/3/movie/now_playing?api_key=aac6403467be615d65e4e8ae9d19ad41&language-pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;