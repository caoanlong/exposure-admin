import Base from './Base'

class SysUser extends Base {
    login(data: object) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }
    findByToken() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findByToken'
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}

export default new SysUser('/sysUser')