import { createSlice } from "@reduxjs/toolkit";
const initialTheme = localStorage.getItem("darkMode") === "true"; // If condition was met then it's true

const themeSlice = createSlice({
    name: "theme",
    initialState: { darkMode: initialTheme },
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode);
        },
    },
});

const updateRootColors = (darkMode) => {
    // Update CSS variables directly in :root
    const root = document.documentElement;

    const darkModeColors = {
        "--background-color": "#702963",
        "--text-color": "#faf9f6",
        "--form-links-color": "#faf9f6",
        "--error-message": "#c77d7d",
    };

    const lightModeColors = {
        "--background-color": "#faf9f6",
        "--text-color": "#702963",
        "--form-links-color": "#702963",
        "--error-message": "#e33c3c",
    };

    const colors = darkMode ? darkModeColors : lightModeColors;

    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
};

// Call this function when the page loads to apply the saved theme
updateRootColors(initialTheme);

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
