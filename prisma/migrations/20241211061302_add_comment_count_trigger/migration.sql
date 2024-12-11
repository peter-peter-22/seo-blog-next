CREATE OR REPLACE FUNCTION recalculate_comment_count(commented_article TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE "Article" 
    SET 
        "commentCount" = (SELECT COUNT(*) FROM "Comment" WHERE "articleId" = commented_article)
    WHERE
        id=commented_article;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_comment_count(COALESCE(NEW."articleId",OLD."articleId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comment_count_trigger
AFTER INSERT OR DELETE ON "Comment"
FOR EACH ROW
EXECUTE FUNCTION update_comment_count();