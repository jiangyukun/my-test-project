function find(list, n) {
    list = list.sort((a, b) => {
        return a > b ? 1 : -1
    })

    let start = 0;
    let end = list.length - 1
    let mid = Math.floor((start + end) / 2)

    while (list[mid] != n) {
        if (start > end) {
            return false
        }
        if (n < list[mid]) {
            start = mid + 1
        } else {
            end = mid - 1
        }
        mid = Math.floor((start + end) / 2)
    }
    return true
}

let result = find([1, 2, 4, 5, 3, 3], 3)
console.log(result);
