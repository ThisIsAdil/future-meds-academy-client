import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Universities = ({ title, universities }) => {


    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('')

    const uniqueLocations = [...new Set(universities.map(university => university.location))];

    const filteredUniversities = universities.filter(university => {
        const matchesSearch = university.name.toLowerCase().includes(search.toLowerCase()) && university.location.toLowerCase().includes(location.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className='min-h-[50vh] py-4'>
            <h2 className='text-3xl mt-8 mb-4 font-bold text-(--accent-dark) text-center'>{title}</h2>
            <div className='flex gap-4 flex-wrap items-center justify-end p-4 max-w-6xl mx-auto'>
                <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className='flex-4 p-2 border border-[var(--accent-dark)] rounded-md' />
                <select name="category" value={location} onChange={(e) => setLocation(e.target.value)} className='p-2 border border-[var(--accent-dark)] rounded-md'>
                    <option value="">All Locations</option>
                    {
                        uniqueLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))
                    }
                </select>
            </div>

            <div className='flex flex-col gap-8 p-4 max-w-7xl mx-auto'>
                {filteredUniversities.length === 0 && (
                    <p className='text-center text-(--accent-dark)'>No universities found.</p>
                )}
                {filteredUniversities.map((university, index) => (
                    <div key={index} className="flex flex-wrap rounded-md bg-(--accent-light) overflow-hidden">
                        <img src={university.thumbnail} alt={`${university.name} Campus`} className="flex-1 m-4 aspect-video rounded-xl min-w-[250px] w-full object-cover" />

                        <div className="flex-1 flex flex-col gap-4 justify-evenly items-start min-w-[250px] w-full p-4">
                            <div className='flex gap-4 items-center'>
                                <img src={university.logo} alt={`${university.name} Logo`} className="h-16" />
                                <div>
                                    <h3 className="text-xl font-semibold text-(--accent-dark)">{university.name}</h3>
                                    <p className="font-light">{university.location}</p>
                                </div>
                            </div>
                            <div className='p-4 space-y-2'>
                                <p className='space-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline">
                                        <path d="M7.702 1.368a.75.75 0 0 1 .597 0c2.098.91 4.105 1.99 6.004 3.223a.75.75 0 0 1-.194 1.348A34.27 34.27 0 0 0 8.341 8.25a.75.75 0 0 1-.682 0c-.625-.32-1.262-.62-1.909-.901v-.542a36.878 36.878 0 0 1 2.568-1.33.75.75 0 0 0-.636-1.357 38.39 38.39 0 0 0-3.06 1.605.75.75 0 0 0-.372.648v.365c-.773-.294-1.56-.56-2.359-.8a.75.75 0 0 1-.194-1.347 40.901 40.901 0 0 1 6.005-3.223ZM4.25 8.348c-.53-.212-1.067-.411-1.611-.596a40.973 40.973 0 0 0-.418 2.97.75.75 0 0 0 .474.776c.175.068.35.138.524.21a5.544 5.544 0 0 1-.58.681.75.75 0 1 0 1.06 1.06c.35-.349.655-.726.915-1.124a29.282 29.282 0 0 0-1.395-.617A5.483 5.483 0 0 0 4.25 8.5v-.152Z" />
                                        <path d="M7.603 13.96c-.96-.6-1.958-1.147-2.989-1.635a6.981 6.981 0 0 0 1.12-3.341c.419.192.834.393 1.244.602a2.25 2.25 0 0 0 2.045 0 32.787 32.787 0 0 1 4.338-1.834c.175.978.315 1.969.419 2.97a.75.75 0 0 1-.474.776 29.385 29.385 0 0 0-4.909 2.461.75.75 0 0 1-.794 0Z" />
                                    </svg>
                                    {
                                        university.seatsInfo.map((info, idx) => (
                                            <span key={idx} className='font-medium'>{info.category} Seats: <span className='font-normal'>{info.seats}</span></span>
                                        ))
                                    }
                                </p>
                                <p className='space-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline">
                                        <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM6.875 6c.09-.22.195-.42.31-.598.413-.638.895-.902 1.315-.902.264 0 .54.1.814.325a.75.75 0 1 0 .953-1.158C9.772 3.259 9.169 3 8.5 3c-1.099 0-1.992.687-2.574 1.587A5.518 5.518 0 0 0 5.285 6H4.75a.75.75 0 0 0 0 1.5h.267a7.372 7.372 0 0 0 0 1H4.75a.75.75 0 0 0 0 1.5h.535c.156.52.372.998.64 1.413C6.509 12.313 7.402 13 8.5 13c.669 0 1.272-.26 1.767-.667a.75.75 0 0 0-.953-1.158c-.275.226-.55.325-.814.325-.42 0-.902-.264-1.315-.902a3.722 3.722 0 0 1-.31-.598H8.25a.75.75 0 0 0 0-1.5H6.521a5.854 5.854 0 0 1 0-1H8.25a.75.75 0 0 0 0-1.5H6.875Z" clipRule="evenodd" />
                                    </svg>
                                    <span className='font-medium'>Tuition Fees </span>
                                    {university.tuitionFees}
                                </p>
                                <p className='space-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline">
                                        <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
                                    </svg>
                                    <span className='font-medium'>Program Length: </span>
                                    {university.programLength}
                                </p>
                            </div>
                            <Link to={university.ctaLink} className='animated-button'>
                                <span className='label'>
                                    {university.cta}
                                </span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Universities