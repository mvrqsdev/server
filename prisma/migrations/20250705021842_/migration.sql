/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `connections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "connections_name_key" ON "connections"("name");
