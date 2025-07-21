const Pricing = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 mt-4">
          Choose the plan that fits your startup’s needs. Start for free,
          upgrade anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
          <p className="mt-2 text-gray-600">Perfect to test the waters</p>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            $0
            <span className="text-base font-medium text-gray-500">/month</span>
          </p>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✅ 1 project</li>
            <li>✅ AI pitch deck generation</li>
            <li>⚠️ Limited export (no PDF)</li>
          </ul>
          <button className="mt-26 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition ">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black relative">
          <span className="absolute -top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
            Most Popular
          </span>
          <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
          <p className="mt-2 text-gray-600">For serious founders & teams</p>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            $29
            <span className="text-base font-medium text-gray-500">/month</span>
          </p>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✅ Unlimited pitch decks</li>
            <li>✅ PDF export & sharing</li>
            <li>✅ Real-time team collaboration</li>
            <li>✅ Access to all custom themes</li>
            <li>✅ Priority support</li>
          </ul>
          <button className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;