export default function ContactPage() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {/* Address Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Our Address</h2>
        <p>Avikal Bharat Dal</p>
        <p>First Floor, Shipra Complex,Amrapali Market </p>
        <p>A-Block , Indira Nagar</p>
        <p>Lucknow , Uttar Pradesh, India</p>
        <p>Phone: +91-9455030000,+91-8765136901</p>
       
      </section>

      {/* Google Map Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Find Us on Map</h2>
        <div className="w-full h-96">
       
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.697108962774!2d80.97801377489391!3d26.88136276143812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd5691f89877%3A0x6360ae123d8b0cdf!2sShipra%20Complex!5e0!3m2!1sen!2sin!4v1772538644010!5m2!1sen!2sin" 
          width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </main>
  );
}