/*
  Warnings:

  - Added the required column `principal` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connections" ADD COLUMN     "principal" BOOLEAN NOT NULL;
