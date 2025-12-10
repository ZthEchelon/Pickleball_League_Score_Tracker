// The name of the CSV file created from your Excel file
const DATA_FILE = "simplified_data.csv";
const TABLE_CONTAINER_ID = "table-container";

Papa.parse(DATA_FILE, {
    download: true, // Tell Papa Parse to fetch the file from the server
    header: true,   // Use the first row as column headers (even the ugly ones)
    complete: function(results) {
        // results.data contains the data as an array of objects
        const data = results.data;
        const container = document.getElementById(TABLE_CONTAINER_ID);

        // Basic check for empty or errored data
        if (!data || data.length === 0 || results.errors.length > 0) {
            container.innerHTML = "<p>Error loading or parsing data.</p>";
            console.error("Papa Parse Errors:", results.errors);
            return;
        }

        // 1. Get the column headers (the actual column names from the CSV)
        const fields = results.meta.fields;
        let html = '<table><thead><tr>';

        // 2. Build the table headers
        fields.forEach(field => {
            // Trim and clean up the column name for display
            const cleanField = field ? field.trim().replace(/"/g, '') : '';
            // **ACTION REQUIRED: You should replace 'cleanField' with a meaningful name 
            // after checking your CSV (e.g., 'Rank', 'Player Name', 'Week 1 Score').**
            html += `<th>${cleanField}</th>`;
        });
        html += '</tr></thead><tbody>';

        // 3. Build the table rows with the data
        data.forEach(row => {
            // Skip rows that are completely empty (often found in template exports)
            if (Object.values(row).some(value => value !== "" && value !== "nan")) {
                html += '<tr>';
                fields.forEach(field => {
                    const cellValue = row[field] !== undefined ? row[field] : '';
                    html += `<td>${cellValue}</td>`;
                });
                html += '</tr>';
            }
        });

        html += '</tbody></table>';
        
        // Insert the complete table HTML into the container
        container.innerHTML = html;
    }
});
