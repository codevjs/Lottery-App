import React from 'react';

interface Pages {
    path      : string,
    isExact  : boolean,
    component : React.LazyExoticComponent<React.FC>
}

let pages : Pages[] = [
    {
        path      : "/",
        isExact   : true,
        component : React.lazy(() => import('../pages/home')),
    },
    {
        path      : "/view",
        isExact   : true,
        component : React.lazy(() => import('../pages/view')),
    }
]

export default pages