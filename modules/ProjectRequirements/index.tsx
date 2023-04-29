import { useState } from "react"
import styles from './ProjectRequirements.module.scss';

// Компонент занимает 100% ширины объекта

enum Switch {
    Left, Right
}

function splitIntoP (text: string) {
    return text.split('\\n').map((value, ind) => {
        return <p key={ind + value.slice(0, 6)}>{value}</p>
    })
}

export default function ProjectRequirements (props : ProjectRequirementsProps) {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [state, setState] = useState<Switch>( Switch.Left );

    const onClick = (switchTo : Switch) => () => {
        if (!expanded) {
            setExpanded(true);
            setState(switchTo);
        }
        else if (expanded && state === switchTo) setExpanded(false);
        else {
            setLoading(true);
            setTimeout(() => {
                setState(switchTo);
                setLoading(false);
            }, props.animationTimeMs / 2);
        }

    }

    return <div className={styles.ProjectRequirements}>

        <div className={styles.Switch + ' ' + (expanded ? styles.Expanded : '')}
             style={{transitionDuration : `${props.animationTimeMs}ms`}}>
            <button
            onClick={onClick(Switch.Left)}
            aria-activedescendant={state === Switch.Left ? props.id : undefined}
            aria-details='Shows requirements in the section below'>
                <h2>Требования к исполнителю</h2>
            </button>

            <button 
            onClick={onClick(Switch.Right)}
            aria-activedescendant={state === Switch.Right ? props.id : undefined}
            aria-details='Shows requirements in the section below'>
                <h2>Требования проекта</h2>
            </button>
        </div>

        <section  id={props.id} 
            className={(expanded ? styles.Expanded : '') + ' '
                + (loading ? styles.Loading : '')}
            style={{transitionDuration : `${props.animationTimeMs / 2}ms`}}>
            {state === Switch.Left ? 
            splitIntoP(props.contractorRequirements) : 
            splitIntoP(props.projectRequirements)}
        </section>

    </div>
}

ProjectRequirements.defaultProps = {
    animationTimeMs : 1000
}