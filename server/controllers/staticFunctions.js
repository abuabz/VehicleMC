function getValuesFromJson(target = {}, resource = {}) {

    let data = {}
    let errData={}
    let error = false
    // console.log(target)
    for (let key in resource) {
        if (target[resource[key]] !== undefined) { // optional check to only iterate through own properties
            data[key] = target[key]
        } else {
            error = true;
            errData[key] = 'Missing data'
        }
    }

    if (error) {
        return {
            error: true,
            data: errData
        }
    }

    // console.log(data)
    return data

}

module.exports = { getValuesFromJson }