CREATE OR REPLACE FUNCTION recalculate_verified_like_count(updated_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "VerifiedLike" WHERE "articleId" = updated_article_id AND "isDislike" = FALSE);

    UPDATE "Article" 
    SET 
        "verifiedLikeCount" = new_count,
        "likeCount" = "unverifiedLikeCount" + new_count
    WHERE
        id=updated_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recalculate_verified_dislike_count(updated_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "VerifiedLike" WHERE "articleId" = updated_article_id AND "isDislike" = TRUE);

    UPDATE "Article" 
    SET 
        "verifiedDislikeCount" = new_count,
        "dislikeCount" = "unverifiedDislikeCount" + new_count
    WHERE
        id=updated_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recalculate_unverified_like_count(updated_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "UnverifiedLike" WHERE "articleId" = updated_article_id AND "isDislike" = FALSE);

    UPDATE "Article" 
    SET 
        "unverifiedLikeCount" = new_count,
        "likeCount" = "verifiedLikeCount" + new_count
    WHERE
        id=updated_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recalculate_unverified_dislike_count(updated_article_id TEXT)
RETURNS VOID AS $$
DECLARE
    new_count INT;
BEGIN
    new_count:=(SELECT COUNT(*) FROM "UnverifiedLike" WHERE "articleId" = updated_article_id AND "isDislike" = TRUE);

    UPDATE "Article" 
    SET 
        "unverifiedDislikeCount" = new_count,
        "dislikeCount" = "verifiedDislikeCount" + new_count
    WHERE
        id=updated_article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_verified_like_counts()
RETURNS TRIGGER AS $$
BEGIN

    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        IF NEW."isDislike" = TRUE THEN 
            PERFORM recalculate_verified_dislike_count(NEW."articleId");
        ELSE
            PERFORM recalculate_verified_like_count(NEW."articleId");
        END IF;
    END IF;

    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        IF OLD."isDislike" = TRUE THEN 
            PERFORM recalculate_verified_dislike_count(OLD."articleId");
        ELSE
            PERFORM recalculate_verified_like_count(OLD."articleId");
        END IF;
    END IF;

    -- Handle UPDATE
    IF TG_OP = 'UPDATE' THEN
        PERFORM recalculate_verified_dislike_count(OLD."articleId");
        PERFORM recalculate_verified_like_count(OLD."articleId");
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_unverified_like_counts()
RETURNS TRIGGER AS $$
BEGIN

    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        IF NEW."isDislike" = TRUE THEN 
            PERFORM recalculate_unverified_dislike_count(NEW."articleId");
        ELSE
            PERFORM recalculate_unverified_like_count(NEW."articleId");
        END IF;
    END IF;

    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        IF OLD."isDislike" = TRUE THEN 
            PERFORM recalculate_unverified_dislike_count(OLD."articleId");
        ELSE
            PERFORM recalculate_unverified_like_count(OLD."articleId");
        END IF;
    END IF;

    -- Handle UPDATE
    IF TG_OP = 'UPDATE' THEN
        PERFORM recalculate_unverified_dislike_count(OLD."articleId");
        PERFORM recalculate_unverified_like_count(OLD."articleId");
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verified_like_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON "VerifiedLike"
FOR EACH ROW
EXECUTE FUNCTION update_verified_like_counts();

CREATE TRIGGER unverified_like_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON "UnverifiedLike"
FOR EACH ROW
EXECUTE FUNCTION update_unverified_like_counts();