import React from 'react'
import Loader from './Loader'

const LoaderPage = () => (
  <div className='app loading-page'>
    <main className='main'>
      <Loader />
      Loading...
    </main>
  </div>
)

export default LoaderPage
