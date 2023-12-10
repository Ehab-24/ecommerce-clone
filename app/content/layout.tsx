import React from 'react'

const Contentlayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='m-7'>
      {children}
    </div>
  )
}

export default Contentlayout
