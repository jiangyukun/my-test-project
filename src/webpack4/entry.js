import a from './entry1'
import './entry.css'
import events from 'events'
import jQuery from 'jquery'
import c from './c'


console.log(c);

let eventEmitter = new events.EventEmitter();

let b = {
    ...a,
    x: 2
}

console.log(a);
