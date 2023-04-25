import styles from './TagContainer.module.scss'

interface AdminTagContainerProps {
    activeTags : string[]
    removeTag : (value : string) => void
    onAdd : () => void
}

export function AdminTagContainer (
    {activeTags, removeTag, onAdd} : AdminTagContainerProps) {

    return <div className={styles.Wrapper}>
        { !!activeTags.length ?
            activeTags.map((value) => {
                return <div key={value} className={styles.Tag}>

                    <svg onClick={() => removeTag(value)} className={styles.Close} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                    <div className={styles.TagName}>{value}</div>

                </div>
            }) : <div className={styles.NoTags}>
                <div className={styles.TagName}>
                    {"Добавьте тег с помощью '+' справа"}
                </div>
            </div>
        }
        <svg onClick={() => onAdd()} className={styles.AddTag} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add Tag</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    </div>
}