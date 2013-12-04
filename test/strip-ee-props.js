module.exports = stripEventEmitterProps

var _ = require('lodash')
  , eeProps = ['domain', '_events', '_maxListeners']

function stripFunctions(obj) {
  return _.omit(obj, _.methods(obj))
}

function stripEventEmitterProps(obj) {
  if (Array.isArray(obj)) {
    return obj.map(stripEventEmitterProps)
  }

  obj = _.omit(obj, eeProps)
  if (obj.container && obj.container.items !== undefined) {
    obj.container.items = stripEventEmitterProps(obj.container.items)
  }

  if (obj.items !== undefined) {
    obj.items = stripEventEmitterProps(obj.items)
  }

  return stripFunctions(obj)
}
