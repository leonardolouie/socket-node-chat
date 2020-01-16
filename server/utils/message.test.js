const expect = require('expect')
const {generateMessage , generateLocationMessage} = require('./message')

describe('Generate message', () => {

  it('should correct object message ', ()=> {

    var from = 'Jon doe'
    var text = 'Some message';
    var message = generateMessage (from, text);

     expect(message.from).toBe(from)
     expect(message.text).toBe(text)
         
  })

})

describe('Generate  Location Message', () => {

  it('Should generate correct location object', ()=>{
        
    var from = 'Jon doe'
    var latitude = '15.482772';
    var longitude = '120.7120023';
    var message = generateLocationMessage (from,latitude, longitude);

     expect(message.from).toBe(from)
     expect(message.url).toBe(`https:www.google.com/maps?q=${latitude},${longitude}`)
     

  })
})