import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '../contact/ContactForm';
export const metadata: Metadata = { title: 'Customer Feedback', description: 'Share your experience with a Bogey Baby hat. Customer feedback is reviewed before publication.' };
export default function ReviewsPage() {
 return <section className="section"><div className="container split" style={{alignItems:'start'}}><div>
  <h1>How does your hat fit?</h1>
  <p className="lead" style={{marginTop:14}}>Already wearing Bogey Baby? Tell us what you love and what we could improve.</p>
  <p>We haven’t published customer reviews yet. We’ll check order details and ask permission before sharing feedback publicly. Submitting this form does not publish your name or message.</p>
  <p>Include the hat style, how it fits and, if helpful, your head measurement. An order reference helps us verify your purchase. For purchases elsewhere, tell us where you ordered.</p>
  <p>Please leave out payment details and other sensitive information. If you have a photo to share, mention it here; we’ll follow up about permission and how to send it.</p>
  <p><Link className="link" href="/pages/contact?kind=fit">Need fit advice before ordering?</Link> · <Link className="link" href="/collections/all">Shop hats</Link></p>
 </div><ContactForm defaultKind="review"/></div></section>;
}
