"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LoaderCircleIcon } from "lucide-react";
import { Avatar2, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
} from "@/components/ui/autocomplete";

import ExpandableSearchBar from "@/components/ui/srcBar";

import definition3 from "@dicebear/styles/marbles.json" with { type: "json" };
import { Avatar, Style } from "@dicebear/core";

type Member = { id: string; name: string; avatar: string | null };

async function searchMembers(
  query: string,
  signal: AbortSignal,
): Promise<Member[]> {
  const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
    signal,
  });
  if (!res.ok) throw new Error("Falha na busca");
  return res.json();
}

const SPRING = { type: "spring", bounce: 0.15, duration: 0.3 } as const;

const dicebearStyle = new Style(definition3);

function getAvatarSrc(user: Member) {
  if (user.avatar) return user.avatar;

  return new Avatar(dicebearStyle, {
    seed: user.name ?? user.id,
    size: 200,
    backgroundColor: [
      "43aa8b",
      "4d96ff",
      "b57bff",
      "ff8c42",
      "2ec4b6",
      "f15bb5",
      "f55151",
    ],
  }).toDataUri();
}

const AutocompleteWithAsync = () => {
  const id = useId();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inputValue) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const data = await searchMembers(inputValue, controller.signal);
        setResults(data);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setError("Não foi possível buscar usuários. Tente de novo.");
        setResults([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputValue]);

  let status: ReactNode = null;
  if (isLoading) {
    status = (
      <div className="flex items-center gap-2">
        <LoaderCircleIcon className="size-4 animate-spin" />
        Buscando...
      </div>
    );
  } else if (error) {
    status = error;
  } else if (inputValue && results.length === 0) {
    status = `Nenhum usuário encontrado para "${inputValue}"`;
  } else if (results.length > 0) {
    status = `${results.length} usuário${results.length === 1 ? "" : "s"}`;
  }

  return (
    <div className="ml-auto mr-[-5]">
      <Autocomplete onInputValueChange={setInputValue}>
        <Label htmlFor={id} className="sr-only">
          Buscar usuários
        </Label>

        <div className="w-full flex justify-end mr-[100%]">
          <ExpandableSearchBar
            expandDirection="left"
            width={220}
            value={inputValue}
            className="text-white! h-[36]! w-[36]!"
          >
            <AutocompleteInput
              id={id}
              name="busca-usuarios"
              placeholder="Buscar usuários..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="h-10 rounded-none border-0 bg-transparent! pl-10 pr-0 text-white! placeholder:text-white/60 focus-visible:ring-0 "
            />
          </ExpandableSearchBar>
        </div>

        {inputValue && (
          <AutocompleteContent className="bg-[#6d6d6d2b] backdrop-blur-3xl w-[215]">
            {status && (
              <AutocompleteStatus className="text-[#aeaeaedf]!">
                {status}
              </AutocompleteStatus>
            )}
            <AutocompleteList>
              {results.map((member, idx) => (
                <AutocompleteItem
                  key={member.id}
                  value={member.id}
                  label={member.name}
                  className="rounded-lg py-1.5 cursor-pointer"
                  onClick={() => router.push(`/${member.id}`)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING, delay: idx * 0.04 }}
                    className="flex w-full items-center gap-2.5"
                  >
                    <Avatar2 className="size-9 shrink-0">
                      <AvatarImage
                        className="rounded-[14px]!"
                        src={getAvatarSrc(member)}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar2>
                    <p className="truncate text-sm font-medium text-[15.5px] text-white! font-Asap">
                      @{member.name}
                    </p>
                  </motion.div>
                </AutocompleteItem>
              ))}
            </AutocompleteList>
          </AutocompleteContent>
        )}
      </Autocomplete>
    </div>
  );
};

export default AutocompleteWithAsync;
