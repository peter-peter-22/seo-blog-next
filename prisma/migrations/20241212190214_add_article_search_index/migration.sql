ALTER TABLE "Article" ADD search tsvector GENERATED ALWAYS AS
(
    setweight(to_tsvector('english', title), 'A') || 
    setweight(to_tsvector('english', description), 'B')
) STORED;

CREATE INDEX idx_search_articles ON "Article" USING GIN(search);