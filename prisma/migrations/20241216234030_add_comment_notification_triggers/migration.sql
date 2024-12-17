CREATE OR REPLACE FUNCTION recalculate_comment_notification(article_id TEXT,user_id TEXT,new_count INT, start_count INT)
RETURNS VOID AS $$
BEGIN
    -- update or create notification
    INSERT INTO "Notification" ("articleId","userId",type,"startCount",count)
        VALUES(
            article_id,
            user_id,
            'comment',
            start_count,
			new_count
        )
    ON CONFLICT ("userId","articleId") WHERE type='comment' AND unread=TRUE DO UPDATE SET
        "count" = new_count - "Notification"."startCount";
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_notifications()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and DELETE
    PERFORM recalculate_comment_notification(NEW.id,NEW."userId",NEW."commentCount",OLD."commentCount");
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comment_notification_trigger
AFTER UPDATE ON "Article"
FOR EACH ROW
EXECUTE FUNCTION update_comment_notifications();

-- this index decides when the comment notifications stack
CREATE UNIQUE INDEX unique_comment_notification ON "Notification" ("articleId","userId") 
WHERE type='comment' AND unread=TRUE;

-- recreate comment notifications
CREATE OR REPLACE PROCEDURE restart_comment_notifications() AS $$
DECLARE
    row_record RECORD;
BEGIN
    DELETE FROM "Notification" WHERE type='like';
    FOR row_record IN
        SELECT id,"userId","commentCount" FROM "Article"
    LOOP
        PERFORM recalculate_comment_notification(row_record.id,row_record."userId",row_record."commentCount",0);
    END LOOP;
END;
$$ LANGUAGE plpgsql;