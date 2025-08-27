
function SearchField() {
    return (
        <div className="min-w-[12.5rem] w-full h-[3rem] bg-grey-100 rounded-[1rem] flex gap-4 px-[1.5rem] py-4">
            <input aria-label="Search Field" className="grow" placeholder="Search for any word..."/>
            <button className="grow-0 shrink-0">
                <span className="sr-only">Enter</span>
                <span className="block w-4 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
                </span>
            </button>
        </div>
    )
}

export default SearchField