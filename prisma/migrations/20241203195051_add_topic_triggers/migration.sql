CREATE OR REPLACE FUNCTION recalculate_tag_counts(tags TEXT[])
RETURNS VOID AS $$
DECLARE
    tag TEXT;
BEGIN
    FOREACH tag IN ARRAY tags LOOP
        -- Update the count for the tag
        UPDATE "Topic"
        SET count = (SELECT COUNT(*) FROM "Article" WHERE "Article".tags @> ARRAY[tag])
        WHERE name = tag;

        -- Remove the tag if the count is 0
        DELETE FROM "Topic" WHERE name = tag AND count = 0;

        -- Insert the tag if it doesn't exist yet
        INSERT INTO "Topic" (name, count)
        SELECT tag, (SELECT COUNT(*) FROM "Article" WHERE "Article".tags @> ARRAY[tag])
        WHERE NOT EXISTS (SELECT 1 FROM "Topic" WHERE name = tag);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_topics_on_articles_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        PERFORM recalculate_tag_counts(NEW.tags);
    END IF;

    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        PERFORM recalculate_tag_counts(OLD.tags);
    END IF;

    -- Handle UPDATE
    IF TG_OP = 'UPDATE' THEN
        PERFORM recalculate_tag_counts(ARRAY(SELECT DISTINCT UNNEST(NEW.tags || OLD.tags)));
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_topics_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Article"
FOR EACH ROW
EXECUTE FUNCTION update_topics_on_articles_change();