import React, {useEffect, useRef} from 'react'

import init from '../src/anim'

export default function Test2(props) {
    const ref = useRef()

    useEffect(()=> {
        init(ref.current)
    }, [])

    return (
        <div ref={ref} style={{width: 1400, height: 600, background: '#000'}}>

        </div>
    )
}
