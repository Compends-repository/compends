import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react";

export default function Footer() {
  const [active, setActive] = useState(false)
  return (
    <footer className="relative z-30 bg-[#222222] text-white pb-10 min-h-[300]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50] mb-[-1%] -translate-y-full bg-linear-to-b from-transparent to-[#222222]" />
      <h1 className="font-author text-[62px] mt-[1%] ml-[2%] font-black">
        Special thanks
        <span className="text-[21px] underline">compends.com</span>
      </h1>

      <ul className="text-[14px] font-semibold font-author mt-[1%] w-[900] ml-[2.5%] space-y-3">
        <li>
          To <span className="underline">my mother</span>, who supported me by providing a home, food, an
          incredible family, and a good environment in which to live and study.
          she is the reason Compends exists. She will always be the most important person to Compends, and to me.
        </li>

       <li><span className="underline">My father, Henrique</span>... a man who passed away when I was 12 years old; a father who could no longer see his children at the end of the day... He was—and remains—very important in my life, for after his death, I began to take care of myself, earn good grades, and strive for self-improvement each and every day.</li>

        <li>To <span className="underline">my grandfather, Silvestro</span> — he was one of the most important people in my life. The day he passed away was very sad... but months later, I began building my company. That is why I am here: I want to honor everyone mentioned in this description and make them proud of me.</li>

        <li>
          To my friend <span className="underline">Eduardo Jorge</span>, who has been
          by my side for 5 years. He has helped me grow both personally and
          within Compends by sharing opinions, ideas, and examples.
        </li>

        <li>
          To <span className="underline">Victor Romero</span>, who helped us a
          lot with his opinions and ideas. He will always be a part of Compends'
          story and foundation.
        </li>

        <li>To my <span className="underline">English teacher, Victor</span>... he told me not to give up, to keep developing my website, my work... At the time he said this, he didn’t know about Compends, or about its importance and its goals, but... he simply gave me that piece of advice, which helped me a great deal; I didn’t give up, and today, here we still are, with billions of people using our website.</li>


        <ol>
          <li className="text-[26px] pt-[5%]">Services used</li>
          <li>React</li>
          <li>Next js</li>
          <li>Vercel</li>
          <li>Cloudflare</li>
          <li>Motion</li>
          <li>Filepond</li>
          <li>React Grid Layout</li>
          <li>Prisma ORM</li>
          <li>STRIPE</li>
          <li>Better Auth</li>
          <li>React Hook Form</li>
          <li>Tailwind CSS</li>
          <li>shadcn/ui</li>
          <li>es-toolkit</li>
          <li>Github</li>
          <li>VS Code</li>
        </ol>
      </ul>

      {/*<button className="h-8 rounded-md border w-23 bg-white" onClick={() => setActive(prev => !prev)}>
        {active && (
          <ScrollArea className='absolute -mt-190 ml-[810] h-64 w-49 rounded-md border'>
            <h4>Versions</h4>
            <ul>
              <li>Compends - v1.0.0 (terminal)</li>
              <li>Compends - v1.0.2 (terminal)</li>
              <li>Compends - v1.1.0 (terminal)</li>
              <li>Compends - v1.1.5 (terminal)</li>
              <li>Compends - v1.2.0 (terminal)</li>
              <li>Compends - v1.3.0 (terminal)</li>
              <li>Compends - v1.4.0 (terminal)</li>
              <li>Compends - v1.5.0 (terminal)</li>
              <li>Compends - v1.5.6 (terminal)</li>
            </ul>
          </ScrollArea>
        )}
      </button>*/}
    </footer>
  );
}
