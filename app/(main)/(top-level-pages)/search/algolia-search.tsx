"use client";

import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit, SearchClient } from "instantsearch.js";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Hits,
  Highlight,
  SearchBox,
  RefinementList,
  DynamicWidgets,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import { Panel } from "./algolia-search-panel";
import {
  AuthorQueryResult,
  GuestQueryResult,
  PodcastQueryResult,
  PostQueryResult,
} from "@/sanity.types";

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

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="title" className="" />
      <span className="">${hit.title}</span>
      {/* <li className="flex items-center space-x-2">
                <FileIcon className="h-5 w-5 text-gray-400" />
                <a href="#" className="text-sm text-gray-700 hover:underline">
                  Send click and conversion events with React InstantSearch
                </a>
              </li> */}
    </>
  );
}

export default function AlgoliaSearch() {
  const [client, setClient] = useState<SearchClient | null>(null);

  useEffect(() => {
    if (appId && searchApiKey && indexName) {
      setClient(algoliasearch(appId, searchApiKey));
    }
  }, []);
  return (
    <>
      {client ? (
        <InstantSearchNext searchClient={client} indexName={indexName} routing>
          {/* <div className="grid items-start grid-cols-[minmax(min-content,200px)_1fr] gap-2">
            <div>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
            <div>
              <SearchBox />
              <Hits hitComponent={Hit} />
            </div>
          </div> */}

          <div className="flex h-screen">
            <div className="flex flex-col w-1/4 border-r">
              <div className="p-4 border-b">
                <div className="w-full">
                  <SearchBox />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase">
                    Results
                  </h2>
                  <Hits hitComponent={Hit} />
                </div>
              </div>
            </div>
            <div className="flex-1 p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  breadcrumb area
                </div>
                <h1 className="text-2xl font-bold">
                  Create an autocomplete search experience with React
                  InstantSearch
                </h1>
                <p className="text-gray-700">
                  Autocomplete is a ubiquitous part of most search experiences.
                  Search providers like Google, ecommerce sites like Amazon, and
                  messaging apps like Slack all offer autocomplete experiences
                  on mobile and desktop.
                </p>
                <h2 className="text-lg font-semibold">On this page</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Autocomplete or React InstantSearch?</li>
                  <li>Using Autocomplete with React InstantSearch</li>
                </ul>
              </div>
            </div>
          </div>
        </InstantSearchNext>
      ) : (
        <div>Missing Algolia Config</div>
      )}
    </>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}
