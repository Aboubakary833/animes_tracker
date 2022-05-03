import axios from "axios";

export function possibleAnimesId() {
  const ids = [];
  for (let i = 0; i <= 24008; i++) {
    ids.push({
      params: {
        id: i,
      },
    });
  }

  return ids;
}


export async function getAnimeById(id) {
    const response = await axios.get(`process.env.NEXT_PUBLIC_JIKAN_API_URL/${id}`)
    const {data} = response
    return data
}