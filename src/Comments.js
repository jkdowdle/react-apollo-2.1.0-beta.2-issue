import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

console.log('graphql', graphql)

export const Comments = ({ data: { loading, comments } }) => (
  <div>
    {loading
      ? 'Loading...'
      : comments.map(({ id, text }) => <div key={id}>{text}</div>)}
  </div>
)

export const QUERY = gql`
  query Comments {
    comments {
      id
      text
    }
  }
`

export const options = props => ({ ...props })

export const withComments = graphql(QUERY, {
  options
})

export const enhance = compose(withComments)

export default enhance(Comments)
