/**
 * 一维数组 转化为 一维数组中 每一项的所有组合方式产生的二维数组
 */
let arr = [1,2,3]
let cover = []
for (let i=0; i < arr.length; i++) {
        let len = 0
        while(len < arr.length+1) {
                let index = i
                let line = []
                while (index < arr.length -1 ) {
                        for (let j = i; line.length < len; j++) {
                                line.push(arr[j])
                        }
                        if (index === arr.length - 1) {
                                break
                        }
                        if (line.length < len+1) {
                                line.push(arr[index])
                                break
                        }
                        index++
                        cover.push(line) 
                }
                len++
                if (len > arr.length -( i + 1)) break    
        }
}

console.log(cover)