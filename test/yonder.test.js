var stripEventEmitterProps = require('./strip-ee-props')

describe('yonder', function () {

  it('should allow for automatic creation of a yonder when passing a config', function () {
    var yonderConfig =
      { container:
        { orientation: 'v'
        , items:
          [ { orientation: 'h'
            , items:
              [ { url: 'http://bbc.co.uk/education', index: 0 }
              , { url: 'http://bbc.co.uk/sport', index: 1 }
              ]
            }
          , { url: 'http://bbc.co.uk/sport', index: 2
            }
          ]
        }
      , name:'y1'
      }
      , yonder = require('../lib/yonder').createYonder(yonderConfig)

    stripEventEmitterProps(yonder.find('y1')).should.eql(yonderConfig)
  })

})
