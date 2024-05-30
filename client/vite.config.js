import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

const proxyPaths = ['/res', '/api', '/static']

const createProxy = (base) => {
    return proxyPaths.reduce((proxy, path) => {

        Reflect.set(proxy, path, {
            target: base,
            changeOrigin: true,
        })

        return proxy
    }, {})

}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],

        server: {
            proxy: createProxy(env.VITE_BASE_URL)
        }
    }
})
