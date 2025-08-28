
function PlayButton({audioUrl}) {
    return (
        <button onClick={() => {
            if (audioUrl.startsWith("http")) {
                (new Audio(audioUrl)).play()
            } else {
                try {
                    const utterance = new SpeechSynthesisUtterance(audioUrl)
                    window.speechSynthesis.speak(utterance)
                } catch {
                    //
                }
            }
            
        }}>
            <span className="sr-only">Listen</span>
            <span role="presentation">
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
            </span>
        </button>
    )
}

export  default PlayButton