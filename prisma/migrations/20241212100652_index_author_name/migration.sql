ALTER TABLE "User" ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', name)
) STORED;

CREATE INDEX user_name_search_idx ON "User" USING gin (search_vector);