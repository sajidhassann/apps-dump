-- CreateTable
CREATE TABLE "ferozi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pass_percentage" INTEGER NOT NULL,
    "sql_query" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ferozi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_ferozi" (
    "ferozi_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_ferozi_pkey" PRIMARY KEY ("ferozi_id","user_id")
);

-- AddForeignKey
ALTER TABLE "user_ferozi" ADD CONSTRAINT "user_ferozi_ferozi_id_fkey" FOREIGN KEY ("ferozi_id") REFERENCES "ferozi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
