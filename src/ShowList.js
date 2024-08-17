import { Link } from "react-router-dom";


const ShowList = ({ data }) => {


    return (
        <Link to={`http://localhost:3000/${data.slug}`}>
        <div className="w-56 h-128 border-2 shadow-md p-4 cursor-pointer hover:bg-gray-200 rounded-md">
            <div className="flex flex-col gap-2">
                <span className="font-bold">{data.name}</span>
                <img src={data.show_image} height={200} />
            </div>

        </div>
        </Link>
    )
}

export default ShowList