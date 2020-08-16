import React, { useCallback } from 'react';
import { connect } from '../../utils/use-codex'
import { fetchPostByUserId } from '../../app/post'
import { fetchUserById, request } from '../../app/user'

const TestHOC = (props) => {
  const { fetchPostByUserId, userId } = props
  const handleFetch = useCallback(() => fetchPostByUserId(userId), [userId, fetchPostByUserId])
  return <button onClick={handleFetch}>Click</button>
}

const mapStateToProps = (getSelector, ownProps) => ({
  user: getSelector('user', user => user.keys[ownProps.userId]),
  post: getSelector('post', post => post.keys[ownProps.userId]),
})

const mapDispatchToProps = (getDispatch, ownProps) => {
  const userDispatch = getDispatch('user')
  const postDispatch = getDispatch('post')
  return {
    fetchUserById: (userId) => fetchUserById(userId)(userDispatch), 
    fetchUserByIdRequest: (userId) => userDispatch(request(userId)),
    fetchPostByUserId: (userId) => fetchPostByUserId(userId)(postDispatch), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestHOC);