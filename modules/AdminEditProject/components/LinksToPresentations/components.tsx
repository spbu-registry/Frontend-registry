
export function closeSVG (className? : string, onClick? : React.MouseEventHandler) {
    return <svg fill='#c5a7af' className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
}

export function docSVG (className? : string) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" /></svg>
}


export function mapOverMap<T1, T2, T3>(map : Map<T1, T2>, func : (key : T1, value : T2) => T3) {
    const ans : T3[] = []

    map.forEach((value, key) => {
        ans.push(func(key, value))
    })

    return ans;
}