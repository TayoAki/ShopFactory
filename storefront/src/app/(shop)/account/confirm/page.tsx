import type {Metadata} from 'next';
import Link from 'next/link';
export const metadata:Metadata={title:'Confirm sign-in',robots:{index:false,follow:false}};
export default async function Confirm({searchParams}:{searchParams:Promise<{token?:string}>}) {
 const {token=''}=await searchParams;const valid=/^[A-Za-z0-9_-]{43}$/.test(token);
 return <section className="section"><div className="container" style={{maxWidth:600}}><h1>Sign in to Bogey Baby</h1>{valid?<><p className="lead">Choose Sign in to open your paid orders. This link can be used once.</p><form method="post" action="/api/account/confirm"><input type="hidden" name="token" value={token}/><button className="btn">Sign in</button></form></>:<p>This link is not valid. <Link href="/account">Request a new sign-in email</Link>.</p>}</div></section>;
}
