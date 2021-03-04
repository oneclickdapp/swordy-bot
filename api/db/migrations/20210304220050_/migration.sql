-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "authDetailId" TEXT,
    FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nonce" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Nft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "website" TEXT,
    "contractAddress" TEXT,
    "tokenId" TEXT NOT NULL,
    "uri" TEXT NOT NULL DEFAULT '',
    "iconUrl" TEXT,
    "ownerAddress" TEXT NOT NULL,
    FOREIGN KEY ("ownerAddress") REFERENCES "User" ("address") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.address_unique" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User.discordId_unique" ON "User"("discordId");
