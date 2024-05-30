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