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

  it('should allow for automatic creation of a yonder when passing an array', function () {
    var yonderConfig =
      [ { container:
          { orientation: 'h'
          , items:
            [ { url: '/yonder'
              , index: 0
              }
            ]
          }
        , name: 'y3'
        }
      , { container:
          { orientation: 'h'
          , items:
            [ { url: '/new-url'
              , index: 1
              }
            ]
          }
        , name: 'y4'
        }
      ]
      , yonder = require('../lib/yonder').createYonder(yonderConfig)

    stripEventEmitterProps(yonder.find('y3')).should.eql(yonderConfig[0])
    stripEventEmitterProps(yonder.find('y4')).should.eql(yonderConfig[1])
  it('should emit a `change` event whenever a yindow is added', function () {
    var yond = yonder.createYonder()
      , noOfTimes = 0

    yond.on('change', function () {
      noOfTimes += 1
    });

    yond.createYindow()
    yond.createYindow()
    noOfTimes.should.equal(2)
  })

  describe('#toArray', function () {
    it('should return an array of yindows', function () {
      var yonderConfig =
        [ { container:
            { orientation: 'h'
            , items:
              [ { url: '/yonder'
                , index: 0
                }
              ]
            }
          , name: 'y3'
          }
        , { container:
            { orientation: 'h'
            , items:
              [ { url: '/new-url'
                , index: 1
                }
              ]
            }
          , name: 'y4'
          }
        ]
        , yonder = require('../lib/yonder').createYonder(yonderConfig)

      yonder.toArray().length.should.equal(2)
    })
  })

})