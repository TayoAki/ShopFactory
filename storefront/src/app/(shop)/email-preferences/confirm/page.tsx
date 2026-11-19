import type {Metadata} from 'next';
import Link from 'next/link';
export const metadata:Metadata={title:'Confirm email signup',robots:{index:false,follow:false}};
export default async function Confirm({searchParams}:{searchParams:Promise<{token?:string}>}) {
 const {token=''}=await searchParams;return <section className="section"><div className="container" style={{maxWidth:600}}><h1>A little more Bogey Baby.</h1><p className="lead">Confirm that you want occasional emails about new colors and drops. Unsubscribe at any time.</p>{/^[A-Za-z0-9_-]{43}$/.test(token)?<form method="post" action="/api/email-preferences/confirm"><input type="hidden" name="token" value={token}/><button className="btn">Confirm email signup</button></form>:<p>This link is not valid. <Link href="/">Request a new signup email</Link>.</p>}</div></section>;
}
