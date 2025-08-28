import { useState } from "react"

function SearchField({value, error, onSearch }) {

    /*
        I created a keyword state because I don't want to bind the value from the parent directly to
        the input element and update it when the input value changes, so I created a new state with
        an initial value from the Parent component and only change it when the button is clicked.
        As long as another component is not changing the value outside the SearchField component, the
        value from the Parent will always be in sync with the SearchField component.
    */
    const [keyword, setKeyword] = useState(value)

    return (
        <div className={`flex flex-col gap-2 group ${error ? 'error' : ''}`}>
            <div className="min-w-[12.5rem] w-full bg-grey-100 dark:bg-grey-700 rounded-[1rem] flex gap-4 px-[1.5rem] py-[0.875rem] focus-within:border focus-within:border-purple-500 group-[.error]:border group-[.error]:border-red-500 tablet:py-[1.3125rem]">
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} aria-label="Search Field" className="grow text-base font-bold text-grey-600 focus:outline-0 tablet:text-lg dark:text-white" placeholder="Search for any word..."/>
                <button className="grow-0 shrink-0" onClick={() => onSearch(keyword)}>
                    <span className="sr-only">Enter</span>
                    <span className="block w-4 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
                    </span>
                </button>
            </div>
            <span className="text-base font-normal hidden text-red-500 group-[.error]:block">Whoops, can't be empty</span>
        </div>
    )
}

export default SearchField