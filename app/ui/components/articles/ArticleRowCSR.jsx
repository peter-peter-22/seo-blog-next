import ArticleRow from "@/app/ui/components/articles/ArticleRow";
import ArticleRowSkeleton from "@/app/ui/components/articles/ArticleRowSkeleton";
import { NoSsr } from "@mui/material";

export function ArticleRowCSR({ title, articles, filters }) {
    //reduce unnecessary SSR by forcing CSR
    return (
        <NoSsr fallback={<ArticleRowSkeleton {...{ title, filters }} />}>
            <ArticleRow  {...{ articles, title, filters }} />
        </NoSsr>
    )
}