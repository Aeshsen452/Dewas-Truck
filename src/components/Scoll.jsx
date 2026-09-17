import React, { useEffect } from 'react'
import { ArrowBigUpDash,ArrowBigDownDash } from 'lucide-react'
import { scrollTop, scrollDown } from '../utils/Scroll'
import { useState } from 'react'


const Scroll = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);




    return (
        <>
            {(scrollPosition > 550) ?


                <div className="bg-green-700 text-white bottom-10 fixed right-10 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer " onClick={scrollTop}>  <ArrowBigUpDash />   </div>
                :
                <div className="bg-green-700 text-white bottom-10 fixed right-10 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer " onClick={scrollDown}>  <ArrowBigDownDash />   </div>
            }
        </>
    )
}

export default Scroll