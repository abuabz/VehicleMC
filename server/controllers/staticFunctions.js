function getValuesFromJson(target = {}, resource = {}) {

    let data={}
    // console.log(target)
    for (let key in resource) {
        if (target[resource[key]] !==undefined) { // optional check to only iterate through own properties
            data[key] = target[key]
        }else{
            return false;
        }
    }

    // console.log(data)
    return data

}

module.exports = {getValuesFromJson}