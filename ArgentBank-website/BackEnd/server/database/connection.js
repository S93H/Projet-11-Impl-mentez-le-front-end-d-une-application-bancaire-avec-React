const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb+srv://huttsylvain:xM1e59dlCpRnv3Op@cluster0.gmexzua.mongodb.net/'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
