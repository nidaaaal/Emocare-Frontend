import PhotoSlide from "./PhotoSection";
import img1 from "../Images/heroSection/img1.jpg";
import img2 from "../Images/heroSection/img2.jpg";
import img3 from "../Images/heroSection/img3.jpg";
import img4 from "../Images/heroSection/img4.jpg";

export default function BodySection() {
  const images = [img1, img2, img3, img4];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Discover a Healthier Mind, One Step at a Time
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're facing stress, anxiety, or simply need someone to talk to, 
            <span className="font-semibold text-indigo-600"> Emocare</span> is here to guide you.  
            Our experts and tools empower you to build resilience, nurture positivity, 
            and embrace emotional wellness.
          </p>
        </div>

        {/* Photo Slider */}
        <div className="relative shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <PhotoSlide images={images} interval={4000} />
        </div>
      </div>
    </section>
  );
}
