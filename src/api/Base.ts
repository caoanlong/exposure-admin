import request from '../utils/request'

class Base {
    private _find: string = '/findList'
    private _findById: string = '/findById'
    private _add: string = '/add'
    private _update: string = '/update'
    private _del: string = '/del'
    protected baseUrl: string = '/'
    protected request: any = request
    protected isClick: boolean = true
    protected delay: number = 1500

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    find(params: object) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + this._find,
                params
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    findById(params: object) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + this._findById,
                params
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
    add(data: object) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + this._add,
            method: 'post',
            data
        })
    }
    update(data: object) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + this._update,
            method: 'post',
            data
        })
    }
    del(data: object) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + this._del,
            method: 'post',
            data
        })
    }
}

export default Base