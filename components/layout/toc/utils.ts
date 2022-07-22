export interface HeadingInfo {
    text: string;
    id: string;
    level: number;
    items: HeadingInfo[];
}

export function getNestedHeadings(headings: readonly HTMLHeadingElement[]): HeadingInfo {
    const wrapper: HeadingInfo = { text: "", id: "", level: 0, items: [] };

    let lastEntry = wrapper;
    let stack = Array<HeadingInfo>();

    for (const h of headings) {
        const hLevel = getHeadingLevel(h)
        const entry = {
            text: h.innerText,
            id: h.id,
            level: hLevel,
            items: []
        }

        while (hLevel <= lastEntry.level) {
            lastEntry = stack.pop()!
        }

        lastEntry.items.push(entry)
        stack.push(lastEntry)
        lastEntry = entry
    }

    return wrapper
}

function getHeadingLevel(e: HTMLHeadingElement): number {
    return parseInt(e.tagName[1]);
}