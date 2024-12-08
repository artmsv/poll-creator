import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RedirectTo({to}: { to: `/${string}` }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  });

  return null;
}
