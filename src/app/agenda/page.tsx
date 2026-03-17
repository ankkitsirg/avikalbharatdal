export default function AgendaPage() {
  const agenda = [
    {
      title: "Transparent Governance",
      icon: "🏛️",
      points: [
        "Zero tolerance for corruption",
        "Digital governance and accountability",
        "Faster public service delivery",
      ],
    },
    {
      title: "Youth Empowerment",
      icon: "👨‍🎓",
      points: [
        "Employment opportunities for youth",
        "Skill development programs",
        "Support for startups and innovation",
      ],
    },
    {
      title: "Economic Development",
      icon: "💰",
      points: [
        "Strengthening MSMEs",
        "Boosting local industries",
        "Promoting Make in India",
      ],
    },
    {
      title: "Agriculture & Farmers Welfare",
      icon: "🌾",
      points: [
        "Fair pricing for crops",
        "Modern farming techniques",
        "Financial support & subsidies",
      ],
    },
    {
      title: "Healthcare for All",
      icon: "🏥",
      points: [
        "Affordable healthcare services",
        "Improved rural health infrastructure",
        "Free basic medical facilities",
      ],
    },
    {
      title: "Education Reform",
      icon: "📚",
      points: [
        "Quality education for all",
        "Digital learning platforms",
        "Skill-based curriculum",
      ],
    },
    {
      title: "Social Justice & Equality",
      icon: "👩‍👩‍👧‍👦",
      points: [
        "Equal rights for all communities",
        "Women empowerment initiatives",
        "Support for weaker sections",
      ],
    },
    {
      title: "Infrastructure Development",
      icon: "🌍",
      points: [
        "Smart cities and villages",
        "Better transport & connectivity",
        "Clean and sustainable environment",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-party-light">

      {/* HERO */}
      <section className="bg-party-orange text-white text-center py-16 px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          National Agenda
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Building a strong, transparent and inclusive India
        </p>
      </section>

      {/* INTRO */}
      <section className="py-12 px-6 md:px-20 text-center">
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Avikal Bharat Dal is committed to governance reform, economic growth,
          youth empowerment, and social justice. Our agenda reflects the vision
          of a progressive and united India.
        </p>
      </section>

      {/* AGENDA GRID */}
      <section className="px-6 md:px-20 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {agenda.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 border-t-4 border-party-orange"
            >
              <div className="text-3xl mb-3">{item.icon}</div>

              <h2 className="text-xl font-bold mb-3 text-gray-800">
                {item.title}
              </h2>

              <ul className="space-y-2 text-gray-600 text-sm">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-party-orange">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="bg-party-gray py-12 text-center px-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          "अखंड भारत, समृद्ध भारत"
        </h3>
        <p className="text-gray-600 mt-2">
          Unity • Development • Honest Leadership
        </p>
      </section>

    </main>
  );
}