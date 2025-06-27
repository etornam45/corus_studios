export default function MapLocation() {
    return <section className="container mx-auto px-4 mt-16" id="location">
        <h2 className="text-4xl font-bold mb-4 text-center font-mono">Visit Our Studio</h2>
        <p className="text-center mb-6">We’re located in the heart of Kumasi. Walk-ins welcome!</p>
        <div className="w-full h-[400px] overflow-hidden rounded-sm border-2">
            {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.67443026459844!2d-1.5617914329209595!3d6.672813131064204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1747697961020!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    </section>

}