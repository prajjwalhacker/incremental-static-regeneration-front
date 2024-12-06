
import { revalidatePath } from "next/cache";
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
     const path = request.nextUrl.searchParams.get('path');

     if (path) {
        revalidatePath(path);
        return Response.json({ revalidate: true, date: new Date() });
     }
     return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
      })
}