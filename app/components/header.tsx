import { Button } from "./button";
import Logo from "./logo";

export default function Header() {
    return <header className="sticky top-0 z-100 border-b-2 dark:border-neutral-7 bg-neutral-1/70 dark:bg-neutral-8/70 backdrop-blur-5 backdrop-saturate-[5]">
        <div className="container p-2 flex justify-between">
            <Logo /> 
            <ul className="flex gap-4 items-center">
                <li><a href="/">Home</a></li>
                <li><a href="/book">Booking</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <Button >
                <div className="i-solar-camera-bold"/>
                Book a shot</Button>
        </div>
    </header>
}