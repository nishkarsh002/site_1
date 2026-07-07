import { useEffect } from "react";

/**
 * Adds IntersectionObserver to every element with class "reveal",
 * "reveal-left", or "reveal-right". Once visible, adds class "visible".
 */
export default function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
