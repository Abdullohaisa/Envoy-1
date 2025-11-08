import { APIKEY } from "@/constants/locations";

interface Api {
  text: string;
}

export const LOCATION_PICKER_API = ({ text }: Api) => {
  return `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${encodeURIComponent(
    text
  )}&at=41.3111,69.2797&apiKey=${APIKEY}`;
};
