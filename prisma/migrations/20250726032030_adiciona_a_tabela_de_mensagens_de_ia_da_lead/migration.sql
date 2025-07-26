-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "agentId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ia_messages" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "content" TEXT,
    "mediaUrl" TEXT,
    "mediaKey" TEXT,
    "messageType" TEXT NOT NULL,
    "fromBot" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ia_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ia_messages" ADD CONSTRAINT "ia_messages_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ia_messages" ADD CONSTRAINT "ia_messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
