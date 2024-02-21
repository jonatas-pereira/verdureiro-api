/*
  Warnings:

  - Added the required column `address` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "address" TEXT NOT NULL;
