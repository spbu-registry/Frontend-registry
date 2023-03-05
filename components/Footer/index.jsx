import React from "react";
import styles from "./Footer.module.sass";
import SvgSelector from "./SvgSelector";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <a href="https://github.com">
                <SvgSelector id="telegram"/>
            </a>
            <a href="https://vk.com">
                <SvgSelector id="vk"/>
            </a>
            <a href="https://youtube.com">
                <SvgSelector id="youtube"/>
            </a>

        </div>
    );
};

export default Footer;