import './styles/App.scss'
import {ConfigProvider} from 'antd';

import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';
import {BrowserRouter} from "react-router-dom";
import Router from "./router/index.jsx";

function App() {

    return (
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ConfigProvider>

    )
}

export default App
