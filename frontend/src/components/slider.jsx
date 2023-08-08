import React from 'react'
// import image1 from "../images/slider1.webp"
// import image2 from "../images/slider2.webp"
// import image3 from "../images/slider3.webp"
import { useNavigate } from 'react-router-dom'


const Slider = () => {
  let navigate = useNavigate()
  return (
    <>
<div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/images/slider1.webp" className="d-block w-100" id='sldimg' alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/images/slider2.webp" className="d-block w-100" id='sldimg' alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/images/slider3.webp" className="d-block w-100" id='sldimg' alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
 <p align="center" className='pt-2 navbtn'>
        <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <button onClick={()=>navigate(+1)} className="btn btn-warning">Click here to Go Forward</button>
            </div> 
            <div className="col-lg-6">
            <button onClick={()=>navigate(-1)} className="btn btn-warning">Click here to Go Back</button>
            </div> 
        </div>
        </div>
        </p>      

    </>
  )
}

export default Slider