import { autocomplete } from "@algolia/autocomplete-js";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import algoliasearch from "algoliasearch";

import "@algolia/autocomplete-theme-classic";

const appId = "CSDBX0SZMQ";
const apiKey = "4bfa904cde10c4036e72bb5ad6a698d4";
const searchClient = algoliasearch(appId, apiKey);

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "crawler_ta_content",
  getSearchParams() {
    return {
      hitsPerPage: 10
    };
  }
});

autocomplete({
  container: "#autocomplete",
  placeholder: "Search",
  openOnFocus: true,
  plugins: [querySuggestionsPlugin]
});
