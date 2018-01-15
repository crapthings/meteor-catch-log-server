import moment from 'moment'
import React, { Component } from 'react'
import { Mount, WithSubscribe, WithTracker } from '/imports/module'

class App extends Component {
  render() {
    return (
      <div>
        <WithSubscribe name='logs'>
          {props => {
            return (
              <WithTracker list={ctx => Logs.find({}, { sort: { createdAt: -1 } })}>
                {({ data: { list } }) => {
                  return (
                    <div>
                      {list.map(item => {
                        return (
                          <div key={item._id} className='log'>{JSON.stringify(item, null, 4)}</div>
                        )
                      })}
                    </div>
                  )
                }}
              </WithTracker>
            )
          }}
        </WithSubscribe>
      </div>
    )
  }
}

Meteor.startup(function () {
  Mount(<App />)
})
