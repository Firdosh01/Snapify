import React from 'react'

export default function Pagination({ page, setPage, totalPages }) {
    return (
        <div className='flex items-center justify-center gap-3'>
            {
                page > 1 && (
                    <button onClick={() => setPage(page - 1)}>Previous</button>
                )}

            {
                page < totalPages && (
                    <button onClick={() => setPage(page + 1)}>Next</button>
                )}
        </div>
    )
}
