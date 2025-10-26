import React from 'react'

const SearchInput = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default SearchInput
