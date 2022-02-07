const { ApolloError } = require('apollo-server-errors')

class AuthError extends ApolloError {
  constructor(message, code) {
    super(message, code)

    Object.defineProperty(this, 'name', { value: 'AuthError' })
  }
}

module.exports = AuthError
