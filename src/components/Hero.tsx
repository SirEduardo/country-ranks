const Hero = () => {
  return (
    <div className="relative">
      <img
        className="h-32 w-full"
        src="/public/images/hero-image-wr.jpg"
        alt="hero-image"
      />
      <img
        className="absolute top-2/4 right-1/4"
        src="/public/images/Logo.svg"
      />
    </div>
  )
}

export default Hero
