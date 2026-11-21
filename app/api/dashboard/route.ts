import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

async function getUserid() {
    const session = await auth.api.getSession({ headers: await headers()})
    return session?.user.id ?? null
}

export async function GET() {
    const userId = await getUserid();
    if (!userId) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

        const dash = await db.profile_dashboard.findUnique({ where: {id: userId}})
        return NextResponse.json({ layout: dash?.layout ?? null})
}

export async function PUT(req: Request) {
    const userId = await getUserid();
    if (!userId) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

    const { layout } = await req.json();
    if (!Array.isArray(layout)) {
        return NextResponse.json({ error: 'Layout inválido' }, { status: 400 })
    }

    await db.profile_dashboard.upsert({
        where: { id: userId },
        update: { layout },
        create: { id: userId, layout }
    })

    return NextResponse.json({ ok: true })
}