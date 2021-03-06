# Migration `20210316031545-migration`

This migration has been generated by patrick at 3/15/2021, 11:15:45 PM.
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

    FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE,
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
migration 20210315053853-migration..20210316031545-migration
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
@@ -16,10 +16,10 @@
 model User {
   id         String     @id @default(uuid())
   address    String?     @unique
-  platformId String @unique
-  platform String
+  platformId String? @unique
+  platform String?
   authDetail AuthDetail?
   guilds Guild[] @relation(name: "userGuilds")
   roles Role[] @relation(name: "userRoles")
 }
```


