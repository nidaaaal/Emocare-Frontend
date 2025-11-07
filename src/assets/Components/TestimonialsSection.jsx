import React from "react";

const testimonials = [
  { name: "Aisha", feedback: "Emocare helped me find a therapist who truly understands me." },
  { name: "Rahul", feedback: "I feel more confident and balanced after my sessions here." }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-white text-center">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold mb-10">What Our Clients Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 shadow-md rounded-lg">
              <p className="text-gray-600 mb-4">"{t.feedback}"</p>
              <h5 className="font-semibold text-indigo-600">- {t.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
