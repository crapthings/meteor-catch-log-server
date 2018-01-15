Meteor.methods({
  log(opts) {
    return Logs.insert(opts)
  },

  'logs.empty'() {
    return Logs.remove({})
  },
})

Meteor.publish('logs', function () {
  return Logs.find({}, {
    sort: {
      createdAt: -1
    }
  })
})
