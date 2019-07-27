let str = '#/definition/a[b.x[]]'


let currentIndex = 0
let syc = -1
let token = []

    let out = []
    while (syc != 0) {
        getType()

        out.push({
            syc,
            token:token.join('')
        })
    }

    console.log(out);

function getType() {
    token = []
    let char = str[currentIndex]

    if (char == '#') {
        syc = 1
        token.push(char)
        currentIndex++
        return
    }
    if (char == '/') {
        syc = 2
        token.push(char)
        currentIndex++
        return
    }

    if (isLetter(char)) {
        token.push(char)
        currentIndex++
        char = str[currentIndex]
        while (isLetter(char) || isDigit(char)) {
            token.push(char)
            currentIndex++
            char = str[currentIndex]
        }
        syc = 3
        return
    }
    if (char == '.') {
        syc = 4
        token.push(char)
        currentIndex++
        return
    }
    if (char == '[') {
        syc = 5
        token.push(char)
        currentIndex++
        return
    }
    if (char == ']') {
        syc = 6
        token.push(char)
        currentIndex++
        return
    }
    syc = 0
}

function isLetter(char) {
    if (char >= 'a' && char <= 'z') {
        return true
    }
    if (char >= 'A' && char <= 'Z') {
        return true
    }

    return false
}

function isDigit(char) {
    if (char >= '0' && char <= '9') {
        return true
    }
    return false
}