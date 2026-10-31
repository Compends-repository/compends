"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function getViewerId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Não autenticado");
  return session.user.id;
}

// Procura a amizade em qualquer direção
function findBetween(a: string, b: string) {
  return db.friendship.findFirst({
    where: {
      OR: [
        { requesterId: a, addresseeId: b },
        { requesterId: b, addresseeId: a },
      ],
    },
  });
}

export async function sendFriendRequest(targetId: string) {
  const me = await getViewerId();
  if (me === targetId) throw new Error("Você não pode adicionar a si mesmo");

  const existing = await findBetween(me, targetId);
  if (existing) return;

  await db.friendship.create({
    data: { requesterId: me, addresseeId: targetId },
  });
}

export async function acceptFriendRequest(requesterId: string) {
  const me = await getViewerId();
  await db.friendship.updateMany({
    where: { requesterId, addresseeId: me, status: "PENDING" },
    data: { status: "ACCEPTED" },
  });
}

// Serve para cancelar pedido enviado, recusar pedido recebido e desfazer amizade
export async function removeFriendship(otherId: string) {
  const me = await getViewerId();
  await db.friendship.deleteMany({
    where: {
      status: { not: "BLOCKED" },
      OR: [
        { requesterId: me, addresseeId: otherId },
        { requesterId: otherId, addresseeId: me },
      ],
    },
  });
}