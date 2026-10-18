export default function Footer() {
  return (
    <footer className="relative mt-auto bg-[#222222] text-white pb-10 min-h-[300]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50] mb-[-1%] -translate-y-full bg-linear-to-b from-transparent to-[#222222]" />
      <h1 className="font-author text-[62px] mt-[1%] ml-[2%] font-black">
        Special thanks
        <span className="text-[21px] underline">compends.com</span>
      </h1>

      <ul className="text-[13px] font-semibold mt-[1%] w-[900] ml-[2.5%] space-y-2">
        <li>My mom</li>

        <li>My father and grandpa</li>

        <li>
          To my friend <span className="underline">Eduardo Jorge</span>, who has been by my side for
          5 years. He helped me grow, both personally and with Compends. I hope he's good nowadays.
        </li>

        <li>
          To <span className="underline">Victor Romero</span>, who helped us a lot with his opinions
          and ideas. He will always be a part of Compends' story and foundation.
        </li>

        <li>My english teacher Victor</li>
        <li>My family</li>
      </ul>
    </footer>
  );
}
