// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {staticFilters} from "./data/staticFilters";

export default function handler(req, res) {
  res.status(200).json(staticFilters);
}