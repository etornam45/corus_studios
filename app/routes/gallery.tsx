import type React from 'react'; // Added React for event types
import { useState, useMemo, useEffect } from 'react';

// Sample Image Data (replace with your actual data source)
const allImagesData = [
    { id: 1, src: "/showcase-1.jpg", alt: "Graduation portrait", title: "Academic Achievement", category: "Graduation", date: "2023-05-15" },
    { id: 2, src: "/showcase-6.jpg", alt: "Wedding couple", title: "Love's Celebration", category: "Wedding", date: "2023-06-20" },
    { id: 4, src: "/showcase-2.jpg", alt: "Graduation cap toss", title: "Future Bright", category: "Graduation", date: "2022-05-20" },
    { id: 3, src: "/showcase-4.jpg", alt: "Studio fashion shoot", title: "Urban Edge", category: "Studio", date: "2023-03-10" },
    { id: 5, src: "/showcase-5.jpg", alt: "Bride getting ready", title: "Anticipation", category: "Wedding", date: "2023-07-01" },
    { id: 12, src: "/showcase-4.jpg", alt: "Artistic studio portrait", title: "Monochrome Mood", category: "Studio", date: "2021-02-14" },
    { id: 6, src: "/showcase-3.jpg", alt: "Creative studio lighting", title: "Light & Shadow", category: "Studio", date: "2022-11-05" },
    { id: 11, src: "/showcase-2.jpg", alt: "Wedding ceremony aisle", title: "Here Comes the Bride", category: "Wedding", date: "2023-04-05" },
    { id: 10, src: "/showcase-2.jpg", alt: "Graduation family photo", title: "Proud Family", category: "Graduation", date: "2021-05-16" },
    { id: 13, src: "/showcase-5.jpg", alt: "Bride getting ready", title: "Anticipation", category: "Wedding", date: "2023-07-01" },
    { id: 17, src: "/showcase-4.jpg", alt: "Artistic studio portrait", title: "Monochrome Mood", category: "Studio", date: "2021-02-14" },
    { id: 15, src: "/showcase-2.jpg", alt: "Graduation family photo", title: "Proud Family", category: "Graduation", date: "2021-05-16" },
    { id: 14, src: "/showcase-3.jpg", alt: "Creative studio lighting", title: "Light & Shadow", category: "Studio", date: "2022-11-05" },
    { id: 16, src: "/showcase-2.jpg", alt: "Wedding ceremony aisle", title: "Here Comes the Bride", category: "Wedding", date: "2023-04-05" },
    { id: 18, src: "/showcase-5.jpg", alt: "Bride getting ready", title: "Anticipation", category: "Wedding", date: "2023-07-01" },
    { id: 22, src: "/showcase-4.jpg", alt: "Artistic studio portrait", title: "Monochrome Mood", category: "Studio", date: "2021-02-14" },
    { id: 20, src: "/showcase-2.jpg", alt: "Graduation family photo", title: "Proud Family", category: "Graduation", date: "2021-05-16" },
    { id: 19, src: "/showcase-3.jpg", alt: "Creative studio lighting", title: "Light & Shadow", category: "Studio", date: "2022-11-05" },
    { id: 21, src: "/showcase-2.jpg", alt: "Wedding ceremony aisle", title: "Here Comes the Bride", category: "Wedding", date: "2023-04-05" },
];

const categories = ["All", "Graduation", "Wedding", "Studio"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GalleryPage() {
    const [images, setImages] = useState(allImagesData);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [expandedYear, setExpandedYear] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("All");

    const numericYears = useMemo(() => {
        const years = new Set(images.map(img => new Date(img.date).getFullYear()));
        return Array.from(years).sort((a, b) => b - a); // Sort descending for dropdown (latest first)
    }, [images]);

    const availableMonthsForExpandedYear = useMemo(() => {
        if (!expandedYear || expandedYear === "All") return [];
        const yearNum = Number.parseInt(expandedYear);
        const monthsInYear = new Set(
            images
                .filter(img => new Date(img.date).getFullYear() === yearNum)
                .map(img => new Date(img.date).getMonth())
        );
        return Array.from(monthsInYear).sort((a, b) => a - b);
    }, [images, expandedYear]);

    const filteredImages = useMemo(() => {
        return images.filter(image => {
            const imageDate = new Date(image.date);
            const imageYear = imageDate.getFullYear().toString();
            const imageMonth = imageDate.getMonth().toString();

            const categoryMatch = selectedCategory === "All" || image.category === selectedCategory;

            let dateMatch = false;
            if (selectedYear === "All") {
                dateMatch = true;
            } else if (imageYear === selectedYear) {
                if (selectedMonth === "All") {
                    dateMatch = true;
                } else if (imageMonth === selectedMonth) {
                    dateMatch = true;
                }
            }
            return categoryMatch && dateMatch;
        });
    }, [images, selectedCategory, selectedYear, selectedMonth]);

    useEffect(() => {
        if (expandedYear && selectedMonth !== "All") {
            const hasImagesForCurrentMonthSelection = images.some(image => {
                const imgDate = new Date(image.date);
                return (
                    (selectedCategory === "All" || image.category === selectedCategory) &&
                    imgDate.getFullYear().toString() === expandedYear &&
                    imgDate.getMonth().toString() === selectedMonth
                );
            });
            if (!hasImagesForCurrentMonthSelection) {
                setSelectedMonth("All");
            }
        }
    }, [selectedCategory, expandedYear, selectedMonth, images]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const yearValue = e.target.value;
        setSelectedYear(yearValue);
        if (yearValue === "All") {
            setExpandedYear(null);
            setSelectedMonth("All");
        } else {
            setExpandedYear(yearValue);
            setSelectedMonth("All");
        }
    };

    return (
        <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900 min-h-[70svh]">
            <div className="container mx-auto px-4">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Explore moments we've captured.
                    </p>
                </header>

                {/* Filters */}
                <div className="mb-12 space-y-6">
                    {/* Dropdown Filters */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-full mx-auto">
                        {/* Category Dropdown */}
                        <div className="w-full sm:w-60">
                            <label htmlFor="category-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                Category
                            </label>
                            <select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full py-2.5 px-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-md text-sm focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Dropdown */}
                        <div className="w-full sm:w-60">
                            <label htmlFor="year-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                Year
                            </label>
                            <select
                                id="year-filter"
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="w-full py-2.5 px-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-md text-sm focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                            >
                                <option value="All">All Years</option>
                                {numericYears.map(year => (
                                    <option key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Month Timeline (conditionally rendered) */}
                        {expandedYear && availableMonthsForExpandedYear.length > 0 && (
                            <div className="w-full max-w-3xl mx-auto animate-fade-in-down">
                                <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 mb-2">
                                    Months in {expandedYear}:
                                </p>
                                <div className="flex items-stretch rounded-md overflow-hidden shadow bg-white dark:bg-neutral-800">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedMonth("All")}
                                        title={`Show all months in ${expandedYear}`}
                                        className={`
                    px-3 py-2 text-xs font-medium transition-colors duration-200
                    focus:outline-none focus:z-10
                    ${selectedMonth === "All"
                                                ? 'bg-sky-500 text-white ring-1 ring-sky-400 ring-inset'
                                                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                            }
                  `}
                                    >
                                        All Months
                                    </button>
                                    {availableMonthsForExpandedYear.map((monthIndex) => (
                                        <button
                                            key={monthIndex}
                                            type="button"
                                            onClick={() => setSelectedMonth(monthIndex.toString())}
                                            title={`Filter by ${monthNames[monthIndex]} ${expandedYear}`}
                                            className={`
                                                    flex-1 px-1.5 py-2 text-[10px] sm:text-xs font-medium text-center transition-colors duration-200
                                                    border-l border-neutral-300 dark:border-neutral-600
                                                    focus:outline-none focus:z-10
                                                    ${selectedMonth === monthIndex.toString()
                                                    ? 'bg-sky-500 text-white ring-1 ring-sky-400 ring-inset'
                                                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
                                                }
                    `}
                                        >
                                            {monthNames[monthIndex]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {filteredImages.length > 0 ? (
                    <div
                        className="
              columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4
              [&>div:not(:first-child)]:mt-4 sm:[&>div:not(:first-child)]:mt-4
            "
                    >
                        {filteredImages.map(image => (
                            <div
                                key={image.id}
                                className="relative group overflow-hidden rounded-md shadow-lg break-inside-avoid-column"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end p-4">
                                    <h3 className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        {image.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-neutral-500 dark:text-neutral-400 text-lg py-10">
                        No images found for the selected filters.
                    </p>
                )}
            </div>
        </section>
    );
}