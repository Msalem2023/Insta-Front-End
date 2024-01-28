import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
function Slider(props) {
    const carouselRef = useRef()
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }, [])
    console.log(width)
    return (
        <motion.div className='carousel' ref={carouselRef}>
            <motion.div className='inner ' drag="x" dragConstraints={{ right: 0, left: -width }} whileTap={{ cursor: "grabbing" }}>
                {props?.img.map((e, i) => {
                    return <motion.div className='item'>
                        <img src={`http://localhost:4000/uploads/user/posts/${e}`} alt="..." />
                    </motion.div>
                })}

            </motion.div>
        </motion.div>
    )
}

export default Slider