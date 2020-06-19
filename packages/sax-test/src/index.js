let sax = require('sax')

let parser = sax.parser(true)

parser.onopentag = (tag) => {
    console.log(tag);
}

parser.write(`
<sfsd></b>
      `).end()
