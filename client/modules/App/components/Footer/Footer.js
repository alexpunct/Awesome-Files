import React from 'react';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <p>Created by Alex Bejan</p>
      <p><a href="https://github.com/alexpunct/Awesome-Files" target="_Blank">https://github.com/alexpunct/Awesome-Files</a></p>
    </div>
  );
}

export default Footer;
