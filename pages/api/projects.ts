import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(process.env.SERVER_URL + "data/projects")
    .then((response) => {
      if (!response.ok)
        throw new Error("Not 2xx response", { cause: response });

      return response.json();
    })
    .catch(() => []);
  /*
    catch возвращает пустой объект, чтобы не ломать всю страницу, если код ответа не 2xx.
    Потом поведение можно поменять, просто пока это самое простое решение
    */

  res.status(200).json(result);
}
