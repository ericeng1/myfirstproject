const supabaseUrl = "https://onlshmndstcyqdxpimtv.supabase.co";
const supabaseKey = "sb_publishable_sKM_Z6dU7P9_033hGlDWpA_wRve0zt4";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// ✅ Test connection
async function testConnection() {
  console.log("Testing Supabase connection...");

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Connection FAILED:", error);
  } else {
    console.log("Connection SUCCESS:", data);
  }
}

// Run test when page loads
testConnection();
