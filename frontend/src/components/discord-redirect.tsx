/** =============================================
 *  This file is marked for deletion
 *  =============================================
 */

import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

import { DISCORD_ACCESS_TOKEN } from "@/lib/token";

function RedirectDiscordAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");
    if (accessToken) {
      localStorage.setItem(DISCORD_ACCESS_TOKEN, accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/auth/user/")
        .then((res) => {
          console.log("User data: ", res.data);
          navigate({ to: "/" });
        })
        .catch((error) => {
          console.error(
            "Error verifying token: ",
            error.response ? error.response.data : error.message
          );
          navigate({ to: "/auth" });
        });
    } else {
      console.log("No access token found");
      navigate({ to: "/auth" });
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}

export default RedirectDiscordAuth;
