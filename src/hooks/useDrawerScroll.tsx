import { useEffect, useState } from "react"

const useDrawerScroll = () => {
    const [prevYOffset, setPrevYOffset] = useState(0)
    const [prevXOffset, setPrevXOffset] = useState(0)
    const [xOffset, setXOffset] = useState(0)
    const [yOffset, setYOffset] = useState(0)

    useEffect(() => {
        const elem = document.querySelector('.drawer-content');
        if (!elem) {
            console.log('elem not found')
            return;
        }
        const onScroll = (e: Event) => {
            if (elem) {
                setPrevXOffset(xOffset)
                setPrevYOffset(yOffset)
                setXOffset(elem.scrollLeft)
                setYOffset(elem.scrollTop)
            }
        }
        elem.addEventListener('scroll', onScroll)
        return () => {
            elem?.removeEventListener('scroll', onScroll);
        }
    }, [])

    return {
        xOffset,
        yOffset,
        prevYOffset,
        prevXOffset
    }
}

export default useDrawerScroll