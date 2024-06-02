import request from '../utils/service'

// 获取验证吗
export const getCaptchaImg = () => request({
    url: '/res/captcha',
    method: 'get'
})

// 验证用户是否存在
export const userIsExist = (loginId) => request({
    url: `/api/user/userIsExist/${loginId}`,
    method: 'get'
})

/**
 * 用户注册
 */
export function registerUser(data) {
    return request({
        url: "/api/user",
        data,
        method: "post",
    });
}

/**
 * 用户登录
 */
export function loginUserApi(loginInfo) {
    return request({
        url: "/api/user/login",
        method: "POST",
        data: loginInfo,
    });
}

/**
 * 根据 id 来查找用户
 */
export function getUserInfoApi(id) {
    return request({
        url: `/api/user/${id}`,
        method: "GET",
    });
}

/**
 * 恢复登录状态
 */
export function resetUserInfoApi() {
    return request({
        url: "/api/user/whoami",
        method: "GET",
    });
}


/**
 * 获取积分前十的用户
 */
export function getUserByPointsRank() {
    return request({
        url: "/api/user/pointsrank",
        method: "GET",
    })
}