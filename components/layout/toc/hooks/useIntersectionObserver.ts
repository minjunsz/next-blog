import { useEffect, useRef } from 'react'

type SetActiveIdFnc = (id: string) => void;

export const useIntersectionObserver = (setActiveId: SetActiveIdFnc) => {
    const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

    useEffect(() => {
        const callback = (headings: IntersectionObserverEntry[]) => {
            headingElementsRef.current = headings.reduce(
                (map, headingElement) => {
                    map[headingElement.target.id] = headingElement;
                    return map;
                }, headingElementsRef.current)


            const visibleHeadings = Array<IntersectionObserverEntry>();
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) {
                    visibleHeadings.push(headingElement);
                }
            });

            const getIndexFromId = (id: string) =>
                headingElements.findIndex((heading) => heading.id === id);

            if (visibleHeadings.length > 0) {
                const topHeadingIndex = visibleHeadings.reduce(
                    (iMin, x, i, arr) => {
                        const currentIndex = getIndexFromId(x.target.id);
                        const prevMinIndex = getIndexFromId(arr[iMin].target.id);
                        return currentIndex < prevMinIndex ? i : iMin;
                    }, 0);

                setActiveId(visibleHeadings[topHeadingIndex].target.id);
            }
        }

        const observer = new IntersectionObserver(callback, {
            rootMargin: "0px 0px -20% 0px", // top 110px, bot 40% 범위 제외
        });

        const headingElements = Array.from(document.querySelectorAll(".markdown-body h1, .markdown-body h2, .markdown-body h3"));
        headingElements.forEach((element) => observer.observe(element))

        return () => { observer.disconnect() }
    }, [])
}