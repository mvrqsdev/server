/*
  Warnings:

  - Changed the type of `strategy` on the `Authentication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "strategy",
ADD COLUMN     "strategy" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AuthenticationStrategy";
