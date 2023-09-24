import { stash } from "pactum";

export const csrfStoreToken = stash.getStoreKey("csrfToken");
export const sessionStoreToken = stash.getStoreKey("sessionId");
export const refreshStoreToken = stash.getStoreKey("refreshId");
