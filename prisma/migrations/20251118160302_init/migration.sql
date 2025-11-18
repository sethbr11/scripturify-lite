-- CreateTable
CREATE TABLE "Scripture" (
    "id" SERIAL NOT NULL,
    "ref" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,

    CONSTRAINT "Scripture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userText" TEXT NOT NULL,
    "footnotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
