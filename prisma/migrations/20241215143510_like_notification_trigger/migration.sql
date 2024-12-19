CREATE OR REPLACE FUNCTION recalculate_like_notification(article_id TEXT,user_id TEXT,new_count INT, start_count INT)
RETURNS VOID AS $$
BEGIN
    -- do nothing if no change
    IF new_count=start_count THEN
        RETURN;
    END IF;

    -- update or create notification
    INSERT INTO "Notification" ("articleId","userId",type,"startCount",count)
        VALUES(
            article_id,
            user_id,
            'like',
            start_count,
			new_count
        )
    ON CONFLICT ("userId","articleId") WHERE type='like' AND unread=TRUE DO UPDATE SET
        "count" = new_count - "Notification"."startCount";
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_like_notifications()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_like_notification(NEW.id,NEW."userId",NEW."likeCount",OLD."likeCount");
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER like_notification_trigger
AFTER UPDATE ON "Article"
FOR EACH ROW
EXECUTE FUNCTION update_like_notifications();

-- this index decides when the like notifications stack
CREATE UNIQUE INDEX unique_like_notification ON "Notification" ("articleId","userId") 
WHERE type='like' AND unread=TRUE;

-- recreate like notifications
CREATE OR REPLACE PROCEDURE restart_like_notifications() AS $$
DECLARE
    row_record RECORD;
BEGIN
    DELETE FROM "Notification" WHERE type='like';
    FOR row_record IN
        SELECT id,"userId","likeCount" FROM "Article"
    LOOP
        PERFORM recalculate_like_notification(row_record.id,row_record."userId",row_record."likeCount",0);
    END LOOP;
END;
$$ LANGUAGE plpgsql;