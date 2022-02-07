/* eslint no-console: 0 */
const mongoose = require('mongoose')

module.exports = {
  connect: (DB_HOST) => {
    // Connect to the DB
    mongoose.connect(DB_HOST)
    // Log an error if we fail to connect
    mongoose.connection.on('connected', () => {
      console.log(`MongoDB [${DB_HOST}] connected...`)
    })
    mongoose.connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.',
        err,
      )
      process.exit()
    })
  },

  close: () => {
    mongoose.connection.close()
  },
}
