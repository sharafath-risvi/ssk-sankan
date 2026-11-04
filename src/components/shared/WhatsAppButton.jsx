import '../../styles/shared/whatsapp.css'

const WHATSAPP_NUMBER = '919840041750'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/**
 * Floating WhatsApp contact button present on both SSK and Sankan websites.
 * Direct clickable link to the official business WhatsApp number: +91 98400 41750.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with SSK &amp; Sankan on WhatsApp (+91 98400 41750)"
    >
      <span className="floating-whatsapp__label">Chat on WhatsApp</span>
      <span className="floating-whatsapp__btn">
        <svg
          className="floating-whatsapp__icon"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.01 2.002c-7.72 0-14 6.275-14 13.993 0 2.473.645 4.887 1.87 7.012L2 30l7.21-1.84a13.96 13.96 0 0 0 6.8 1.748h.006c7.718 0 13.994-6.275 13.994-13.993 0-3.738-1.456-7.252-4.1-9.896A13.91 13.91 0 0 0 16.01 2.002zm0 25.594h-.005a11.59 11.59 0 0 1-5.91-1.615l-.424-.252-4.4 1.122 1.176-4.288-.276-.44a11.603 11.603 0 0 1-1.777-6.13c0-6.402 5.21-11.608 11.616-11.608 3.104 0 6.022 1.209 8.216 3.403a11.54 11.54 0 0 1 3.402 8.212c0 6.403-5.21 11.608-11.612 11.608zm6.367-8.694c-.349-.175-2.065-1.018-2.385-1.135-.32-.116-.553-.175-.785.175-.233.35-.902 1.135-1.106 1.368-.204.233-.407.262-.756.087-.349-.174-1.474-.543-2.808-1.732-1.038-.925-1.74-2.068-1.944-2.417-.204-.35-.022-.538.153-.712.157-.156.35-.407.524-.61.174-.204.232-.35.349-.583.116-.233.058-.437-.029-.611-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.588-.785-.599l-.669-.012c-.233 0-.611.088-.931.437-.32.35-1.222 1.194-1.222 2.912s1.251 3.378 1.426 3.611c.174.233 2.463 3.762 5.967 5.275.833.36 1.484.575 1.99.736.837.266 1.598.228 2.2.138.67-.1 2.065-.844 2.356-1.66.291-.815.291-1.514.204-1.66-.087-.146-.32-.233-.669-.408z" />
        </svg>
      </span>
    </a>
  )
}

