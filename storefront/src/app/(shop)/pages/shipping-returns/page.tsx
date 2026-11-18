import type { Metadata } from 'next';
import Link from 'next/link';
import { FeatureRow } from '@/components/FeatureRow';

export const metadata: Metadata = { title: 'Shipping & Returns', description: 'Free standard US shipping on orders $120+. Request returns within 30 days of ordering; a $5 fee applies to refunds.' };
export default function ShippingReturnsPage() {
 return <section className="section"><div className="container">
  <div className="section-head"><span className="eyebrow">The details</span><h1>Shipping &amp; Returns</h1><p className="lead">Know what to expect before your next round.</p></div>
  <FeatureRow cols={3} items={[
   {icon:'truck',title:'Free US shipping $120+',text:'Free standard shipping when your merchandise total reaches $120 after discounts, before tax. Standard shipping is $7 below $120. We currently ship to US addresses.'},
   {icon:'calendar',title:'30-day returns',text:'Contact us within 30 days of placing your order. Hats must be new and unused, with original tags and packaging.'},
   {icon:'needle',title:'Made for your order',text:'Each hat is made to order and ships within 10 business days. Delivery time begins after dispatch and varies by destination.'},
  ]} />
  <div className="prose" style={{marginTop:40}}>
   <h2>Returns and exchanges</h2><p>We offer exchanges for another available size or color and returns for store credit without a return fee. For a different style, request store credit and place a new order; any price difference is paid on that order.</p>
   <p>If you prefer a refund to your original payment method, a $5 restocking fee applies to each returned item. Original shipping charges are not refundable. Items must arrive in new, unused condition with their tags and original packaging.</p>
   <h2>How to start</h2><ol><li>Contact us within 30 days of your order date. Include your order number, the hat you are returning, and whether you want an exchange, store credit, or a refund.</li><li>Wait for return instructions before sending anything. We will confirm eligibility and provide the return details.</li><li>After your return arrives and is inspected, allow 3–5 business days for processing. Your payment provider may need additional time to post a refund.</li></ol>
   <h2>Damaged, defective, or incorrect items</h2><p>Contact us promptly with your order number and clear photos. We will review the issue and arrange a replacement or refund where appropriate, without a restocking fee for a confirmed defect or our error.</p>
   <h2>Delivery</h2><p>Production and shipping are separate. Your confirmation email will include tracking when available. Delivery estimates are not guarantees. We currently serve US addresses; international shipping is not available.</p>
   <Link href="/pages/contact" className="btn">Request a return or exchange</Link>
  </div>
 </div></section>;
}
