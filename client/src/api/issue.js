import request from '../utils/service'

/**
 * 分页获取问答
 */
export function getIssueListApi(params) {
    return request({
        url: "/api/issue",
        method: "GET",
        params: {
            ...params,
        },
    });
}


/**
 * 新增问答
 */
export function addIssueApi(data) {
    return request({
        url: "/api/issue/",
        method: "POST",
        data
    })
}