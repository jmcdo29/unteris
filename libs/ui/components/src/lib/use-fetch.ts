import { Sdk } from "@unteris/shared/sdk";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const sdk = new Sdk(baseUrl);
