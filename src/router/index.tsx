import React from 'react';
import {Switch, HashRouter} from 'react-router-dom';
import Components from "components";
import {ContextProviver} from "contexts";
import pages from "./pages";
import Public from "./public";

const Router : React.FC = () => {
    return (
        <ContextProviver>
            <React.Suspense fallback={<Components.Loader spinning={true} tip={"Loading..."} />}>
                <HashRouter>
                    <Switch>
                        {pages.map(page => (<Public exact={page.isExact} path={page.path} component={page.component} key={page.path} />))}
                    </Switch>
                </HashRouter>
            </React.Suspense>
        </ContextProviver>
    )
};

export default Router;
