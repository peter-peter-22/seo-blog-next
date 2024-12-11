CREATE OR REPLACE FUNCTION recalculate_article_count(user_id TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE "User" 
    SET 
        "articleCount" = (SELECT COUNT(*) FROM "Article" WHERE "userId" = user_id)
    WHERE
        id=user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_article_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_article_count(COALESCE(NEW."userId",OLD."userId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER article_count_trigger
AFTER INSERT OR DELETE ON "Article"
FOR EACH ROW
EXECUTE FUNCTION update_article_count();

-- recalculate the article count for all users
CREATE OR REPLACE PROCEDURE restart_article_counts() AS $$
DECLARE
    row_record RECORD;
BEGIN
    FOR row_record IN
        SELECT id FROM "User"
    LOOP
        PERFORM recalculate_article_count(row_record.id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;