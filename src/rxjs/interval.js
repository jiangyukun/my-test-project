let rxjs = require('rxjs')
let take = require('rxjs/operators').take

// console.log(rxjs);

let a = rxjs.interval(1000)


a.pipe(take(3)).subscribe({
    next() {
        console.log('next');
    },
    complete() {
        console.log(2);
    }
})
