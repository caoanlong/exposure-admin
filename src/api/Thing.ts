import Base from './Base'

class Thing extends Base {
    findAll(params: object) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findAll',
                params
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}

export default new Thing('/thing')