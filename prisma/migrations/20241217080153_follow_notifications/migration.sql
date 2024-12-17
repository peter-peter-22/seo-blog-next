CREATE OR REPLACE FUNCTION recalculate_follow_notification(user_id TEXT,new_count INT, start_count INT)
RETURNS VOID AS $$
BEGIN
    -- update or create notification
    INSERT INTO "Notification" ("userId",type,"startCount",count)
        VALUES(
            user_id,
            'follow',
            start_count,
			new_count
        )
    ON CONFLICT ("userId") WHERE type='follow' AND unread=TRUE DO UPDATE SET
        "count" = new_count - "Notification"."startCount";
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_follow_notifications()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_follow_notification(NEW.id,NEW."followerCount",OLD."followerCount");
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follow_notification_trigger
AFTER UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_follow_notifications();

-- this index decides when the follow notifications stack
CREATE UNIQUE INDEX unique_follow_notification ON "Notification" ("userId") 
WHERE type='follow' AND unread=TRUE;

-- recreate follow notifications
CREATE OR REPLACE PROCEDURE restart_like_notifications() AS $$
DECLARE
    row_record RECORD;
BEGIN
    DELETE FROM "Notification" WHERE type='follow';
    FOR row_record IN
        SELECT id,"followerCount" FROM "User"
    LOOP
        PERFORM recalculate_follow_notification(row_record.id,row_record."followerCount",0);
    END LOOP;
END;
$$ LANGUAGE plpgsql;