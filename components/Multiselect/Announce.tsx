export default function Announce ({n} : AnnounceProps) {
    return <div style={{display : 'none'}} aria-live='polite'>
        {
            n === 0 ?
            'No suggestions found' :
            `${n} suggestions found, use up and down to review`
        }
    </div>
}