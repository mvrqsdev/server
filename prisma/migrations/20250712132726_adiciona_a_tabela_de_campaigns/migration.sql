/*
  Warnings:

  - Changed the type of `strategy` on the `Authentication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "strategy",
ADD COLUMN     "strategy" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AuthenticationStrategy";

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadCampaigns" (
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadCampaigns_pkey" PRIMARY KEY ("leadId","campaignId")
);

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_externalId_key" ON "campaigns"("externalId");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCampaigns" ADD CONSTRAINT "LeadCampaigns_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCampaigns" ADD CONSTRAINT "LeadCampaigns_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
