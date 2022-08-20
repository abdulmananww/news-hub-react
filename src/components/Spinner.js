import React from 'react'
import loader from './loading.gif'
const Spinner = ()=> {
    return (
      <div className='text-center'>
        <img style={{height:'50px'}} src={loader} alt="loading" />
      </div>
    )
}

export default Spinner