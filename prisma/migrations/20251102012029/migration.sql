-- CreateTable
CREATE TABLE "investment_goals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "months" TEXT[],
    "total_value" DECIMAL(14,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investment_goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_investment_goals_name" ON "investment_goals"("name");

-- CreateIndex
CREATE INDEX "idx_investment_goals_months_gin" ON "investment_goals" USING GIN ("months");
