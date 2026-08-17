import { client as apiClient } from "@unteris/shared/sdk";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const client = apiClient.createClient({
	auth: () => sessionStorage.getItem("sessionId") ?? "",
	baseUrl,
	mode: "cors",
});
