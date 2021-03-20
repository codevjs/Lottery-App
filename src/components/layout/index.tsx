import React from "react";
import { Layout } from 'antd';

const BaseLayout : React.FC = (props) => {

    return (
        <Layout className={"public-layout"}>
            <Layout.Content>
                {props.children}
            </Layout.Content>
        </Layout>
    )
}

export default BaseLayout;