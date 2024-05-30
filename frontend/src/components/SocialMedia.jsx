import { BsTwitterX } from "react-icons/bs";
import { TfiLinkedin } from "react-icons/tfi";
import { VscGithub } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";

const SocialMedia = () => {
  return (
    <ul className="flex gap-4 mt-12">
        <li>
            <a href="https://twitter.com/Ziphozenkosi478" className="text-4xl">
                <BsTwitterX />
            </a>
        </li>
        <li>
            <a href="linkedin.com/in/ziphozenkosi" className="text-4xl">
                <TfiLinkedin />
            </a>
        </li>
        <li>
            <a href="https://github.com/Ziphozenkosimthombe" className="text-4xl">
                <VscGithub />
            </a>
        </li>
        <li>
            <a href="mailto:ziphoncayiyana@gmail.com" className="text-4xl">
                <AiOutlineMail />
            </a>
        </li>
    </ul>
  )
}

export default SocialMedia
