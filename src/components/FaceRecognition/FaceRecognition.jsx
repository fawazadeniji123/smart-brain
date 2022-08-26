import './FaceRecognition.css'

const FaceRecognition = ({ boxes, imageUrl, handleImgLoad }) => {
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
        {boxes.map((box, i) => (
          <div className="bounding-box" key={i} style={box}></div>
        ))}
      </div>
    </section>
  )
}

export default FaceRecognition
