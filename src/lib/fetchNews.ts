import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async(
    category?:Category | string,
    keywords?:string,
    isDynamic?:boolean
) => {
    //GraphQL queries
    const query = gql`
    query MyQuery($access_key: String!
        $categories: String!
        $keywords: String
    ) {
        myQuery(access_key: $access_key
            categories: $categories
            countries: "us"
            sort: "published_desc"
            keywords: $keywords)
            {
            data
            {
                author
                category
                country
                description
                image
                language
                published_at
                source
                title
                url
            }
            pagination{
                count
                limit
                offset
                total
            }
        }
    }`;
    //fetch function with nextjs 13 catching
    const res = await fetch('https://rambervillers.stepzen.net/api/zooming-whale/__graphql',{
        method:'POST',
        cache: isDynamic? "no-cache" : "default",
        headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables:{
                access_key:process.env.ACCESS_KEY,
                categories:category,
                keyword:keywords,
            },

        }),
    });

    console.log("Got response",
    "category",  category,  "keywords", keywords);

    const newsResponse = await res.json();
    //Sort function by images vs not images present
    //return newsResponse;
    const news= sortNewsByImage(newsResponse.data.myQuery);
    
    return news || 'fetch error';
    

}

export default fetchNews;

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=API&sources=sports,business"

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=API&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"