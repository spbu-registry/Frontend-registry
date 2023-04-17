import styles from './Filters.module.scss';
import {Multiselect, SuggestedSearch} from '../../Multiselect';
import {Actions} from '../useFilters';
import SearchBar from '../SearchBar';
import ActiveTags from '../../ActiveTags';
import YearFilter from '../../YearFilter';

export function Filters ({state, dispatch, n} : FiltersProps) {

    return <div className={styles.Filters}>
    <div className={styles.SearchBar}>
        <SearchBar
        id='SearchForProjects'
        label='Поиск проектов'
        setInput={(value) => dispatch({
            type : Actions.SetSearch,
            payload : value
        })}
        />
    </div>
    <div className={styles.AdaptiveFilters}>
        <div className={`${styles.Place}`}>
            <Multiselect
            options={state.clinic}
            toggleOption={(key) => dispatch({
                type : Actions.ToggleClinic,
                payload : key
            })}
            id='PlaceSelect'
            lable='Клиника'
            height={5}
            />
        </div>
        <div className={`${styles.Status}`}>
            <Multiselect
                options={state.status}
                toggleOption={(key) => dispatch({
                    type : Actions.ToggleStatus,
                    payload : key
                })}
                id='StatusSelect'
                lable='Статус'
                height={4}
                />
        </div>
        
        <div className={`${styles.Sort}`}>
            <Multiselect
                options={state.sort}
                toggleOption={(key) => dispatch({
                    type : Actions.ToggleSort,
                    payload : key
                })}
                id='SortSelect'
                lable='Сортировка'
                height={2}
                />
        </div>
        <div className={`${styles.Tags}`}>
            <SuggestedSearch
            setOuterInput={(value) => dispatch({
                type : Actions.SetTagSearch,
                payload : value
            })}
            options={state.filteredTags}
            toggleOption={(key) => dispatch({
                type : Actions.ToggleTag,
                payload : key
            })}
            id='TagSelect'
            lable='Начните вводить тег'
            height={5}/>
        </div>
        <div className={`${styles.Count}`}>{n}</div>
    </div>
    <div className={styles.ActiveTagsWrapper}>
        {!!state.activeTags.length ?
            <ActiveTags
            activeTags={state.activeTags}
            toggleTag={(value) => {
                dispatch({
                    type : Actions.ToggleTag,
                    payload : value
                })
            }}
        /> : null}
    </div>
    <div className={styles.YearFilterWrapper}>
            <YearFilter/>
    </div>
    </div>
}