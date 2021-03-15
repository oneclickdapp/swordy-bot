import { routes, navigate, Link } from '@redwoodjs/router'
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaPepperHot, FaDiscord } from 'react-icons/fa'
import { toast } from 'react-hot-toast'


const FooterLink = ({ href, label, icon: Icon }) => {
  return (
    <li className="inline-block pl-6">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out"
      >
        <span className="sr-only">{label}</span>
        <Icon className="w-5 h-5 fill-current" />
      </a>
    </li>
  )
}

const Footer = () => (
  <footer className="container py-12 md:flex md:items-center md:justify-between max-w-7xl mx-auto px-4 sm:px-6">
    <ul className="flex justify-center md:order-2">
      <FooterLink
        href={'https://twitter.com/NiftyChess'}
        icon={FaTwitter}
        label="Twitter"
      />
      <FooterLink
        href={'https://www.metacartel.org/'}
        icon={FaPepperHot}
        label="Cartel"
        />
        <FooterLink
        href={"https://discord.gg/Aa3WdzPH"}
        icon={FaDiscord}
        label="Discord"
        />
    </ul>
    <div className="mt-8 md:mt-0 md:order-1">
      <p className="text-center text-sm md:text-base text-gray-700">
        ©{new Date().getFullYear()} Nifty Chess
      </p>
    </div>
  </footer>
)
export default Footer
