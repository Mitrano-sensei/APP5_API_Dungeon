-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dungeon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dungeonId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "Score_dungeonId_fkey" FOREIGN KEY ("dungeonId") REFERENCES "Dungeon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PlayerToScore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PlayerToScore_A_fkey" FOREIGN KEY ("A") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlayerToScore_B_fkey" FOREIGN KEY ("B") REFERENCES "Score" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dungeon_name_key" ON "Dungeon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToScore_AB_unique" ON "_PlayerToScore"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToScore_B_index" ON "_PlayerToScore"("B");
