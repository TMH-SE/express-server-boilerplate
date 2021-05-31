const config = {
  development: {
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'secretkey',
    mongo: {
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      dbName: 'test'
    }
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
