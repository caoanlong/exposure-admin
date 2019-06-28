import Base from './Base'

class Label extends Base {
    findAll() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findAll'
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}

export default new Label('/label')