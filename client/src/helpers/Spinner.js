import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Spinner = () => {
    return (
        <Loader
            type="TailSpin"
            color="#0a4a69"
            height={50}
            width={50}
        />
    )
}

export default Spinner
