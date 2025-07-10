const page = () => {
  return (
    <main>
      <section>
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-30 px-4 text-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Craft the perfect pitch deck in minutes,
              <br className="hidden sm:inline" /> powered by AI
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              Generate a professional startup pitch deck instantly with our
              AI-powered tool. <br className="hidden sm:inline" /> Simply
              describe your startup idea, and let PitchCraft do the rest.
            </p>
            <button className="px-6 py-2 bg-black text-white font-medium rounded-3xl hover:bg-gray-800 transition mt-10">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
