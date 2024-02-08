function getValuesFromJson(target = {}, resource = {}, returnError = true) {

    let data = {}
    let errData = {}
    let error = false
    // console.log(target)
    for (let key in resource) {
        if (target[resource[key]] !== undefined && !/^\s*$/.test(target[resource[key]])) { // optional check to only iterate through own properties
            data[key] = target[key]
        } else {
            if (returnError===true) {
                error = true;
                errData[key] = `${resource[key]} is missing `
            }
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