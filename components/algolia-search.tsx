"use client";

import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit, SearchClient } from "instantsearch.js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCat } from "react-icons/fa";
import {
  Hits,
  Highlight,
  SearchBox,
  RefinementList,
  UseDynamicWidgetsProps,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useDynamicWidgets } from "react-instantsearch";

import {
  AuthorQueryResult,
  GuestQueryResult,
  PodcastQueryResult,
  PostQueryResult,
} from "@/sanity.types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const searchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

type HitProps = {
  hit: AlgoliaHit<
    NonNullable<
      | PodcastQueryResult
      | PostQueryResult
      | AuthorQueryResult
      | GuestQueryResult
    >
  >;
};

export default function AlgoliaSearch({
  showFacets = true,
  setOpen,
}: {
  showFacets?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [client, setClient] = useState<SearchClient | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (appId && searchApiKey && indexName) {
      setClient(algoliasearch(appId, searchApiKey));
    }
  }, []);

  const openInSearch = () => {
    const search = Array.from(searchParams.entries());
    router.push(`/search?${search?.at(0)?.join("=")}`);
    setOpen && setOpen(false);
  };

  const hitComponent = ({ hit }: HitProps) => {
    return (
      <>
        <li className="flex items-center space-x-2 border rounded-lg py-1 px-4">
          <FaCat className="h-5 w-5 text-gray-400" />
          <Link
            href={`${hit._type}/${hit.slug}`}
            className="hover:underline flex-1"
          >
            <div className="flex flex-col gap-1">
              <Highlight
                hit={hit}
                attribute="title"
                classNames={{ highlighted: "bg-primary" }}
                className="text-sm sm:text-xl font-bold"
              />
              <Highlight
                hit={hit}
                attribute="excerpt"
                classNames={{ highlighted: "bg-primary text-xs sm:text-sm" }}
              />
            </div>
          </Link>
          {!showFacets && (
            <div className="hidden sm:flex">
              <Button
                variant="outline"
                onClick={openInSearch}
                className="text-xs"
              >
                Open Search
              </Button>
            </div>
          )}
        </li>
      </>
    );
  };

  return (
    <>
      {client && indexName ? (
        <div className="px-0 sm:px-4 h-screen sm:h-[80vh] overflow-auto">
          <InstantSearchNext
            searchClient={client}
            indexName={indexName}
            routing
            future={{
              preserveSharedStateOnUnmount: true,
            }}
            // initialUiState={{
            //   [indexName]: {
            //     refinementList: {
            //       _type: ["course"],
            //     },
            //   },
            // }}
          >
            <div className="flex gap-8 p-2 sm:p-4">
              {showFacets && (
                <div className="hidden sm:flex flex-col gap-2">
                  <CustomDynamicWidgets />
                </div>
              )}
              <div className="flex-1">
                <div className=" flex flex-col gap-2">
                  Search
                  <SearchBox
                    placeholder="Search for your purr-fect thing!"
                    classNames={{
                      input:
                        "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1",
                    }}
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase">
                    Results
                  </h2>
                  <Hits
                    hitComponent={hitComponent}
                    classNames={{
                      list: "flex flex-col gap-2",
                      root: "h-full sm:h-[60vh] overflow-y-auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </InstantSearchNext>
        </div>
      ) : (
        <div className="text-center text-lg flex justify-center items-center h-full min-h-9">
          Missing Algolia Config
        </div>
      )}
    </>
  );
}

function CustomDynamicWidgets(props: UseDynamicWidgetsProps | undefined) {
  const { attributesToRender } = useDynamicWidgets(props);
  return attributesToRender.map((attribute) => (
    <div className="flex flex-col" key={attribute}>
      <div className="capitalize text-xl">
        {attribute === "_type" ? "Type" : attribute}
      </div>
      <RefinementList
        attribute={attribute}
        classNames={{
          list: "flex flex-col gap-1",
          label: "flex gap-2",
          count: "rounded-md border border-gray-300 p-1",
          labelText: "p-1 capitalize",
          checkbox: "p-1",
        }}
      />
    </div>
  ));
}
