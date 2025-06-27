import React from "react";

const images = [
    "showcase-1.jpg",
    "showcase-4.jpg",
    "showcase-2.jpg",
    "showcase-3.jpg",
    "showcase-5.jpg",
    "showcase-1.jpg",
    "showcase-6.jpg",
    "showcase-6.jpg",
];

export default function Gallery() {
    return (
        <section className="container mx-auto px-4">
            <h2 className="font-black text-6xl mt-9 font-mono flex gap-3">
                <div className="i-solar-gallery-circle-bold-duotone" />
                GALLERY
            </h2>

            <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 mt-8 space-y-3">
                {images.map((src, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={index} className="break-inside-avoid">
                        <img
                            src={src}
                            alt={`Gallery  ${index + 1}`}
                            className="w-full h-auto rounded-sm shadow-md hover:opacity-90 transition"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
