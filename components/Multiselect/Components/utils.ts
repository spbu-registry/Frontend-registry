export function isOneOf(target : string, list : string[]) {
    for (const str of list) 
        if (target === str) return true;
    
    return false;
};

export function convertHighlightedToId(parentId : string, n : number, highlighted : number | null) {
    if (highlighted === null) return null;
    else if (highlighted >= 0 && highlighted < n)
        return `${parentId}-${highlighted}`;
    else return `${parentId}-menu`;
}