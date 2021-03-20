const CracoLessPlugin     = require('craco-less');
const {getThemeVariables} = require('antd/dist/theme');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            ...getThemeVariables({ dark  : false, compact : false}),
                            'border-radius-base': '5px',
                            'drawer-body-padding' : 0,
                            'layout-header-background' : "#ffffff",
                            'primary-color' : "#3A3A3A",
                            'modal-body-padding' : 0,
                            'modal-confirm-body-padding' : 10
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};