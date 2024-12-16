-- reset like counts
CREATE OR REPLACE PROCEDURE restart_like_counts() AS $$
DECLARE
    row_record RECORD;
BEGIN
    FOR row_record IN
        SELECT id FROM "Article"
    LOOP
        PERFORM recalculate_verified_like_count(row_record.id);
        PERFORM recalculate_verified_dislike_count(row_record.id);
        PERFORM recalculate_unverified_like_count(row_record.id);
        PERFORM recalculate_unverified_dislike_count(row_record.id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- reset view counts
CREATE OR REPLACE PROCEDURE restart_view_counts() AS $$
DECLARE
    row_record RECORD;
BEGIN
    FOR row_record IN
        SELECT id FROM "Article"
    LOOP
        PERFORM recalculate_verified_view_count(row_record.id);
        PERFORM recalculate_unverified_view_count(row_record.id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;