const fs = require("fs");

// Replace these variables with your CSV file path and table name
const csvFilePath = "data.csv";
const tableName = "PitchbookLeadershipMapping";

// Read the CSV file
fs.readFile(csvFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error(`Error reading CSV file: ${err}`);
    return;
  }

  // Split the CSV data into an array of rows
  const rows = data.split("\n");

  // Initialize an array to store the insert queries
  const insertQueries = [];

  // Get the column names from the first row
  const columns = rows[0].split(",");

  // Start from the second row (index 1) to skip column names
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(",");

    // Create the insert query
    const insertQuery = `INSERT INTO "${tableName}" (${columns.join(
      ", "
    )}) VALUES (${values
      .map((value) => `${value}`)
      .join(", ")});`;

    insertQueries.push(insertQuery);
  }

  // Save the insert queries to a SQL file
  const sqlFilePath = "insert_queries.sql";
  fs.writeFile(
    sqlFilePath,
    insertQueries.join("\n"),
    (err) => {
      if (err) {
        console.error(`Error writing SQL file: ${err}`);
      } else {
        console.log(
          `Insert queries have been saved to ${sqlFilePath}`
        );
      }
    }
  );
});
