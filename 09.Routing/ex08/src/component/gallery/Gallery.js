import React from 'react';
import * as styles from '../../assets/scss/component/Gallery.scss';
import Header from './Header';

export default function Gallery() {
    return (
        <>
            <div className={styles.Gallery}>
                <Header />
            </div>
        </>
    );
}