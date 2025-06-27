import { Button } from "../button"; // Assuming this path is correct

export default function Services() {
    const services = [
        {
            title: "Graduation",
            image: "/showcase-1.jpg",
            description: "Celebrate academic success with professional graduation portraits.",
            link: "/services/graduation",
        },
        {
            title: "Wedding",
            image: "/showcase-6.jpg",
            description: "Capture the magic of your special day with timeless wedding photography.",
            link: "/services/wedding",
        },
        {
            title: "Studio Shoot",
            image: "/showcase-4.jpg",
            description: "Creative studio sessions tailored to your personal or commercial needs.",
            link: "/services/studio-shoot",
        },
    ];

    return (
        <section className="container mx-auto px-4 my-20">
            <h2 className="font-black text-6xl mt-9 font-mono flex gap-3 justify-end text-right">
                <div className="i-solar-videocamera-record-bold-duotone rotate-45" />
                OUR SERVICES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {services.map(({ title, image, description, link }, index) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="relative group rounded-sm overflow-hidden shadow-xl transition-all h-full"
                    >
                        {/* Glow border - appears on hover */}
                        <div className="absolute inset-0 rounded-sm p-[2px] group-hover:bg-[conic-gradient(at_top_left,_#e0c3fc,_#8ec5fc,_#e0c3fc)] transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

                        <div className="relative h-full rounded-sm overflow-hidden">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Text Overlay - always visible at the bottom */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 transition-all duration-300 flex flex-col">
                                <div>
                                    <h3 className="text-white text-2xl font-bold mb-1">{title}</h3>
                                    <p className="text-white text-sm mb-3">{description}</p>
                                </div>
                                {/* Link wrapper for the "See More" button */}
                                <a
                                    href={link}
                                    onClick={(e) => {
                                        // Optional: Prevent default if using React Router for navigation
                                        // e.preventDefault();
                                        // navigate(link); // Example with a navigate function
                                        console.log(`Navigating to ${link}`);
                                    }}
                                    // self-start aligns to left, mt-auto pushes to bottom of flex container
                                    className="self-start mt-auto"
                                    aria-label={`See more about ${title}`} // For accessibility
                                >
                                    <Button
                                        // Combines base styling, hover visibility, animation, and focus styles
                                        className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold rounded shadow-md hidden group-hover:block transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
                                    >
                                        See More
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}