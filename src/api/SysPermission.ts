import Base from './Base'

class SysPermission extends Base {
    findByPid(params: any) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findByPid',
                params
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }

    findTreeById(params: any) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findTreeById',
                params
            }).then((res: any) => {
                resolve(res.data.data || res.data || res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}

export default new SysPermission('/sysPermission')