import Base from './Base'

class Common extends Base {
    upload(data: object) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/upload',
            method: 'post',
            data,
            headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' }
        })
    }

    total() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/total'
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }

    statistics() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/statistics'
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}

export default new Common('/common')