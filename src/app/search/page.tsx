import NewsList from "@/components/NewsList";
import fetchNews from "@/lib/fetchNews"

type Props={
    searchParams: {term:string},
}

async function searchPage({searchParams}:Props) {
 const news:NewsResponse= await fetchNews(
    "general",
    searchParams?.term,
    true,
 );   
  return (
    <div>
        <h1 className="headerTitle">Search Results For: {searchParams?.term}</h1>
        <NewsList news={news}/>
    </div>
  )
}

export default searchPage