import React, {useEffect, useRef} from 'react'

function Test1(props) {
  let ref = useRef()

  useEffect(() => {

  }, [])

  return (
    <div ref={ref}>

    </div>
  )
}

export default Test1
