import request from '../utils/service'

/**
 * 获取所有的类型
 */

export function getTypesApi() {
    return request({
        url: "/api/type",
        method: "GET",
    })
}
