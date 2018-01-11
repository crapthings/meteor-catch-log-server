Meteor.methods({
  log(where, who, what, args, stack) {
    const when = new Date()
    return Logs.insert({
      where,
      when,
      who,
      what,
      args,
      stack,
    })
  },

  'logs.empty'() {
    return Logs.remove({})
  },

  test() {
    try {
      throw new Meteor.Error('400', 'not found', 'something wrong dude')
    } catch(ex) {
      const where = Meteor.absoluteUrl()
      const who = this.userId
      const what = 'method test'
      const args = arguments
      const stack = ex
      Meteor.call('log',
        where,
        who,
        what,
        args,
        stack,
      )
    }
  },
})

Meteor.publish('logs', function () {
  return Logs.find({}, {
    sort: {
      createdAt: -1
    }
  })
})
