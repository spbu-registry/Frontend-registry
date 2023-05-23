import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed" });
    return;
  }

  jsonParser(req, res, async () => {
    const result = await fetch("http://217.197.0.155/data/projects/project", {
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
    res.status(200).json(result);
  });
}
