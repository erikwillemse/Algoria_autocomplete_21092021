/** @jsx h */
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { h } from "preact";

import "@algolia/autocomplete-theme-classic";

const searchClient = algoliasearch(
  "CSDBX0SZMQ",
  "4bfa904cde10c4036e72bb5ad6a698d4"
);

function ProductItem({ hit, components }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--alignTop">
          <img src={hit.image} alt={hit.title} width="40" height="40" />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>
          <div className="aa-ItemContentDescription">
            <components.Snippet hit={hit} attribute="description" />
          </div>
        </div>
      </div>
    </div>
  );
}

autocomplete({
  container: "#autocomplete",
  placeholder: "Search for products",
  detachedMediaQuery: "none",
  panelPlacement: "full-width",
  getSources({ query }) {
    return [
      {
        sourceId: "products",
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: "crawler_ta_content",
                query,
                params: {
                  hitsPerPage: 10,
                  attributesToSnippet: ["name:10", "description:50"],
                  snippetEllipsisText: "…"
                }
              }
            ]
          });
        },
        templates: {
          item({ item, components }) {
            return <ProductItem hit={item} components={components} />;
          }
        }
      }
    ];
  }
});
