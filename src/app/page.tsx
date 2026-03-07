export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 text-black">
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Avikal Bharat Dal
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          A New Vision for a Stronger India
        </p>
        <a
          href="/join"
          className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Join the Movement
        </a>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Avikal Bharat Dal is committed to transparent governance,
          youth empowerment, economic development, and social justice.
          We believe in building a progressive and inclusive India.
        </p>
      </section>

      {/* Founder Message */}
      <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Message from the Founder</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Our mission is to bring honest leadership and real development
          to every citizen. Together, we can transform our nation.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        © {new Date().getFullYear()} Avikal Bharat Dal. All rights reserved.
      </footer>

    </main>
  );
}