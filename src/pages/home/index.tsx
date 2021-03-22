import React, {useCallback, useContext} from "react";
import Component from "components";
import {Context, ContextProps} from "contexts";
import "assets/styles/home.less";
import {Col, Form, Upload, InputNumber, Row, Select, Button, Space, Modal} from "antd";
import { FileExcelOutlined, EyeOutlined } from '@ant-design/icons';
import isElectron from "is-electron";

import logo from "../../assets/images/logo.png";

const Home : React.FC = () => {

    const {isLot, startLot, stopLot, dataLot, clearLot, resetLot, beforeUpload, onFinish} = useContext(Context) as ContextProps;

    const [form] = Form.useForm();

    const openWindow = useCallback(() => {

        if (isElectron()) {

            // @ts-ignore
            window.ipcRenderer.send("new-window",  window.location.href + "view");
        }
    }, [])

    return (
       <Component.Layout>
            <div className={"public-container"}>
                <div className={"home-main"}>
                   <div className={"image-section"}>
                       <img src={logo} alt={"Kb Bukopin"}/>
                   </div>
                    <div style={{textAlign: "right", padding : 20}}>
                        <Button type={"primary"} shape={"circle"} onClick={() => openWindow()}>
                            <EyeOutlined />
                        </Button>
                    </div>
                    <div>
                       <Form form={form} layout={"vertical"} onFinish={onFinish}>
                           <Row gutter={[10, 10]}>
                               <Col xs={24} sm={24} md={12}>
                                   <Form.Item
                                       label={"Pilih Doorprize"}
                                       name={"doorprize"}
                                       rules={[{required : true, message : "Silahkan pilih dooprize"}]}
                                       style={{textAlign : "left"}}
                                   >
                                       <Select size={"large"}>
                                           <Select.Option value={"Logam Mulia"}>Logam Mulia</Select.Option>
                                           <Select.Option value={"10 Voucher Wokee @ Rp. 500rb"}>10 Voucher Wokee @ Rp. 500rb</Select.Option>
                                       </Select>
                                   </Form.Item>
                               </Col>
                               <Col xs={24} sm={24} md={12}>
                                   <Form.Item
                                       label={"Jumlah Pemenang"}
                                       name={"winners"}
                                       rules={[{required : true, message : "Tentukan jumlah pemenang"}]}
                                   >
                                       <InputNumber style={{width : "100%"}} size={"large"} min={1} max={5} />
                                   </Form.Item>
                               </Col>
                               <Col span={24}>
                                   <Upload.Dragger
                                       beforeUpload={beforeUpload}
                                       fileList={[]}
                                   >
                                       <p className="ant-upload-drag-icon">
                                           <FileExcelOutlined />
                                       </p>
                                       <p className="ant-upload-text">Klik atau seret file data nasabah ke area ini.</p>
                                       <p className="ant-upload-hint">
                                           {dataLot.customers.length} Nasabah yang terdaftar.
                                       </p>
                                   </Upload.Dragger>
                               </Col>
                               <Col span={24}>
                                   <Form.Item>
                                       <br/>
                                      <Space>
                                          <Button
                                              size={"large"}
                                              type={"primary"}
                                              disabled={isLot}
                                              htmlType={"submit"}
                                          >
                                              Simpan
                                          </Button>
                                          <Button
                                              size={"large"}
                                              type={"primary"}
                                              disabled={isLot}
                                              htmlType={"button"}
                                              onClick={() => {
                                                  Modal.confirm({
                                                      title : <div style={{padding : "20px 20px 0"}}>Reset undian? <br/></div>,
                                                      okText : "Ya!",
                                                      cancelText : "Batal",
                                                      icon : null,
                                                      centered : true,
                                                      onOk : () => {
                                                          resetLot();
                                                          form.resetFields();
                                                      }
                                                  })
                                              }}
                                          >
                                              Reset
                                          </Button>
                                          <Button
                                              size={"large"}
                                              type={"primary"}
                                              disabled={isLot}
                                              htmlType={"button"}
                                              onClick={() => {
                                                  clearLot();
                                                  form.resetFields();
                                              }}
                                          >
                                              Bersihkan
                                          </Button>
                                          <Button
                                              size={"large"}
                                              type={"primary"}
                                              htmlType={"button"}
                                              onClick={() => isLot ? stopLot() : startLot()}
                                              disabled={dataLot.numWinners < 1}
                                          >
                                              {isLot ? "Berhenti" : "Mulai"}
                                          </Button>
                                      </Space>
                                   </Form.Item>
                               </Col>
                           </Row>
                       </Form>
                    </div>
                </div>
            </div>
       </Component.Layout>
    )
}

export default Home;