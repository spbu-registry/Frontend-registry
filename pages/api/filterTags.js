import { tags } from "./data/tags";

export default function handler(req, res) {

    const url = new URL('http://localhost:3000/projects' + req.url, req.headers.host);
    const searchParams = url.searchParams;

    const ans = [];
    if (searchParams.get('q') !== '') {
        for (const tag of tags) {
            if (tag.toLowerCase().includes(searchParams.get('q').toLowerCase()))
                ans.push(tag);
        }
    }
    

    res.status(200).json(ans);
}
