CREATE OR REPLACE FUNCTION recalculate_verified_view_count(viewed_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "VerifiedView" WHERE "articleId" = viewed_article_id);

    UPDATE "Article" 
    SET 
        "verifiedViewCount" = new_count,
        "viewCount" = "unverifiedViewCount" + new_count
    WHERE
        id=viewed_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recalculate_unverified_view_count(viewed_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "UnverifiedView" WHERE "articleId" = viewed_article_id);

    UPDATE "Article" 
    SET 
        "unverifiedViewCount" = new_count,
        "viewCount" = "verifiedViewCount" + new_count
    WHERE
        id=viewed_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_verified_view_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_verified_view_count(COALESCE(NEW."articleId",OLD."articleId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_unverified_view_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_unverified_view_count(COALESCE(NEW."articleId",OLD."articleId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verified_view_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON "VerifiedView"
FOR EACH ROW
EXECUTE FUNCTION update_verified_view_count();

CREATE TRIGGER unverified_view_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON "UnverifiedView"
FOR EACH ROW
EXECUTE FUNCTION update_unverified_view_count();