ALTER TABLE "User" ADD search tsvector GENERATED ALWAYS AS
(
    setweight(to_tsvector('english', name), 'A') || 
    setweight(to_tsvector('english', COALESCE(description,'')), 'B')
) STORED;

CREATE INDEX idx_search ON "User" USING GIN(search);