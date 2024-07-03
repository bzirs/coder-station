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

/**
 * 根据 id 获取面试题的详情
 */
export function getIssueDetailApi(issueId) {
    return request({
        url: `/api/issue/${issueId}`,
        method: "GET",
    })
}

/**
 * 根据问答的 id 获取对应的评论
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getIssueCommentApi(id, params) {
    return request({
        url: `/api/comment/issuecomment/${id}`,
        method: "GET",
        params
    });
}