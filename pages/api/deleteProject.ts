import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).send({ message: "Only DELETE requests allowed" });
    return;
  }

  jsonParser(req, res, async () => {
    const result = await fetch(
      "http://217.197.0.155/data/projects/project?id=" + req.body.id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id: req.body.id }),
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Not 2xx response", { cause: response });

        return response.json();
      })
      .catch(() => []);
    res.status(200).json(result);
  });
}
