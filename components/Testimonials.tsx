const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Founders Are Saying
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/avatars/female-founder.png"
                alt="Sophia Chen"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Sophia Chen</h4>
                <p className="text-sm text-gray-500">Founder, InnovateTech</p>
              </div>
            </div>
            <p className="text-gray-700 text-base">
              “PitchCraft has been a game-changer for our fundraising efforts.
              The AI-generated slides are incredibly professional, and the
              editor is a breeze to use. We secured our seed funding thanks to
              PitchCraft!”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/avatars/male-founder.png"
                alt="Ethan Walker"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Ethan Walker</h4>
                <p className="text-sm text-gray-500">CEO, GreenSolutions</p>
              </div>
            </div>
            <p className="text-gray-700 text-base">
              “As a non-designer, creating a compelling pitch deck was daunting.
              PitchCraft made it easy to present our vision clearly and
              effectively. The team collaboration feature is also a huge plus.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;