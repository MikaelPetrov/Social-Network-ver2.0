import React from 'react';
import preloader from '../../../assets/Images/preloaderIcon.gif';

const Preloader: React.FC = () => {
    return <div style={{ width: '200px' }}>
        <img src={preloader} />
    </div>
}

export default Preloader
