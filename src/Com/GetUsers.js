import axios from 'axios';

const fetchNamedUsersData = async () => {
    const namedRange = "Users"; // Replace with the name of your range
    const sheetId = "16nIFjxqNSmvkCPNizCMN03aIvKjR9DL58wYao8a9NL4"; // Replace with your Google Sheet ID
    const apiKey = "5333056a76368e0757d90c3714edad26829b45a1"; // Replace with your Google Sheets API key

    try {
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${namedRange}`,
            {
                params: {
                    key: apiKey,
                },
            }
        );

        if (response.data.values) {
            // Data is available in response.data.values
            return response.data.values;
        } else {
            console.error("No data found in the named range.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const fetchData = async () => {
    const namedUsersData = await fetchNamedUsersData();

    if (namedUsersData) {
        // Process or display the data
        console.log(namedUsersData);
    } else {
        // Handle the case where no data is found
        console.error("No data found in the named range.");
    }
};

// Call the fetchData function to fetch and handle the data
fetchData();

export const namedUsersData = fetchData;