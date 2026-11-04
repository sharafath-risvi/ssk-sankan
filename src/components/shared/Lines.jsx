/**
 * Renders a headline as manually-broken, masked lines (deliberate line breaks).
 * Each line is a clipped wrapper; the inner span is what GSAP slides up.
 * Text stays real DOM text so it is selectable and screen-reader friendly.
 */
export default function Lines({ lines, accent }) {
  return lines.map((text, i) => (
    <span className="line" key={text + i}>
      <span className={`line__inner${accent === i ? ' is-accent' : ''}`}>{text} </span>
    </span>
  ))
}
