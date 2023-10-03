import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async(
    category?:Category | string,
    keywords?:string,
    isDynamic?:boolean
) =>{
    //GraphQL queries
    const query = gql`
    query myQuery($access_key: String!, $categories: String!, $countries: String, $keywords: String, $limit: String, $offset: String, $sort: String){
        myQuery(access_key: $access_key, categories: $categories, countries:"gb", keywords: $keywords, limit: $limit, offset: $offset, sort: "published_desc"){
            data{
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
    const res = await fetch('https://rambervillers.stepzen.net/api/wobbly-rattlesnake/__graphql',{
        method:'POST',
        cache: isDynamic? "no-cache" : "default",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body:JSON.stringify({
            query,
            variables:{
                access_key:process.env.ACCESS_KEY,
                categories:category,
                keywords:keywords,
            }

        })
    });

    console.log("Got response",
    "category",  category,  "keywords", keywords);

    const newsResponse = await res.json();
    //Sort function by images vs not images present
    //return res
    const news= sortNewsByImage(newsResponse.data.myQuery);

    return news;

}

export default fetchNews

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=d7f9087a7d096a1c42a020a84c7d1b79&sources=sports,business"

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=d7f9087a7d096a1c42a020a84c7d1b79&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"