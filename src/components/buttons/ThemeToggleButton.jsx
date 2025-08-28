
function ThemeToggleButton() {
    return (
        <div className="inline-flex gap-[0.75rem] items-center">
            <span className="sr-only" aria-live="polite">{/* TODO */}</span>
            <button className="w-[2.5rem] h-[1.25rem] bg-grey-400 rounded-[0.625rem] p-[0.1875rem]">
                <span className="sr-only">Toggle Theme</span>
                <span className="block w-[0.875rem] aspect-square bg-white rounded-full ml-0 mr-auto"></span>
            </button>
            <span role="presentation" className="w-[1.25rem] aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
            </span>
        </div>
    )
}

export default ThemeToggleButton