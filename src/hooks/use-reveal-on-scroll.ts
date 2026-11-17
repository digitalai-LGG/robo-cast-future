import { useEffect } from "react";

const SAFETY_REVEAL_MS = 1_500;

/**
 * Applies the shared reveal timing and observes scroll-reveal elements.
 * Once a scroll-reveal element is visible, the class stays.
 *
 * Elements that appear after this effect ran — a client-side navigation to
 * another machine, a keyed component remounting, a list that finished loading —
 * are picked up by a MutationObserver. Without it they would keep the
 * `.reveal-ready` opacity of 0 and never become visible.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const applyDelay = (el: HTMLElement) => {
      const rawDelay = el.dataset.revealDelay;
      if (!rawDelay) return;

      const delay = Number(rawDelay);
      if (!Number.isFinite(delay) || delay < 0) return;

      if (el.classList.contains("reveal")) el.style.animationDelay = `${delay}ms`;
      if (el.classList.contains("reveal-on-scroll")) el.style.transitionDelay = `${delay}ms`;
    };

    const supportsObserver = typeof IntersectionObserver !== "undefined";
    const tracked = new WeakSet<HTMLElement>();
    const timers = new Set<number>();

    const observer = supportsObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target as HTMLElement);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        )
      : null;

    function reveal(el: HTMLElement) {
      el.classList.add("is-visible");
      observer?.unobserve(el);
    }

    const isInViewport = (el: HTMLElement) => {
      const bounds = el.getBoundingClientRect();
      return bounds.bottom >= 0 && bounds.top <= window.innerHeight * 1.08;
    };

    const register = (el: HTMLElement) => {
      if (tracked.has(el)) return;
      tracked.add(el);
      applyDelay(el);

      if (!observer) {
        el.classList.add("is-visible");
        return;
      }

      observer.observe(el);

      // Anything already on screen (hydration, or the section a navigation
      // landed on) reveals straight away rather than waiting for a scroll.
      if (isInViewport(el)) {
        reveal(el);
        return;
      }

      // Content must never be left transparent, whatever the observer does.
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        reveal(el);
      }, SAFETY_REVEAL_MS);
      timers.add(timer);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal[data-reveal-delay]").forEach(applyDelay);
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll").forEach(register);
    };

    scan();
    let frame = window.requestAnimationFrame(scan);

    const mutationObserver = new MutationObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(scan);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);
}
