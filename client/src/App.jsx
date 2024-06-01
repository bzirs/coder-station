import './styles/App.scss'
import {ConfigProvider} from 'antd';

import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';
import {BrowserRouter} from "react-router-dom";
import Router from "./router/index.jsx";
import {useEffect} from "react";
import {createLocal} from "./utils/cache/index.js";
import {USER_TOKEN} from "./utils/cache/constant.js";
import {getUserInfoApi, resetUserInfoApi} from "./api/user.js";
import {useDispatch} from "react-redux";
import {setUserInfo, toggleLoginStatus} from "./store/modules/global/index.js";

function App() {

    const tokenLocal = createLocal(USER_TOKEN)

    const dispatch = useDispatch()


    useEffect(() => {
        const token = tokenLocal.get()

        if (token) {

            const resetUserInfo = async () => {
                const {data} = await resetUserInfoApi()
                if (!data) {

                    tokenLocal.remove()
                    dispatch(toggleLoginStatus(false))
                    return
                }

                const {data: userInfo} = await getUserInfoApi(data._id)
                dispatch(toggleLoginStatus(true))
                dispatch(setUserInfo(userInfo))

            }
            resetUserInfo()
        }

    }, []);

    return (
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ConfigProvider>

    )
}

export default App
