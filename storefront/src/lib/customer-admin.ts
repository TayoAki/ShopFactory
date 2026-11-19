import { cookies } from 'next/headers';
import { cookieNames, session, CustomerError } from './customer-security';
export async function requireCustomerAdmin() {
 const jar=await cookies();if(!await session(jar.get(cookieNames.admin)?.value,'admin'))throw new CustomerError('Sign in to customer care.',401);
}
