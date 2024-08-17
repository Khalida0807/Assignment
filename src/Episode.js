import { useEffect } from "react";

const Episode = ({ data, isPlaying, onPlay, onAudioEnded, audioRef }) => {
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.src = data.file;
            audioRef.current.play();
        } else if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
    }, [isPlaying, data.file]);

    const handlePlay = () => {
        onPlay(); // Notify parent to update playback state
    };

    const handleAudioEnded = () => {
        onAudioEnded(); // Notify parent to handle end of playback
    };

    return (
        <div className="w-full border-2 border-black p-4 flex flex-row gap-2">
            <img src={data.episode_image} width={200} alt="Episode" />
            
            <div className="relative w-44">
                <button
                    className="absolute bottom-0 border-2 border-blue px-4 py-2 text-white rounded-lg"
                    style={{ background: "rgb(0,166,237,1)" }}
                    onClick={handlePlay}
                >
                    ▶️ Play Now
                </button>
            </div>

            {isPlaying && (
                <span>{data.name}</span>
            )}

            <audio
                ref={audioRef}
                controls
                className="w-full mb-4"
                onEnded={handleAudioEnded}
            >
                <source src={data.file} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Episode;
