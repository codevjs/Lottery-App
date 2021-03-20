import React, {createContext, useCallback, useState} from "react";
import {message, Modal} from "antd";
import { RcFile } from "antd/lib/upload/interface";
import readXlsxFile from "read-excel-file";
import isElectron from "is-electron";

type DataLot = {
    doorprize  : string,
    numWinners : number,
    customers  : string[]
}

export interface ContextProps {
    isLot        : boolean,
    startLot     : () => void,
    stopLot      : () => void,
    resetLot     : () => void,
    dataLot      : DataLot,
    beforeUpload : (file : RcFile) => boolean,
    onFinish     : (values : boolean) => void,
}

export const Context = createContext<ContextProps | null>(null);

export const ContextProviver : React.FC = (props) => {

    const [isLot, setLot]                     = useState<boolean>(false);
    const [dataLot, setDataLot]               = useState<DataLot>({
        doorprize  : "",
        numWinners : 0,
        customers  : []
    });

    const startLot = useCallback(() => {

        const customers = dataLot.customers;

        if (customers.length < 5) return message.info("Data nasabah belum ada.");

        Modal.confirm({
            title : <div style={{padding : "20px 20px 0"}}>Mulai sekarang? <br/></div>,
            okText : "Ya mulai!",
            cancelText : "Batal",
            icon : null,
            centered : true,
            onOk : () => {
                if (isElectron()) {
                    // @ts-ignore
                    window.ipcRenderer.send("start-lot", {...dataLot});
                }
                setLot(true);
            }
        })

    }, [dataLot]);

    const stopLot  = useCallback(() => {

        if (isElectron()) {
            // @ts-ignore
            window.ipcRenderer.send("stop-lot");
        }

        setLot(false);

    }, []);
    
    const resetLot = useCallback(() => {
        
        setDataLot({
            doorprize  : "",
            numWinners : 0,
            customers  : []
        });

        if (isElectron()) {
            // @ts-ignore
            window.ipcRenderer.send("reset" +
                "-lot", {
                doorprize  : "",
                numWinners : 0,
                customers  : []
            });
        }
        
    }, []);

    const beforeUpload = useCallback( (file : RcFile) : boolean => {

        const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        if (!isExcel) {

            message.error('You can only upload excel file!');

            return false;
        }

        const schema = { 'NAMA' : { prop : "name", type : String}};

        readXlsxFile(file, {schema})
            .then( (result : {rows : {name : string}[]}) => {

                const customers = result.rows.map(item => item.name) as string[];

                setDataLot(current => ({ ...current, customers }));
            })

        return false;

    }, []);

    const onFinish = useCallback((values) => {

        setDataLot(current => ({
            ...current,
            doorprize : values.doorprize,
            numWinners: values.winners
        }));

        message.success("Data berhasil diperbarui.");

    }, []);

    return (
        <Context.Provider value={{isLot, startLot, stopLot, resetLot, dataLot, beforeUpload, onFinish}}>
            {props.children}
        </Context.Provider>
    )
}
