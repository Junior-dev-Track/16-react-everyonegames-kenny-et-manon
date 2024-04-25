import { http } from "./network.js";

export const getAllGames = () => {
  return http.get("/games");
};

// export const d'autres fonctions dans le même style
