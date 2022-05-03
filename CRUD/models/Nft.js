const mongoose = require('mongoose')

const NFT = mongoose.model('NFT', {
  contract: String,
  benefit: String,
  benefitDescription: String,
})

module.exports = NFT
