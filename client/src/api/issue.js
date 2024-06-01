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
