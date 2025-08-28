import { useRef, useState } from "react"
import { PlayButton, ThemeToggleButton } from "./components/buttons"
import SearchField from "./components/SearchField"

function App() {

    const [font, setFont] = useState("font-sans")  // values: "font-sans", "font-serif", "font-mono"
    const overlay = useRef(null)

    const [keyword, setKeyword] = useState('')
    const [definition, setDefinition] = useState(null)
    /*
        I made the initial empty state false so the SearchField error state is first on first render.
        I could have used a computed value (from the keyword) instead of creating an isEmpty state, but it wil make the SearchField's initial
        error state true on first render, and it will always show "Whoops, can't be empty..." when you first load the app
    */
    const [isEmpty, toggleEmpty] = useState(false) // 
    const [error, setError] = useState(null)

    let audioUrl;


    if (definition !== null) {
        console.log(definition.phonetics)

        audioUrl = definition.phonetics.reduce((prev, current) => {
            if (current.audio !== "") {
                return current.audio
            } else {
                return prev
            }
        }, "")
    }

    function handleSearch(keyword) {
        if (keyword === "") {
            toggleEmpty(true)
            setKeyword(keyword)
            setDefinition(null)
            toggleEmpty(true)
        } else {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
            .then((response) => response.json())
            .then((data) => {
                setDefinition(data[0])
                toggleEmpty(false)
                setKeyword(keyword)
                setError(null)
            })
            .catch((error) => {
                setDefinition(null)
                toggleEmpty(false)
                setKeyword(keyword)
                setError(error)
            })
        }
    }

    return (
        <div role="application" className={`min-h-dvh pt-[1.5rem] pb-[5.3125rem] bg-white flex flex-col gap-6 ${font} tablet:pt-[3.625rem] tablet:pb-[7.375rem] tablet:gap-[3.125rem] desktop:gap-[2.6875rem] dark:bg-grey-800`}>
            <h1 className="sr-only">Dictionary Web App</h1>
            {/* Header */}
            <header className="w-[87.2%] mx-auto flex flex-col gap-[1.5rem] tablet:w-[89.71%] tablet:gap-[3.2187rem] desktop:w-[46.0625rem]">
                <div className="flex justify-between items-center">
                    <span role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><g fill="none" fillRule="evenodd" stroke="#838383" strokeLinecap="round" strokeWidth="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg></span>
                    <div className="inline-flex gap-[1.625rem] items-center tablet:gap-[1.625rem]">
                        <div className="relative">
                            <button aria-label="change application font" className="inline-flex gap-[1.3125rem] items-center tablet:gap-[1.875rem] cursor-pointer" onClick={() => {
                                overlay.current.classList.toggle('hidden')
                                overlay.current.classList.toggle('flex')
                                
                            }}>
                                <span className="text-sm text-grey-600 font-bold leading-[1.5rem] tablet:text-md dark:text-white">{font === 'font-serif' ? 'Serif' : font === 'font-sans' ? 'Sans Serif' : 'Mono'}</span>
                                <span role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"><path fill="none" stroke="#A445ED" strokeWidth="1.5" d="m1 1 6 6 6-6"/></svg></span>
                            </button>
                            <div ref={overlay} className="absolute right-0 top-[2.9375rem] w-[11.4375rem] h-[9.5rem] z-10 p-6 hidden flex-col gap-4  text-start [&>button]:text-start bg-white shadow-[0_5px_30px_0_hsla(0,0%,0%,10%)] rounded-2xl [&>button]:text-md font-bold [&>button]:hover:text-purple-500 [&>button]:cursor-pointer dark:bg-grey-700 dark:shadow-[0_5px_30px_0_#A445ED] dark:[&>button]:text-white">
                                <button className="font-sans" onClick={() => setFont('font-sans')}>Sans Serif</button>
                                <button className="font-serif"onClick={() => setFont('font-serif')}>Serif</button>
                                <button className="font-mono" onClick={() => setFont('font-mono')}>Mono</button>
                            </div>
                        </div>
                        <span role="presentation" className="block w-[1px] h-[2rem] bg-grey-200"></span> {/* Separator */}
                        <ThemeToggleButton />
                    </div>
                </div>
                <SearchField value={keyword} error={isEmpty} onSearch={handleSearch}/>
            </header>
            {/* Main */}
            {definition &&
                <main className="w-[87.2%] mx-auto flex flex-col gap-8 tablet:w-[89.71%] tablet:gap-[2.5rem] desktop:w-[46.0625rem] desktop:gap-[2.5rem]" aria-live="polite">
                    <h2 className="sr-only">Word Description</h2>
                    {/* Word Header */}
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2 tablet:gap-[0.6875rem] desktop:gap-[0.3125rem]">
                            <span className="text-2xl font-bold text-grey-600 tablet:text-3xl dark:text-white">{definition.word}</span>
                            <span className="text-md font-normal leading-[1.5rem] text-purple-500 tablet:text-xl">{definition.phonetic}</span>
                        </div>
                        <PlayButton audioUrl={audioUrl} />
                    </div>
                    {/* Sections: Parts of Speech */}
                    {
                        definition.meanings.map((meaning, index) => {
                            return (
                                <div className="flex flex-col gap-8 tablet:gap-8" key={index}> {/* The index is unique and does not change*/}
                                    <div className="flex gap-4 items-center">
                                        <span className="text-md font-bold text-grey-600 italic tablet:text-xl dark:text-white">{meaning.partOfSpeech}</span>
                                        <span role="presentation" className="block h-[1px] grow bg-grey-200"></span>
                                    </div>
                                    <div className="">
                                        <span className="block mb-4 text-base font-normal text-grey-400 tablet:text-lg tablet:mb-[1.6875rem] desktop:mb-[1.5625rem]">Meaning</span>
                                        <ul className="mb-6 flex flex-col gap-[0.8125rem] tablet:mb-[2.5625rem] desktop:mb-[4rem]">
                                            {
                                                meaning.definitions.map((definition) => {
                                                    return (
                                                        <li className="flex gap-[1.25rem] items-start text-sm leading-[1.5rem] text-grey-600 font-normal tablet:text-md dark:text-white">
                                                            <span role="presentation" className="block h-[0.375rem] aspect-square rounded-full bg-purple-500 mt-[0.625rem]"></span>
                                                            <div className="flex flex-col gap-[0.8125rem]">
                                                                <p>{definition.definition}</p>
                                                                {definition.example && <blockquote><q>{definition.example}</q></blockquote>}
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {meaning.synonyms.length > 0 && 
                                            <div className="flex gap-6">
                                                <span className="grow-0 text-base font-normal text-grey-400">Synonyms</span>
                                                <span className="grow text-left text-base font-bold text-purple-500">{meaning.synonyms.join(", ")}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                    
                    <div className="flex flex-col gap-2 border-t-[1px] border-t-grey-200 pt-6 text-sm tablet:pt-[1.3125rem] tablet:flex-row tablet:gap-[1.5625rem] desktop:pt-[1.25rem]">
                        <span className="underline text-grey-400">Source</span>
                        <div className="underline flex items-center gap-4 font-normal tablet:gap-2">
                            <a target="_blank" className="text-grey-600 dark:text-white" href={`${definition.sourceUrls[0]}`}>{definition.sourceUrls[0]}</a>
                            <span role="presentation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
                            </span>
                        </div>
                    </div>
                </main>
            }
        </div>
    )
}

export default App