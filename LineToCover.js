/**
 * 一维数组 转化为 一维数组中 每一项的所有组合方式产生的二维数组
 */
let arr = [1,2,3,4]
let result = [[]]

function lineToCover(arr) {
        for (let i = 0; i < arr.length; i++) {
                for (let j = 0, len = result.length; j < len; j++) {
                        result.push(result[j].concat(arr[i]))
                }
        }
        result.splice(0,1)
        return result
}

console.log(lineToCover(arr))