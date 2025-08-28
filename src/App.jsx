import { useState } from "react"
import { PlayButton, ThemeToggleButton } from "./components/buttons"
import SearchField from "./components/SearchField"

function App() {

    const [keyword, setKeyword] = useState('')
    const [definition, setDefinition] = useState(null)
    /*
        I made the initial empty state false so the SearchField error state is first on first render.
        I could have used a computed value (from the keyword) instead of creating an isEmpty state, but it wil make the SearchField's initial
        error state true on first render, and it will always show "Whoops, can't be empty..." when you first load the app
    */
    const [isEmpty, toggleEmpty] = useState(false) // 
    const [error, setError] = useState(null)

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
        <div role="application" className="min-h-dvh pt-[1.5rem] pb-[5.3125rem] bg-white flex flex-col gap-6 font-sans tablet:pt-[3.625rem] tablet:pb-[7.375rem] tablet:gap-[3.125rem]">
            <h1 className="sr-only">Dictionary Web App</h1>
            {/* Header */}
            <header className="w-[87.2%] mx-auto flex flex-col gap-[1.5rem] tablet:w-[89.71%] tablet:gap-[3.2187rem]">
                <div className="flex justify-between items-center">
                    <span role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><g fill="none" fillRule="evenodd" stroke="#838383" strokeLinecap="round" strokeWidth="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg></span>
                    <div className="inline-flex gap-[1.625rem] items-center tablet:gap-[1.625rem]">
                        <button aria-label="change application font" className="inline-flex gap-[1.3125rem] items-center tablet:gap-[1.875rem]">
                            <span className="text-sm text-grey-600 font-bold leading-[1.5rem] tablet:text-md">Sans Serif</span>
                            <span role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"><path fill="none" stroke="#A445ED" strokeWidth="1.5" d="m1 1 6 6 6-6"/></svg></span>
                        </button>
                        <span role="presentation" className="block w-[1px] h-[2rem] bg-grey-200"></span> {/* Separator */}
                        <ThemeToggleButton />
                    </div>
                </div>
                <SearchField value={keyword} error={isEmpty} onSearch={handleSearch}/>
            </header>
            {/* Main */}
            {definition !== null && error === null?
                <main className="w-[87.2%] mx-auto flex flex-col gap-8 tablet:w-[89.71%] tablet:gap-[2.5rem]" aria-live="polite">
                    <h2 className="sr-only">Word Description</h2>
                    {/* Word Header */}
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2 tablet:gap-[0.6875rem]">
                            <span className="text-2xl font-bold text-grey-600 tablet:text-3xl">{definition.word}</span>
                            <span className="text-md font-normal leading-[1.5rem] text-purple-500 tablet:text-xl">{definition.phonetic}</span>
                        </div>
                        <PlayButton />
                    </div>
                    {/* Sections: Parts of Speech */}
                    {
                        definition.meanings.map((meaning, index) => {
                            return (
                                <div className="flex flex-col gap-8 tablet:gap-8" key={index}> {/* The index is unique and does not change*/}
                                    <div className="flex gap-4 items-center">
                                        <span className="text-md font-bold text-grey-600 italic tablet:text-xl">{meaning.partOfSpeech}</span>
                                        <span role="presentation" className="block h-[1px] grow bg-grey-200"></span>
                                    </div>
                                    <div className="">
                                        <span className="block mb-4 text-base font-normal text-grey-400 tablet:text-lg tablet:mb-[1.6875rem]">Meaning</span>
                                        <ul className="mb-6 flex flex-col gap-[0.8125rem] tablet:mb-[2.5625rem]">
                                            {
                                                meaning.definitions.map((definition) => {
                                                    return (
                                                        <li className="flex gap-[1.25rem] items-start text-sm leading-[1.5rem] text-grey-600 font-normal tablet:text-md">
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
                    
                    
                    <div className="flex flex-col gap-2 border-t-[1px] border-t-grey-200 pt-6 text-sm tablet:pt-[1.3125rem] tablet:flex-row tablet:gap-[1.5625rem]">
                        <span className="underline text-grey-400">Source</span>
                        <div className="underline flex items-center gap-4 font-normal tablet:gap-2">
                            <a target="_blank" className="text-grey-600" href={`${definition.sourceUrls[0]}`}>{definition.sourceUrls[0]}</a>
                            <span role="presentation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
                            </span>
                        </div>
                    </div>
                </main> :
                <main aria-live="polite">

                </main>
            }
        </div>
    )
}

export default App