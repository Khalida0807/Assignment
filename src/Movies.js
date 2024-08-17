import { useEffect, useState } from "react"
import ShowList from "./ShowList"



const Movies=()=>{
    const [movies,setMovies]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        setLoading(true)
        fetchMovies().then((data)=>{
        if(data.status==200){
            data.json().then((result)=>{
                setMovies(result.results)
               setLoading(false)
                
            })
            
        }
        
        })
    },[])

const fetchMovies=async()=>{
const result=await fetch('https://beta.sochcast.com/api/v1/listener/sochcast-originals')
return result

}


if(loading)return <div>loading...</div>
    return(
        <div className="flex flex-row gap-10 flex-wrap p-8 ">
            {
                movies.map((el)=><ShowList data={el} key={el.id}/>)
            }
           
        </div>
    )
}

export default Movies