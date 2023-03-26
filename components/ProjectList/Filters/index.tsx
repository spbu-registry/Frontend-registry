import styles from './Filters.module.scss';
import Multiselect from '../../Multiselect';
import TagFilter from '../../TagFilter';
import { useState } from 'react';

export function Filters () {

    const [activeTags, setActiveTags] = useState<string[]>([]);

    const [placeMap, setPlaceMap] = useState(new Map([
        ['ИТ-Клиника', false], 
        ['Клиника цифрового сопровождения образовательных проектов СПБГУ', false], 
        ['Лингвистическая клиника', false], 
        ['Архивный центр', false], 
        ['Психологическая клиника', false], 
        ["Клиника коммуникационных проектов", false]]
    ));

    const [statusMap, setStatusMap] = useState(new Map([
        ['Набор открыт', false], 
        ['Набор закрыт', false], 
        ['Активный', false], 
        ['Завершен', false]] 
    ));

    const [sortMap, setSortMap] = useState(new Map([
        ['Сначала новые', false], 
        ['Сначала старые', false]]
    ));


    return <div className={styles.Filters}>
    <div className={styles.AdaptiveFilters}>
        <div className={`${styles.Place}`}>
            <Multiselect
            options={placeMap}
            setOption={(key, value) => setPlaceMap( prevState => {
                const newState = new Map(prevState);
                newState.set(key, value)
                return newState;
              })}
            id='PlaceSelect'
            lable='Клиника'
            height={5}
            />
        </div>
        <div className={`${styles.Status}`}>
            <Multiselect
                options={statusMap}
                setOption={(key, value) => setStatusMap( prevState => {
                    const newState = new Map(prevState);
                    newState.set(key, value)
                    return newState;
                })}
                id='StatusSelect'
                lable='Статус'
                height={4}
                />
        </div>
        
        <div className={`${styles.Sort}`}>
            <Multiselect
                options={sortMap}
                setOption={(key, value) => setSortMap( prevState => {
                    const newState = new Map(prevState);
                    newState.set(key, value)
                    return newState;
                })}
                id='SortSelect'
                lable='Сортировка'
                height={2}
                />
        </div>
        <div className={`${styles.Tags}`}>
            <TagFilter activeTags={activeTags} setActiveTags={setActiveTags} />
        </div>
        <div className={`${styles.Box} ${styles.Count}`}>
        </div>
    </div>
    </div>
}