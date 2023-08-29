import React from 'react'

export default function Images({ image }) {
    return (
        <div>
            <img
                key={image.id}
                src={image.urls.full}
                alt={image.alt_description}
                className='object-cover w-full rounded-lg shadow-md h-72'
                loading='lazy'
            />
        </div>
    )
}
