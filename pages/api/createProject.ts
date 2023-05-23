import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  jsonParser(req, res, async () => {
    console.log(req.body);
    const result = await fetch(
      "http://217.197.0.155/data/projects/project/empty",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({}),
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Not 2xx response", { cause: response });

        return response.json();
      })
      .catch(() => []);
    console.log(result);
    res.status(200).json(result);
  });
}
