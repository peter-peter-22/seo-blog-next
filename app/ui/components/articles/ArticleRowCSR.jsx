import ArticleRow from "@/app/ui/components/articles/ArticleRow";
import ArticleRowSkeleton from "@/app/ui/components/articles/ArticleRowSkeleton";
import  NoSsr  from "@mui/material/NoSsr";

export function ArticleRowCSR({ title, articles, filters, seeMore }) {
    //reduce unnecessary SSR by forcing CSR
    return (
        <NoSsr fallback={<ArticleRowSkeleton {...{ title, filters, seeMore }} />}>
            <ArticleRow  {...{ articles, title, filters }} />
        </NoSsr>
    )
}