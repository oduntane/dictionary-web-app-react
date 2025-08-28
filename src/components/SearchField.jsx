import { useState } from "react"

function SearchField({onSearch}) {

    const [keyword, setKeyword] = useState("keyboard")
    const [error, setError] = useState(false)

    function handleSearch() {
        if (keyword === "") {
            setError(true)
            onSearch(null)
        } else {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
            .then((response) => response.json())
            .then((data) => onSearch(data, null))
            .then((error) => onSearch(null, error))
        }
    }

    return (
        <div className={`flex flex-col gap-2 group ${error ? 'error' : ''}`}>
            <div className="min-w-[12.5rem] w-full h-[3rem] bg-grey-100 rounded-[1rem] flex gap-4 px-[1.5rem] py-4 focus-within:border focus-within:border-purple-500 group-[.error]:border group-[.error]:border-red-500">
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} aria-label="Search Field" className="grow text-base font-bold text-grey-600 focus:outline-0 " placeholder="Search for any word..."/>
                <button className="grow-0 shrink-0" onClick={handleSearch}>
                    <span className="sr-only">Enter</span>
                    <span className="block w-4 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
                    </span>
                </button>
            </div>
            <span className="text-base font-normal hidden text-red-500 group-[.error]:block">Whoops, can't be empty</span>
        </div>
    )
}

export default SearchField