import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const result = await fetch(URL + "/projects/project", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ ...req.body }),
  })
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
