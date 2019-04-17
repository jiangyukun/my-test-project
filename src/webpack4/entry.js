import a from './entry1'
import './entry.css'
import events from 'events'
import jQuery from 'jquery'

let eventEmitter = new events.EventEmitter();

let b = {
    ...a,
    x: 2
}

console.log(a);
