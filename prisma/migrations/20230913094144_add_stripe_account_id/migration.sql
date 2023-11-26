DO $$
BEGIN
IF NOT EXISTS (
SELECT FROM pg_catalog.pg_attribute
WHERE attrelid = '"Character"'::regclass
AND attname = 'stripeAccountId'
AND attnum > 0
) THEN
ALTER TABLE "Character" ADD COLUMN "stripeAccountId" TEXT DEFAULT '';
END IF;
END $$;