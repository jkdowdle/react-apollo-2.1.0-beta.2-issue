import React from 'react'
import { shallow } from 'enzyme'

import createMockClient from './create-mock-client'
import { withComments } from './Comments'

describe('withComments', () => {
  let mockResponse, props

  beforeEach(() => {
    mockResponse = {
      comments: {
        __typename: 'Comment',
        id: 'test-id',
        text: 'test-comment'
      }
    }
    props = {}
  })

  afterEach(() => {})

  it('performs comments query as expected', async () => {
    const config = {
      context: {
        client: createMockClient({
          resolveWith: mockResponse
        })
      }
    }

    const Container = ({ data: { comments } }) => {
      expect(comments).toEqual(mockResponse.comments)

      return null
    }

    const ContainerWithComments = withComments(Container)

    await shallow(<ContainerWithComments {...props} />, config).render()
  })
})
