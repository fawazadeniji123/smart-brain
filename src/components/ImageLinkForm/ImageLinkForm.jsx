import './ImageLinkForm.css'

const ImageLinkForm = ({ input, handleInput, handleClick }) => {
  return (
    <section>
      <p className="f3 tc mb2">
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            value={input}
            className="f4 pa2 w-70 center"
            onInput={handleInput}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={() => handleClick(input)}
          >
            Detect
          </button>
        </div>
      </div>
    </section>
  )
}

export default ImageLinkForm
