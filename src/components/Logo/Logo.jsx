import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from '../../assets/brain.png'
import './Logo.css'

const Logo = () => {
  return (
    <section className="logo ma3 mt0">
      <Tilt tiltMaxAngleX={35} tiltMaxAngleY={35}>
        <div className="Tilt logo pa3 tc br2 shadow-2">
          <img src={brain} alt="Brain Logo" />
        </div>
      </Tilt>
    </section>
  )
}

export default Logo
