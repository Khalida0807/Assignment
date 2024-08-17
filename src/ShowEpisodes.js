import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Episode from "./Episode";

const ShowEpisodes = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(null); // State for tracking the currently playing episode
    const audioRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchEpisodes().then((result) => {
            if (result.status === 200) {
                result.json().then((data) => {
                    setList(data.results);
                    setLoading(false);
                });
            }
        });
    }, [id]);

    const fetchEpisodes = async () => {
        const episodes = await fetch(`https://beta.sochcast.com/api/v1/listener/show/${id}`);
        return episodes;
    };

    const handlePlay = (index) => {
        if (currentPlaying !== index) {
            setCurrentPlaying(index); // Set the currently playing episode
        } else {
            setCurrentPlaying(null); // Stop playing if the same episode is clicked
        }
    };

    const handleAudioEnded = () => {
        if (currentPlaying < list.length - 1) {
            setCurrentPlaying(prevIndex => prevIndex + 1); // Play next episode
        } else {
            setCurrentPlaying(null); // Reset if the last episode ends
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-5 p-8">
            {list.map((el, index) => (
                <Episode
                    key={el.id}
                    data={el}
                    index={index}
                    isPlaying={currentPlaying === index}
                    onPlay={() => handlePlay(index)}
                    onAudioEnded={handleAudioEnded}
                    audioRef={audioRef}
                />
            ))}
        </div>
    );
};

export default ShowEpisodes;
