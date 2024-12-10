CREATE OR REPLACE FUNCTION recalculate_follower_count(followed TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE "User" 
    SET 
        "followerCount" = (SELECT COUNT(*) FROM "Follows" WHERE "followedId" = followed)
    WHERE
        id=followed;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_follower_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_follower_count(COALESCE(NEW."followedId",OLD."followedId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follower_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Follows"
FOR EACH ROW
EXECUTE FUNCTION update_follower_count();