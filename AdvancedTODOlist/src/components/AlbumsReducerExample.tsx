import { useReducer } from "react";
import { useEffect } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

function albumReducer (state: {albums:any[],isLoading:boolean,error:string | null}, action: { type: string,payload?: any }) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, albums: action.payload || [] };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload || null };
    default:
      return state;
  }
}

// Fetch and display albums on the screen
// Handle loading and error states accordingly

function AlbumsReducerExample() {
  const [{ albums, isLoading, error }, dispatch] = useReducer(albumReducer, {albums: [], isLoading: false, error: null});

  const fetchAlbums = async (): Promise<void> => {
  try {
    dispatch({ type: 'FETCH_START' });
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    // Check if server returned ok response
    if (!response.ok) {
      throw new Error("Failed to load albums from the server");
    }
    const data: any[] = await response.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (err: any) {
    // Catch errors and update state
    dispatch({ type: 'FETCH_ERROR', payload: err.message || "An unexpected error occurred" });
  } 
};
useEffect(() => {
  fetchAlbums();
}, []);

// Conditional rendering based on state
if (isLoading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  );
}
if (error) {
  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
}
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Album List
      </Typography>
      {/* Render list using map with unique key */}
      <Box component="ul" sx={{ pl: 2 }}>
        {albums.map((album:any) => (
          <Box component="li" key={album.id} sx={{ mb: 1 }}>
            <Typography variant="body1">{album.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

}

export default AlbumsReducerExample;
