import React from "react";
import {Spin} from "antd";
import "assets/styles/loader.less";

interface Props {
    tip: string,
    spinning: boolean
}

const Spinner: React.FC<Props> = ({spinning, tip}) => {
    return (
        <div className={"spinner-container"}>
            <Spin
                className={"spin"}
                size={"large"}
                spinning={spinning}
                tip={tip}
            />
        </div>
    )
};

export default Spinner;