export function trimObj(obj) {
    const trimmedObj = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string') {
            trimmedObj[key] = value.trim();
        } else {
            trimmedObj[key] = value;
        }
    }
    return trimmedObj;
}

export function toLowerObj(obj) {
    const lowerObj = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string') {
            lowerObj[key] = value.toLowerCase();
        } else {
            lowerObj[key] = value;
        }
    }
    return lowerObj
}

// (function (){
//     const obj = {name: "  saufArav  ", email: "  EcvaEfdf#fj.com   "}
//     let {name, email } = obj
//     name, email = toLowerObj({name, email})
//     // console.log(toLowerObj(obj))
//     // console.log(trimObj(obj))
//     console.log(name, " ", email)
// })();