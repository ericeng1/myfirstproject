console.log("script.js loaded");

const supabaseUrl = "https://onlshmndstcyqdxpimtv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubHNobW5kc3RjeXFkeHBpbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MjQxNzAsImV4cCI6MjA4NDAwMDE3MH0.IV9gNNZnEwBepC2G1aDai-Kbu2zSLz06UkMyoSfJR0w";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// Test connection
async function testConnection() {

  console.log("Testing Supabase connection...");

  const { data, error } = await supabaseClient
    .from("submissions")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Connection FAILED:", error);
  } else {
    console.log("Connection SUCCESS:", data);
  }
}

testConnection();
