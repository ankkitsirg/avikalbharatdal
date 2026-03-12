import Image from "next/image";

const teamMembers = [
  {
    name: "Rajesh Kumar",
    designation: "National President",
    address: "Delhi, India",
    image: "/team/member1.jpg",
  },
  {
    name: "Amit Sharma",
    designation: "Vice President",
    address: "Lucknow, Uttar Pradesh",
    image: "/team/member2.jpg",
  },
  {
    name: "Sanjay Verma",
    designation: "General Secretary",
    address: "Jaipur, Rajasthan",
    image: "/team/member3.jpg",
  },
  {
    name: "Rohit Singh",
    designation: "Treasurer",
    address: "Patna, Bihar",
    image: "/team/member4.jpg",
  },
  {
    name: "Vikas Gupta",
    designation: "State Coordinator",
    address: "Bhopal, Madhya Pradesh",
    image: "/team/member5.jpg",
  },
  {
    name: "Anil Yadav",
    designation: "District Head",
    address: "Varanasi, Uttar Pradesh",
    image: "/team/member6.jpg",
  },
  {
    name: "Deepak Mishra",
    designation: "Youth President",
    address: "Kanpur, Uttar Pradesh",
    image: "/team/member7.jpg",
  },
];

export default function TeamPage() {
  return (
    <main className="p-6 lg:p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-10">
        Our Team
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {teamMembers.map((member, index) => (

          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-5 text-center"
          >

            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full mx-auto mb-4 object-cover"
            />

            <h2 className="text-lg font-bold">
              {member.name}
            </h2>

            <p className="text-orange-600 font-medium">
              {member.designation}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {member.address}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}