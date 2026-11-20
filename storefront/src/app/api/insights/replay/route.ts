import {requireCustomerAdmin} from '@/lib/customer-admin';
import {customerFailure,requireOrigin} from '@/lib/customer-security';
import {replayEvents,deleteRecording} from '@/lib/insights';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'};
export async function GET(request:Request){try{await requireCustomerAdmin();return Response.json({events:await replayEvents(new URL(request.url).searchParams.get('id')||'')},{headers});}catch(e){return customerFailure(e);}}
export async function DELETE(request:Request){try{requireOrigin(request);await requireCustomerAdmin();await deleteRecording(new URL(request.url).searchParams.get('id')||'');return Response.json({ok:true},{headers});}catch(e){return customerFailure(e);}}
