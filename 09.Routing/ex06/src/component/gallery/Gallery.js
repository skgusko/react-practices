import React from 'react';
import * as styles from '../../assets/scss/component/Gallery.scss';
import SiteLayout from '../../layout/SiteLayout';


export default function Gallery() {
    return (
        <>
            <SiteLayout>
                <div className={styles.Gallery}>
                    <Header />
                    <p>갤러리 입니다.</p>
                </div>
            </SiteLayout>
        </>
    );
}