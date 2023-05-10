import React, { FC } from 'react';
import styles from './Footer.module.scss';
// import SvgSelector from "./SvgSelector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
  footerColor?: string;
}

const Footer: FC<FooterProps> = ({ footerColor = 'opal' }) => {
  return (
    <div className={[styles.footer, styles[`${footerColor}`]].join(' ')}>
      <a href='https://github.com'>
        <FontAwesomeIcon
          icon={faGithub}
          className={[styles.icon, styles[`${footerColor}`]].join(' ')}
        />
      </a>
      <a href='https://vk.com'>
        <FontAwesomeIcon
          icon={faVk}
          className={[styles.icon, styles[`${footerColor}`]].join(' ')}
        />
      </a>
      <a href='https://youtube.com'>
        <FontAwesomeIcon
          icon={faYoutube}
          className={[styles.icon, styles[`${footerColor}`]].join(' ')}
        />
      </a>
    </div>
  );
};

export default Footer;
