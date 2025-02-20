import React from 'react';
import SiteLayout from '../layout/SiteLayout';

export default function Error404() {
    return (
        <>
            <SiteLayout>
                <div style={{lineHeight: '200px', textAlign: 'center'}}>
                    <h2>Error404</h2>
                </div>
            </SiteLayout>
        </>
    );
}