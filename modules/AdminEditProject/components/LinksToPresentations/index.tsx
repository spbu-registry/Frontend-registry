import styles from './index.module.scss';
import { closeSVG, docSVG, mapOverMap } from './components';

interface LinksToPresentationsProps {
  linksAndLabels: Map<string, string>;
  removeLink: (key: string) => void;
}

export function LinksToPresentations({
  linksAndLabels,
  removeLink,
}: LinksToPresentationsProps) {
  if (linksAndLabels.size === 0) return <div></div>;

  return (
    <>
      <div className={styles.BigLabel + ' ' + styles.Row}>
        {docSVG(styles.SVG)}
        Команды
      </div>
      <div
        className={styles.AllLinks}
        style={
          {
            '--options': Math.floor(linksAndLabels.size / 2),
          } as React.CSSProperties
        }
      >
        {mapOverMap(linksAndLabels, (label, link) => {
          return (
            <div key={label} className={styles.LinkBox}>
              <label id={label + link} className={styles.Row}>
                {label}
              </label>
              <div className={styles.Row}>
                {closeSVG(styles.SVG, () => removeLink(label))}
                <a
                  className={styles.Link}
                  aria-labelledby={label + link}
                  href={link}
                >
                  презентация команды
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
