# Migration `20210325043905-migration`

This migration has been generated by patrick at 3/25/2021, 12:39:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "platformId" TEXT,
    "platform" TEXT,
    "authDetailId" TEXT,
    "guildPlatformId" TEXT,

    FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("guildPlatformId") REFERENCES "Guild"("platformId") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_User" ("id", "address", "platformId", "platform", "authDetailId") SELECT "id", "address", "platformId", "platform", "authDetailId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.address_unique" ON "User"("address");
CREATE UNIQUE INDEX "User.platformId_unique" ON "User"("platformId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210316031545-migration..20210325043905-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource DS {
   provider =  ["postgresql","sqlite"]
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -21,8 +21,9 @@
   platform String?
   authDetail AuthDetail?
   guilds Guild[] @relation(name: "userGuilds")
   roles Role[] @relation(name: "userRoles")
+  currentSessionGuild Guild?
 }
 model Guild {
   platformId String @id
```

