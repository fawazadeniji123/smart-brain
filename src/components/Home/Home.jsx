import { useState } from 'react'
import Logo from '../Logo/Logo'
import Rank from '../Rank/Rank'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import { useAuth } from '../../utils/auth'

const Home = ({ handleKeyPress }) => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const { user, setUser } = useAuth()

  const calculateFaceLocation = (data) => {
    const image = document.querySelector('#inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    const regions = data.outputs[0].data.regions
    const boxes = []
    for (const region of regions) {
      const { top_row, left_col, right_col, bottom_row } =
        region.region_info.bounding_box
      boxes.push({
        left: left_col * width,
        top: top_row * height,
        right: width - right_col * width,
        bottom: height - bottom_row * height,
      })
    }
    return boxes
  }

  const displayFaceBox = (boxes) => {
    setBoxes(boxes)
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleImgLoad = () => {
    fetch('https://api-smart-face-recognition.herokuapp.com/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id, inputUrl: imageUrl }),
    })
      .then((res) => res.json())
      .then(({ response, user, prediction }) => {
        if (response === 'success') {
          setUser(user)
          displayFaceBox(calculateFaceLocation(prediction))
        } else {
          console.log(response)
        }
      })
      .catch((err) => console.log(err))
  }

  const handleClick = (input) => {
    if (input) {
      setBoxes([])
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
        boxes={boxes}
        imageUrl={imageUrl}
      />
    </main>
  )
}

export default Home
