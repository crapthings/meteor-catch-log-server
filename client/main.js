import moment from 'moment'
import React, { Component } from 'react'
import { Mount, WithSubscribe, WithTracker } from '/imports/module'

const App = () => {
  return (
    <div>
      <WithSubscribe name='logs'>
        {props => {
          console.log(props)
          return (
            <WithTracker list={ctx => Logs.find({}, { sort: { createdAt: -1 } })}>
              {({ data: { list } }) => {
                return (
                  <div>
                    {list.map(item => {
                      return (
                        <div key={item._id} className='log'>
                          <dl>
                            <dd>where: {item.where || 'unknown'}</dd>
                            <dd>when: {moment(item.when).format()}</dd>
                            <dd>who: {item.who || 'unknown'}</dd>
                            <dd>what: {item.what || 'unknown'}</dd>
                            <dd>args: {JSON.stringify(item.args) || 'unknown'}</dd>
                            <dd>stack: {JSON.stringify(item.stack) || 'unknown'}</dd>
                          </dl>
                        </div>
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

Meteor.startup(function () {
  Mount(<App />)
})
