/**author:Caoanlong *day:2019-06-23
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export function formDataReq(json: any) {
    const formData = new FormData()
    for (let attr in json) {
        formData.append(attr, json[attr])
    };
    return formData
}

export function resizeImg(url: string, size: string) {
    const arr = url.split('.')
    return process.env.VUE_APP_IMG_URI + arr[0] + size + arr[1]
}
