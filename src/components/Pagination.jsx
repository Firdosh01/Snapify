import React from 'react'

export default function Pagination({ page, setPage, totalPages }) {
    return (
        <div className='flex items-center justify-center gap-3'>
            {
                page > 1 && (
                    <button className='btn' onClick={() => setPage(page - 1)}>Previous</button>
                )}

            {
                page < totalPages && (
                    <button className='btn' onClick={() => setPage(page + 1)}>Next</button>
                )}
        </div>
    )
}
