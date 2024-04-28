using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoinTracker.Infrastructure.Migrations;

  /// <inheritdoc />
  public partial class InitialPostgres : Migration
  {
      /// <inheritdoc />
      protected override void Up(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.CreateTable(
              name: "Users",
              columns: table => new
              {
                  Id = table.Column<Guid>(type: "uuid", nullable: false),
                  FirebaseId = table.Column<string>(type: "text", nullable: false),
                  Name = table.Column<string>(type: "text", nullable: false),
                  LastName = table.Column<string>(type: "text", nullable: true),
                  TotalSpentMonth = table.Column<decimal>(type: "numeric", nullable: false),
                  TotalSpentYear = table.Column<decimal>(type: "numeric", nullable: false),
                  TotalSpentEver = table.Column<decimal>(type: "numeric", nullable: false),
                  Deleted = table.Column<bool>(type: "boolean", nullable: false),
                  DeletedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                  UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedBy = table.Column<string>(type: "text", nullable: true),
                  DeletedBy = table.Column<string>(type: "text", nullable: true),
                  UpdatedBy = table.Column<string>(type: "text", nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Users", x => x.Id);
              });

          migrationBuilder.CreateTable(
              name: "Budgets",
              columns: table => new
              {
                  Id = table.Column<Guid>(type: "uuid", nullable: false),
                  UserId = table.Column<Guid>(type: "uuid", nullable: false),
                  FullAmount = table.Column<decimal>(type: "numeric", nullable: false),
                  Currency = table.Column<int>(type: "integer", nullable: false),
                  Name = table.Column<string>(type: "text", nullable: false),
                  Limit = table.Column<decimal>(type: "numeric", nullable: false),
                  LimitPeriod = table.Column<int>(type: "integer", nullable: false),
                  Deleted = table.Column<bool>(type: "boolean", nullable: false),
                  DeletedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                  UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedBy = table.Column<string>(type: "text", nullable: true),
                  DeletedBy = table.Column<string>(type: "text", nullable: true),
                  UpdatedBy = table.Column<string>(type: "text", nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Budgets", x => x.Id);
                  table.ForeignKey(
                      name: "FK_Budgets_Users_UserId",
                      column: x => x.UserId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
              });

          migrationBuilder.CreateTable(
              name: "Transactions",
              columns: table => new
              {
                  Id = table.Column<Guid>(type: "uuid", nullable: false),
                  BudgetId = table.Column<Guid>(type: "uuid", nullable: false),
                  Amount = table.Column<decimal>(type: "numeric", nullable: false),
                  Currency = table.Column<int>(type: "integer", nullable: false),
                  Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                  Description = table.Column<string>(type: "text", nullable: false),
                  Category = table.Column<int>(type: "integer", nullable: false),
                  Deleted = table.Column<bool>(type: "boolean", nullable: false),
                  DeletedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                  UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedBy = table.Column<string>(type: "text", nullable: true),
                  DeletedBy = table.Column<string>(type: "text", nullable: true),
                  UpdatedBy = table.Column<string>(type: "text", nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Transactions", x => x.Id);
                  table.ForeignKey(
                      name: "FK_Transactions_Budgets_BudgetId",
                      column: x => x.BudgetId,
                      principalTable: "Budgets",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
              });

          migrationBuilder.CreateTable(
              name: "RecurrentTransactions",
              columns: table => new
              {
                  Id = table.Column<Guid>(type: "uuid", nullable: false),
                  BudgetTransactionId = table.Column<Guid>(type: "uuid", nullable: false),
                  Frequency = table.Column<int>(type: "integer", nullable: false),
                  Interval = table.Column<int>(type: "integer", nullable: false),
                  NextOccurrence = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                  IsActive = table.Column<bool>(type: "boolean", nullable: false),
                  Deleted = table.Column<bool>(type: "boolean", nullable: false),
                  DeletedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                  UpdatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                  CreatedBy = table.Column<string>(type: "text", nullable: true),
                  DeletedBy = table.Column<string>(type: "text", nullable: true),
                  UpdatedBy = table.Column<string>(type: "text", nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_RecurrentTransactions", x => x.Id);
                  table.ForeignKey(
                      name: "FK_RecurrentTransactions_Transactions_BudgetTransactionId",
                      column: x => x.BudgetTransactionId,
                      principalTable: "Transactions",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
              });

          migrationBuilder.CreateIndex(
              name: "IX_Budgets_UserId",
              table: "Budgets",
              column: "UserId");

          migrationBuilder.CreateIndex(
              name: "IX_RecurrentTransactions_BudgetTransactionId",
              table: "RecurrentTransactions",
              column: "BudgetTransactionId",
              unique: true);

          migrationBuilder.CreateIndex(
              name: "IX_Transactions_BudgetId",
              table: "Transactions",
              column: "BudgetId");
      }

      /// <inheritdoc />
      protected override void Down(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.DropTable(
              name: "RecurrentTransactions");

          migrationBuilder.DropTable(
              name: "Transactions");

          migrationBuilder.DropTable(
              name: "Budgets");

          migrationBuilder.DropTable(
              name: "Users");
      }
  }
