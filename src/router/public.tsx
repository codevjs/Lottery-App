import React from 'react';
import {Route} from 'react-router-dom';

type Props = {
    exact : boolean,
    component: React.FC<any>,
    path: string
}

const Public: React.FC<Props> = ({component: Component, path, exact}) => {

    return (
        <Route
            exact={exact}
            path={path}
            render={props => <Component {...props} />}
        />
    )
}

export default Public