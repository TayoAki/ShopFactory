import { requireCustomerAdmin } from '@/lib/customer-admin';
import { body,requireOrigin,customerFailure } from '@/lib/customer-security';
import { growthSnapshot,mutateGrowth } from '@/lib/growth';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'};
export async function GET(request:Request){try{await requireCustomerAdmin();const value=new URL(request.url).searchParams.get('days');const days=[7,28,90].includes(Number(value))?Number(value):7;return Response.json(await growthSnapshot(days),{headers});}catch(error){return customerFailure(error);}}
export async function POST(request:Request){try{requireOrigin(request);await requireCustomerAdmin();await mutateGrowth(await body(request));return Response.json({ok:true},{headers});}catch(error){return customerFailure(error);}}
