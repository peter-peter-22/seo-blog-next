CREATE OR REPLACE FUNCTION recalculate_author_tag_counts(tags TEXT[], changed_user TEXT)
RETURNS VOID AS $$
DECLARE
    tag TEXT;
    new_count INT;
BEGIN
    FOREACH tag IN ARRAY tags LOOP
        -- calculate the count
        new_count:=(SELECT COUNT(*) FROM "Article" WHERE "userId" = changed_user AND tag = ANY("Article".tags));

        IF new_count > 0 THEN
            -- if the count is not 0, insert or update
            INSERT INTO "AuthorTag" (name, count, "userId")
                VALUES (tag, new_count, changed_user)
            ON CONFLICT ("userId",name)
            DO UPDATE SET
                count=new_count;
        ELSE
            -- if the count is zero, delete
            DELETE FROM "AuthorTag" WHERE "userId" = changed_user AND name = tag AND count = 0;
        END IF;

    END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_author_tags_on_articles_change()
RETURNS TRIGGER AS $$
BEGIN

    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        PERFORM recalculate_author_tag_counts(NEW.tags,NEW."userId");
    END IF;

    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        PERFORM recalculate_author_tag_counts(OLD.tags,OLD."userId");
    END IF;

    -- Handle UPDATE
    IF TG_OP = 'UPDATE' THEN
        PERFORM recalculate_author_tag_counts(ARRAY(SELECT DISTINCT UNNEST(NEW.tags || OLD.tags)),NEW."userId");
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_authors_tags_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Article"
FOR EACH ROW
EXECUTE FUNCTION update_author_tags_on_articles_change();