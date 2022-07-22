import { useState, useEffect } from 'react'
import { HeadingInfo, getNestedHeadings } from '../utils'

export const useHeadingData = () => {
    const [nestedHeadings, setNestedHeadings] = useState<HeadingInfo>({ text: "", id: "", level: 0, items: [] })
    useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll<HTMLHeadingElement>(".markdown-body h1, .markdown-body h2, .markdown-body h3")
        )

        const newNestedHeadings = getNestedHeadings(headingElements)
        setNestedHeadings(newNestedHeadings)
    }, [])

    return { nestedHeadings }
}
