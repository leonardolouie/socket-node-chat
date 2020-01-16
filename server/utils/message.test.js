const expect = require('expect')
const {generateMessage} = require('./message')

describe('Generate message', () => {

  it('should correct object message ', ()=> {

    var from = 'Jon doe'
    var text = 'Some message';
    var message = generateMessage (from, text);

     expect(message.from).toBe(from)
     expect(message.text).toBe(text)
         
  })

})