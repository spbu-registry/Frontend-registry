import React from "react";
import styles from "./Footer.module.sass";
// import SvgSelector from "./SvgSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faVk} from "@fortawesome/free-brands-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <div className={styles.footer}>
            <a href="https://github.com">
                <FontAwesomeIcon icon={faGithub} className={styles.icon} />
            </a>
            <a href="https://vk.com">
                <FontAwesomeIcon icon={faVk} className={styles.icon} />
            </a>
            <a href="https://youtube.com">
                <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
            </a>
        </div>
    );
};

export default Footer;