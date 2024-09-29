export interface Movie{
    id:string,
    title:string;
    descr:string;
    casts:string[];
    genre:string[];
    tags:string[];
    rating:string;
    release:string;
}

const filter = (movie:Movie,search:string,year:string | undefined) => {
    const bySearch = movie.title.toLocaleLowerCase().replaceAll(" ","_").startsWith(search.replaceAll(" ","_")) || movie.title.toLocaleLowerCase().replaceAll(" ","_").includes(search.replaceAll(" ","_")) || movie.descr.toLocaleLowerCase().replaceAll(" ","_").startsWith(search.replaceAll(" ","_")) || movie.casts.join("").toLocaleLowerCase().replaceAll(" ","_").includes(search.replaceAll(" ","_"))
    const byYear =year ? movie.release === year : true
    // const byTag = movie.tags.some(x=>tags.includes(x.toLocaleLowerCase()))
    return {bySearch,byYear}
}
export const filterMovies = (movies:Movie[],search:string,year:string | undefined) => {
    const filterredMovies = movies.filter(movie=>{
        const {bySearch,byYear} = filter(movie,search,year)
        if(year){
                if (search) {
                    return byYear && bySearch
                }
                return byYear
        }
        if(search) return  bySearch
        return bySearch
    })
    return filterredMovies
}