/*
  Warnings:

  - Added the required column `address` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "address" TEXT NOT NULL;
