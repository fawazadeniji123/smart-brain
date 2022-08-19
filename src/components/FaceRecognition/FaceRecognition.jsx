import './FaceRecognition.css'

const FaceRecognition = ({ box, imageUrl, handleImgLoad }) => {
  return (
    <section className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="400px"
          height="auto"
          onLoad={handleImgLoad}
        />
        <div className="bounding-box" style={box}></div>
      </div>
    </section>
  )
}

export default FaceRecognition
