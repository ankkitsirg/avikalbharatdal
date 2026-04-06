"use client";

import Image from "next/image";


const team = [
    {
        name: "Shri Diwakar Prakash Tiwari",
        designation: "President",
        address: "Lucknow, India",
        image: "",
    },
    {
        name: "Shri Vimal Kumar Shukla",
        designation: "Vice President",
        address: "Lucknow, Uttar Pradesh",
        image: "",
    },
    // {
    //     name: "Smt Supriya Tiwari",
    //     designation: "Vice President",
    //     address: "Lucknow, Uttar Pradesh",
    //     image: "",
    // },
    {
        name: "Shri Keleshwari Pratap Singh",
        designation: "General Secretary",
        address: "Balrampur, Uttar Pradesh",
        image: "",
    },
    {
        name: "Shri Pramod Kumar Kashyap",
        designation: "General Secretary",
        address: "Lakhimpur Kheri, Uttar Pradesh",
        image: "",
    },
    {
        name: "Shri Mahendra Pratap",
        designation: "General Secretary",
        address: "Lucknow, Uttar Pradesh",
        image: "",
    },
    {
        name: "Shri Sudhir Kumar Gupta",
        designation: "Treasurer",
        address: "Lucknow, Uttar Pradesh",
        image: "",
    }


];

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO SECTION */}

            <section className="text-center py-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Meet Our Leadership
                </h1>

                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    Our dedicated team works tirelessly to build strong communities,
                    empower people, and lead initiatives that bring meaningful change.
                </p>
            </section>

            {/* TEAM GRID */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

                    {team.map((member, index) => (

                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
                        >

                            {/* IMAGE */}

                            <div className="relative h-60 w-full overflow-hidden">

                                <Image
                                    src={member.image || "/anonymous_male.jpg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-500"
                                />

                            </div>

                            {/* INFO */}

                            <div className="p-6 text-center">

                                <h3 className="text-xl font-bold text-gray-800">
                                    {member.name}
                                </h3>

                                <p className="text-orange-600 font-semibold mt-1">
                                    {member.designation}
                                </p>

                                <p className="text-gray-500 text-sm mt-2">
                                    {member.address}
                                </p>

                                {/* SOCIAL ICONS */}

                                <div className="flex justify-center gap-4 mt-4 opacity-70">

                                    <span className="cursor-pointer hover:text-blue-600">🌐</span>
                                    <span className="cursor-pointer hover:text-blue-500">🐦</span>
                                    <span className="cursor-pointer hover:text-blue-700">in</span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    );
}