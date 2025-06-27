import { useRef } from "react";
import TypingText from "../typing-text";
import { Button } from "../button";



export default function HeroSection() {
    return <section className="relative overflow-hidden h-[70svh]">
        <div className="relative z-2 h-full pt-20 sm:pt-50 bg-black/60 text-white dark:bg-black/90">
            <div className="container">
                <p
                    className="font-black text-6xl sm:text-9xl"
                > More Than a Photo. It’s a Feeling.</p>
                <p
                    className="font-thin text-2xl mt-10"
                > Creative, modern, and expressive studio sessions tailored to your unique vision.
                </p>

                <p />

                <div className="flex gap-4 mt-7"><Button >Book a Session</Button>
                    <Button className="bg-neutral-5 border-neutral-8">View Portfolio</Button></div>
            </div>
        </div>
        <img className="absolute  top-0" src="/hero-section.jpg" alt="Hero background" />
    </section>
}