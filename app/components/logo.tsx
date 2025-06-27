export default function Logo() {
    return <a href="/"  className=" outline-amber font-mono font-black text-lg flex items-center gap-1 w-max">
        <img src="/corus.svg" width={30} height={30} alt="Corus Studio Logo" /> <span className="text-lg line-height-[1.1rem]">Corus <br /> Studio</span>
    </a>
}