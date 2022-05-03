const router = require('express').Router()

const Nft = require('../models/Nft')

router.post('/', async (req, res) => {
  const { contract, benefit, benefitDescription } = req.body

  if (!contract) {
    res.status(422).json({ message: 'Contract is mandatory' })
    return
  }

  if (!benefit) {
    res.status(422).json({ message: 'Benefit is mandatory' })
    return
  }
  if (!benefitDescription) {
    res.status(422).json({ message: 'The description of the benefit is mandatory' })
    return
  }

  const nft = {
    contract,
    benefit,
    benefitDescription
  }

  try {
    //criando os dados
    await Nft.create(nft)

    res.status(201).json({ message: 'Benefit successfully entered into the system!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// find all 
router.get('/', async (req, res) => {
  try {
    const nfts = await Nft.find()

    res.status(200).json(nfts)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// find some one
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const nft = await Nft.findOne({ _id: id })

    if (!nft) {
      res.status(422).json({ message: 'Not found!' })
      return
    }

    res.status(200).json(nft)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// Update
router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { contract, benefit, benefitDescription  } = req.body

  const nft = {
    contract,
    benefit,
    benefitDescription
  }

  try {
    const updatedNft = await Nft.updateOne({ _id: id }, nft)

    if (updatedNft.matchedCount === 0) {
      res.status(422).json({ message: 'Não encontrado!' })
      return
    }

    res.status(200).json(nft)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const nft = await Nft.findOne({ _id: id })

  if (!nft) {
    res.status(422).json({ message: 'Not found!' })
    return
  }

  try {
    await Nft.deleteOne({ _id: id })

    res.status(200).json({ message: 'Deleted Nft!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router