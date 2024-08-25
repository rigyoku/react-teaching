import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server"

// export const dynamic = 'force-static';

export const GET = (request: NextRequest, { params }: { params: { id: string } }) => {
    // redirect('/effect')
    console.log(`
        url: ${request.nextUrl}
        path: ${request.nextUrl.pathname}
        cookie: ${request.cookies}
        header: ${JSON.stringify(request.headers)}
        param name: ${request.nextUrl.searchParams.get('name')}
        id: ${params.id}
        `);
    return NextResponse.json('aaa', {
        status: 404,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}

export const POST = async (request: NextRequest) => {
    console.log(`
        fordata: ${(await request.formData()).get('name')
        }
        `);
    return NextResponse.json('aaa')
}