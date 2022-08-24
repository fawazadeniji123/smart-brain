import { useState } from 'react'
import Logo from '../Logo/Logo'
import Rank from '../Rank/Rank'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import { useAuth } from '../../utils/auth'

const boundingBox = {
  top_row: 0,
  left_col: 0,
  bottom_row: 0,
  right_col: 0,
}

const Home = ({ handleKeyPress }) => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState(boundingBox)
  const { user, setUser } = useAuth()

  const response = {
    outputs: [
      {
        data: {
          regions: [
            {
              region_info: {
                bounding_box: {
                  top_row: 0.10391797870397568,
                  left_col: 0.5252706408500671,
                  bottom_row: 0.3723624050617218,
                  right_col: 0.6431418657302856,
                },
              },
            },
          ],
        },
      },
    ],
  }

  const calculateFaceLocation = (data) => {
    const { top_row, left_col, right_col, bottom_row } =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.querySelector('#inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      left: left_col * width,
      top: top_row * height,
      right: width - right_col * width,
      bottom: height - bottom_row * height,
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleImgLoad = () => {
    fetch('http://localhost:3000/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((res) => res.json())
      .then(({ response, user, prediction }) => {
        if (response === 'success') {
          setUser(user)
          displayFaceBox(calculateFaceLocation(prediction))
        }
      })
      .catch((err) => console.log(err))
  }

  const handleClick = (input) => {
    if (input) {
      setImageUrl(input)
    }
  }

  return (
    <main>
      <Logo />
      <Rank />
      <ImageLinkForm
        handleInput={handleInput}
        handleClick={handleClick}
        handleKeyPress={handleKeyPress}
        input={input}
      />
      <FaceRecognition
        handleImgLoad={handleImgLoad}
        box={box}
        imageUrl={imageUrl}
      />
    </main>
  )
}

export default Home
