// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
export default function Page() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        // Original JS Logic Start

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        gsap.registerPlugin(ScrollTrigger);

        /* ---------- Preloader ---------- */
        const pre = document.getElementById("preloader");
        const preBar = document.getElementById("preBar");
        const preCount = document.getElementById("preCount");
        const pObj = { n: 0 };

        // Guard: if preloader was already removed (React StrictMode double-invoke), just boot the site
        if (!pre) { bootSite(); return; }

        const bootAfter = () => {
            if (!pre || !pre.parentNode) { bootSite(); return; }
            gsap.timeline({ onComplete() { if (pre.parentNode) pre.remove(); } })
                .to(pre.querySelectorAll(".pre-lines"), { yPercent: -110, opacity: 0, duration: .6, stagger: .08, ease: "power3.in" })
                .to(pre, { opacity: 0, duration: .5 }, "-=.1");
            bootSite();
        };
        if (reduce) { if (pre.parentNode) pre.remove(); bootSite(); return; }
        gsap.to(pObj, {
            n: 100, duration: 1.5, ease: "power2.inOut",
            onUpdate() { const v = Math.round(pObj.n); if (preCount) preCount.textContent = String(v).padStart(2, "0"); if (preBar) preBar.style.transform = "scaleX(" + v / 100 + ")"; },
            onComplete: bootAfter,
        });

        /* ---------- word split ---------- */
        function splitTitle(el) {
            const inner = el.innerHTML;
            el.innerHTML = "";
            el.querySelectorAll("br").forEach(b => b.remove());
            const words = inner.split(" ");
            words.forEach((w, i) => {
                const mask = document.createElement("span");
                mask.className = "line-mask"; mask.style.display = "inline-block";
                mask.style.verticalAlign = "top";
                const word = document.createElement("span");
                word.className = "word";
                const isLast = w.endsWith(".");
                const clean = isLast ? w.slice(0, -1) : w;
                word.innerHTML = clean + (w.includes(".<br/>") ? "" : "");
                const punct = document.createElement("span"); punct.className = "word"; punct.textContent = isLast ? "." : "";
                if (isLast) { punct.style.color = "var(--ember)"; }
                mask.appendChild(word);
                if (punct.textContent) mask.appendChild(punct);
                el.appendChild(mask);
                if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
            });
            return el.querySelectorAll(".word");
        }

        function bootSite() {
            initUI();
            initCursor();
            initMagnetic();
            if (reduce || isTouch) { initShow(); initTSlider(); initBlog(); return; }

            /* Lenis */
            if (typeof Lenis !== "undefined") {
                const lenis = new Lenis({ lerp: .09 });
                lenis.on("scroll", ScrollTrigger.update);
                gsap.ticker.add((t) => lenis.raf(t * 1000));
                gsap.ticker.lagSmoothing(0);
                window.__lenis = lenis;
                document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", (e) => {
                    const id = a.getAttribute("href"); if (id.length < 2) return;
                    const el = document.querySelector(id); if (!el) return;
                    e.preventDefault(); lenis.scrollTo(el, { offset: 0, duration: 1.4 });
                }));
            }

            // /* hero entrance */
            // const words = splitTitle(document.getElementById("heroTitle"));
            // gsap.set(words, { yPercent: 120, rotate: 4 });
            // gsap.set("#hKicker,#hSub,#hCta,#hMeta,#showWrap", { opacity: 0, y: 26 });
            // gsap.timeline({ delay: .2, defaults: { ease: "power4.out" } })
            //   .to(words, { yPercent: 0, rotate: 0, duration: .9, stagger: .045 })
            //   .to("#hKicker", { opacity: 1, y: 0, duration: .6 }, .1)
            //   .to("#hSub,#hCta,#hMeta", { opacity: 1, y: 0, duration: .7, stagger: .08 }, .25)
            //   .to("#showWrap", { opacity: 1, y: 0, duration: .9 }, .3);

            // /* reveal up */
            // gsap.utils.toArray(".reveal-up").forEach(el => {
            //   gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
            // });
            // gsap.utils.toArray(".reveal-card").forEach((el, i) => {
            //   gsap.from(el, { y: 60, opacity: 0, duration: .9, ease: "power3.out", delay: (i % 3) * .07, scrollTrigger: { trigger: el, start: "top 90%" } });
            // });

            /* counters */
            document.querySelectorAll(".count").forEach(el => {
                const end = parseFloat(el.dataset.count);
                const suffix = el.dataset.suffix || "";
                const dec = String(el.dataset.count).includes(".") ? String(el.dataset.count).split(".")[1].length : 0;
                const o = { n: 0 };
                ScrollTrigger.create({
                    trigger: el, start: "top 92%", once: true, onEnter() {
                        gsap.to(o, { n: end, duration: 1.6, ease: "power2.out", onUpdate() { el.textContent = o.n.toFixed(dec) + suffix; } });
                    }
                });
            });

            initShow();
            initTSlider();
            initBlog();

        }

        /* ---------- Hero showcase slider ---------- */
        function initShow() {
            const slides = gsap.utils.toArray("#showSlider .show-slide");
            const dots = gsap.utils.toArray("#showDots .show-dot");
            const cur = document.getElementById("showCur");
            let i = 0, timer = null;
            const LEN = slides.length;

            function setProg(el) { el.querySelector("img").style.animation = "none"; }
            function go(next, auto) {
                if (next === i && auto) return;
                slides[i].classList.remove("active");
                slides[next].classList.add("active");
                i = next;
                cur.textContent = String(i + 1).padStart(2, "0");
                dots.forEach((d, di) => {
                    d.classList.toggle("bg-forest", di === i);
                    d.classList.toggle("bg-n2", di !== i);
                });
                // restart ken-burns on the newly active image
                const img = slides[i].querySelector(".show-img");
                img.style.transition = "none"; img.style.transform = "scale(1.16)";
                requestAnimationFrame(() => { requestAnimationFrame(() => { img.style.transition = "transform 7s cubic-bezier(.16,.84,.44,1), filter 1.2s"; img.style.transform = "scale(1)"; }); });
                resetTimer();
            }
            function resetTimer() {
                if (timer) clearInterval(timer);
                if (!reduce) timer = setInterval(() => go((i + 1) % LEN, true), 6000);
            }
            dots.forEach(d => d.addEventListener("click", () => go(parseInt(d.dataset.i))));
            document.getElementById("showNext").addEventListener("click", () => go((i + 1) % LEN));
            document.getElementById("showPrev").addEventListener("click", () => go((i - 1 + LEN) % LEN));
            // first active image starts ken burns
            const firstImg = slides[0].querySelector(".show-img");
            firstImg.style.transform = "scale(1.16)";
            requestAnimationFrame(() => requestAnimationFrame(() => {
                firstImg.style.transition = "transform 7s cubic-bezier(.16,.84,.44,1), filter 1.2s";
                firstImg.style.transform = "scale(1)";
            }));
            resetTimer();
        }



        /* ---------- Testimonial slider ---------- */
        function initTSlider() {
            const slides = gsap.utils.toArray(".tsl");
            const dots = gsap.utils.toArray("#tsDots .tsl-dot");
            let i = 0, timer;
            const LEN = slides.length;
            function go(next) {
                slides[i].classList.remove("active");
                i = (next + LEN) % LEN;
                slides[i].classList.add("active");
                dots.forEach((d, di) => { d.classList.toggle("bg-forest", di === i); d.classList.toggle("bg-n2", di !== i); });
                restart();
            }
            function restart() { if (timer) clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 6500); }
            dots.forEach(d => d.addEventListener("click", () => go(parseInt(d.dataset.ti))));
            document.getElementById("tsNext").addEventListener("click", () => go(i + 1));
            document.getElementById("tsPrev").addEventListener("click", () => go(i - 1));
            const zone = document.querySelector("#tsDots").parentElement;
            zone.addEventListener("mouseenter", () => { if (timer) clearInterval(timer); });
            zone.addEventListener("mouseleave", restart);
            restart();
        }

        /* ---------- Blog slider ---------- */
        function initBlog() {
            const scroller = document.getElementById("blogScroller");
            let isDown = false, startX, startScroll, moved = false;
            scroller.addEventListener("pointerdown", e => { isDown = true; moved = false; startX = e.pageX; startScroll = scroller.scrollLeft; });
            window.addEventListener("pointermove", e => { if (!isDown) return; const dx = e.pageX - startX; if (Math.abs(dx) > 6) moved = true; scroller.scrollLeft = startScroll - dx; });
            window.addEventListener("pointerup", () => isDown = false);
            const step = () => scroller.querySelector("article").offsetWidth + 24;
            document.getElementById("blogNext").addEventListener("click", () => scroller.scrollBy({ left: step(), behavior: "smooth" }));
            document.getElementById("blogPrev").addEventListener("click", () => scroller.scrollBy({ left: -step(), behavior: "smooth" }));
        }

        /* ---------- UI ---------- */
        function initUI() {

            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".filter-btn").forEach(b => {
                        b.classList.add("bg-transparent", "text-ink"); b.classList.remove("bg-ink", "text-white");
                    });
                    btn.classList.add("bg-ink", "text-white"); btn.classList.remove("bg-transparent", "text-ink");
                    const f = btn.dataset.filter;
                    document.querySelectorAll("#workGrid article").forEach(card => {
                        const show = f === "all" || card.dataset.cat === f;
                        gsap.to(card, { opacity: show ? 1 : 0, scale: show ? 1 : .95, duration: .4, ease: "power3.out", onStart() { if (show) card.style.display = ""; }, onComplete() { if (!show) card.style.display = "none"; } });
                    });
                });
            });

            const talkForm = document.getElementById("talkForm");
            talkForm.addEventListener("submit", e => { e.preventDefault(); document.getElementById("formNote").classList.remove("hidden"); talkForm.reset(); });

            const header = document.getElementById("siteHeader");
            const bar = document.getElementById("progressBar");
            const onScroll = () => {
                const h = document.documentElement;
                bar.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100) + "%";
                header.classList.toggle("scrolled", h.scrollTop > 10);
            };
            window.addEventListener("scroll", onScroll, { passive: true });

            document.querySelectorAll("details").forEach(d => {
                const p = d.querySelector(".faq-plus");
                if (p) p.style.color = "";
            });
        }

        /* ---------- Cursor ---------- */
        function initCursor() {
            if (isTouch) return;
            const c = document.getElementById("cursor");
            const d = document.getElementById("cursorDot");
            const pos = { x: innerWidth / 2, y: innerHeight / 2 }, m = { x: pos.x, y: pos.y };
            window.addEventListener("mousemove", e => { m.x = e.clientX; m.y = e.clientY; });
            gsap.ticker.add(() => {
                pos.x += (m.x - pos.x) * .18; pos.y += (m.y - pos.y) * .18;
                c.style.transform = "translate3d(" + pos.x + "px," + pos.y + "px,0)";
                d.style.transform = "translate3d(" + m.x + "px," + m.y + "px,0)";
            });
            document.querySelectorAll("[data-cursor]").forEach(el => {
                el.addEventListener("mouseenter", () => {
                    c.classList.remove("view", "drag", "hover");
                    if (el.dataset.cursor) c.classList.add(el.dataset.cursor);
                });
                el.addEventListener("mouseleave", () => c.classList.remove("view", "drag", "hover"));
            });
        }

        /* ---------- Magnetic squares ---------- */
        function initMagnetic() {
            if (isTouch) return;
            document.querySelectorAll(".btn-square, a[data-cursor='hover']").forEach(el => {
                el.addEventListener("mousemove", e => {
                    const r = el.getBoundingClientRect();
                    const x = e.clientX - r.left - r.width / 2;
                    const y = e.clientY - r.top - r.height / 2;
                    gsap.to(el, { x: x * .18, y: y * .18, duration: .3, ease: "power3.out" });
                });
                el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)" }));
            });
        }

        /* reduced-motion sliders static */
        if (reduce) { /* handled in bootSite */ }

        // Original JS Logic End

        return () => {
            if (timer) clearInterval(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="w-full overflow-x-hidden">


            <div className="progress-bar" id="progressBar"></div>
            <div className="noise"></div>
            <div className="cursor" id="cursor"></div>
            <div className="cursor-dot" id="cursorDot"></div>

            <div id="preloader">
                <div className="w-[min(420px,86vw)] text-center relative">
                    {/* <img src="techhodu_logo.svg" alt="" className="pre-logo mx-auto absolute -right-2 -top-2 h-12 w-12 bg-white rounded-md p-1" /> */}
                    <p className="pre-lines font-mono text-[10px] tracking-huge uppercase text-leaf/70 mb-3">Tech Hodu</p>
                    <h2 className="pre-lines font-display font-bold text-3xl md:text-4xl uppercase tracking-tight" id="preTitle">
                        Elevating<br />Brands<span className="text-ember">.</span></h2>
                    <div className="mt-7 h-[3px] bg-white/10 overflow-hidden">
                        <div className="pre-bar h-full bg-leaf" id="preBar"></div>
                    </div>
                    <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-white/60">
                        <span>Loading experience</span><span className="text-leaf" id="preCount">00</span>
                    </div>
                </div>
            </div>

            <header id="siteHeader" className="sticky top-0 z-50 bg-[#f5f8f4]/80 backdrop-blur-xl border-b border-n2/70 transition-all duration-500">
                <div className="max-w-[1400px] mx-auto px-5 h-[72px] flex items-center justify-between gap-4">
                    <a href="#home" data-cursor="hover" className="flex items-center gap-3 shrink-0 group">
                        <img src="techhodu_logo.svg" alt="Tech Hodu" className="h-9 w-9 object-contain transition-transform duration-700" />
                        <span className="font-display font-bold tracking-tight text-[17px] uppercase leading-none">Tech<br />Hodu<span className="text-ember">.</span></span>
                    </a>
                    <nav className="hidden lg:flex items-center gap-9 font-mono text-[10px] uppercase tracking-[0.2em] text-deep overflow-x-auto whitespace-nowrap scroll-smooth">
                        <a href="#home" className="relative hover:text-forest transition"><span className="text-ember">01.</span>
                            Home</a>
                        <a href="#services" className="relative hover:text-forest transition"><span className="text-ember">02.</span>
                            Services</a>
                        <a href="#work" className="relative hover:text-forest transition"><span className="text-ember">03.</span>
                            Work</a>
                        <a href="#why-us" className="relative hover:text-forest transition"><span className="text-ember">04.</span> Why
                            Us</a>
                        <a href="#blogs" className="relative hover:text-forest transition"><span className="text-ember">05.</span>
                            Blogs</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <a href="#contact" data-cursor="hover" className="btn-square hidden lg:inline-flex items-center gap-2 bg-ink text-black font-bold font-mono text-[11px] uppercase tracking-[0.16em] px-5 py-3 border border-ink">
                            <span className="fill"></span><span className="relative">Let's Talk</span>
                        </a>
                        <button onClick={() => setMobileMenuOpen(o => !o)} className="lg:hidden w-10 h-10 border border-n2 grid place-items-center" aria-label="Open menu">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 8h16M4 16h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} border-t border-n2 bg-white px-5 py-5 space-y-4 font-mono text-xs uppercase tracking-widest`}>
                    <a href="#home" className="block" onClick={() => setMobileMenuOpen(false)}>01. Home</a>
                    <a href="#services" className="block" onClick={() => setMobileMenuOpen(false)}>02. Services</a>
                    <a href="#work" className="block" onClick={() => setMobileMenuOpen(false)}>03. Work</a>
                    <a href="#why-us" className="block" onClick={() => setMobileMenuOpen(false)}>04. Why Us</a>
                    <a href="#blogs" className="block" onClick={() => setMobileMenuOpen(false)}>05. Blogs</a>
                    <a href="#contact" className="inline-block mt-2 bg-ink text-white px-5 py-2.5" onClick={() => setMobileMenuOpen(false)}>Let's Talk</a>
                </div>
            </header>


            <section id="home" className="relative overflow-hidden border-b border-n2 w-full">
                <div className="max-w-[1400px] mx-auto px-5 pt-8 pb-16 lg:pt-12">
                    <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-start">
                        <div>
                            <h1 id="heroTitle" className="font-display font-extrabold uppercase tracking-[-0.02em] text-ink mt-7 leading-[0.88]" style={{ fontSize: 'clamp(28px, 7.5vw, 86px)' }}>
                                Make your <span>brand</span> impossible to ignore.
                            </h1>
                            <p id="hSub" className="mt-7 max-w-md text-[15px] leading-relaxed text-slategrn">
                                We are a full-platform creative studio. Strategy, identity, web design and performance
                                engineering — shipped by one senior team, end to end.
                            </p>
                            <div id="hCta" className="mt-9 flex flex-wrap items-center gap-4">
                                <a href="#contact" data-cursor="hover" className="btn-square inline-flex items-center gap-3 bg-forest text-black font-bold font-mono text-[11px] uppercase tracking-[0.16em] px-5 py-3 sm:px-7 sm:py-4">
                                    <span className="fill"></span>
                                    <span className="relative">Start a project</span>
                                    <svg className="relative" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </a>
                                <a href="#work" data-cursor="hover" className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                                    <span className="grid place-items-center w-10 h-10 border border-ink group-hover:bg-ink group-hover:text-leaf transition-colors">
                                        <svg className="transition-transform group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span> See the work
                                </a>
                            </div>
                            <div id="hMeta" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-n2 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                                <span>Trusted by 120+ brands</span><span className="text-ember">/</span>
                                <span>144+ sites shipped</span><span className="text-ember">/</span>
                                <span>4.9 avg rating</span>
                            </div>
                        </div>


                        <div className="relative" id="showWrap">
                            <div className="corners relative aspect-[721/627] lg:aspect-[721/627] bg-night overflow-hidden" id="showSlider">
                                <a href="https://powerfiling.com/" target='_blank'>

                                    <div className="show-slide active" data-idx="0">
                                        <img className="show-img w-full h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" alt="Nexora headquarters" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/85 via-transparent to-transparent">
                                        </div>
                                        <div className="show-cap absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                                            <p className="font-mono text-[10px] uppercase tracking-huge text-leaf">Case 01 — B2B / SaaS
                                            </p>
                                            <h3 className="font-display font-bold uppercase text-white text-2xl lg:text-3xl mt-1 leading-none"> Powerfilling</h3>
                                            <p className="text-white/70 text-sm mt-2 max-w-sm">81% top-3 keywords · 47% demo conversion
                                            </p>
                                        </div>
                                    </div>
                                </a>

                                <a href="https://granmade.in/" target="_blank">

                                    <div className="show-slide" data-idx="1">
                                        <img className="show-img w-full h-full object-cover" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80" alt="Lumen flagship retail" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/85 via-transparent to-transparent">
                                        </div>
                                        <div className="show-cap absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                                            <p className="font-mono text-[10px] uppercase tracking-huge text-leaf">Case 02 — Ecommerce
                                            </p>
                                            <h3 className="font-display font-bold uppercase text-white text-2xl lg:text-3xl mt-1 leading-none">
                                                Granmade</h3>
                                            <p className="text-white/70 text-sm mt-2 max-w-sm">55x organic traffic · 1.8x average order
                                            </p>
                                        </div>
                                    </div>
                                </a>

                                <a href="https://kimbal.io/" target="_blank">

                                    <div className="show-slide" data-idx="2">
                                        <img className="show-img w-full h-full object-cover" src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80" alt="Solvio fintech product" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/85 via-transparent to-transparent">
                                        </div>
                                        <div className="show-cap absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                                            <p className="font-mono text-[10px] uppercase tracking-huge text-leaf">Case 03 — Product</p>
                                            <h3 className="font-display font-bold uppercase text-white text-2xl lg:text-3xl mt-1 leading-none">
                                                Kimbal</h3>
                                            <p className="text-white/70 text-sm mt-2 max-w-sm">60% more leads · 53% engaged sessions</p>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://www.ebirasat.in/" target="_blank">

                                    <div className="show-slide" data-idx="3">
                                        <img className="show-img w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" alt="Kindred consulting studio" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/85 via-transparent to-transparent">
                                        </div>
                                        <div className="show-cap absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                                            <p className="font-mono text-[10px] uppercase tracking-huge text-leaf">Case 04 — B2B</p>
                                            <h3 className="font-display font-bold uppercase text-white text-2xl lg:text-3xl mt-1 leading-none">
                                                E-Birasat</h3>
                                            <p className="text-white/70 text-sm mt-2 max-w-sm">3x domain rating · 14x organic traffic
                                            </p>
                                        </div>
                                    </div>
                                </a>


                                <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-huge text-white">
                                    Showreel</div>

                                <div className="absolute top-4 right-4 z-10 font-mono text-white flex items-center gap-1 text-sm">
                                    <span id="showCur">01</span><span className="text-white/40">/</span><span className="text-white/40">04</span>
                                </div>
                            </div>


                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-2" id="showDots">
                                    <button data-cursor="hover" data-i="0" className="show-dot w-10 h-1.5 bg-forest"></button>
                                    <button data-cursor="hover" data-i="1" className="show-dot w-10 h-1.5 bg-n2"></button>
                                    <button data-cursor="hover" data-i="2" className="show-dot w-10 h-1.5 bg-n2"></button>
                                    <button data-cursor="hover" data-i="3" className="show-dot w-10 h-1.5 bg-n2"></button>
                                </div>
                                <div className="flex gap-2 font-mono text-xs">
                                    <button id="showPrev" data-cursor="hover" aria-label="Previous" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M11 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button id="showNext" data-cursor="hover" aria-label="Next" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-5 pb-8">
                    <p className="font-mono text-[10px] uppercase tracking-huge text-slate mb-4">— Tools & platforms we ship</p>
                    <div className="overflow-hidden border-y border-n2 py-4 dotgrid">
                        <div className="mq gap-16 font-display font-semibold uppercase tracking-[0.14em] text-[15px] text-slategrn/70">
                            <span>WordPress</span><span className="text-ember">✦</span><span>React</span><span className="text-ember">✦</span><span>Shopify</span><span className="text-ember">✦</span><span>Webflow</span><span className="text-ember">✦</span><span>Node.js</span><span className="text-ember">✦</span><span>Figma</span><span className="text-ember">✦</span><span>GSAP</span><span className="text-ember">✦</span><span>Three.js</span><span className="text-ember">✦</span>
                            <span>WordPress</span><span className="text-ember">✦</span><span>React</span><span className="text-ember">✦</span><span>Shopify</span><span className="text-ember">✦</span><span>Webflow</span><span className="text-ember">✦</span><span>Node.js</span><span className="text-ember">✦</span><span>Figma</span><span className="text-ember">✦</span><span>GSAP</span><span className="text-ember">✦</span><span>Three.js</span><span className="text-ember">✦</span>
                        </div>
                    </div>
                </div>
            </section>


            <section id="services" className="hscroll-wrap relative overflow-hidden bg-night text-white py-20">
                <div className="absolute inset-0 dotgrid opacity-40 pointer-events-none"></div>
                <div className="relative max-w-[1400px] mx-auto px-5">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-leaf">02 — Services</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase leading-[0.9] mt-4 text-5xl md:text-7xl">
                                Not just vibes.<br />A full <span className="text-leaf">platform.</span></h2>
                        </div>
                        <p className="reveal-up font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hidden md:block">
                            Scroll → to explore the platform</p>
                    </div>
                </div>


                <div id="hscroll" className="relative mt-12">
                    <Swiper
                        modules={[Mousewheel, Scrollbar]}
                        mousewheel={{ forceToAxis: true }}
                        scrollbar={{ draggable: true, hide: false }}
                        slidesPerView="auto"
                        spaceBetween={20}
                        className="!pl-[max(1.25rem,calc((100vw-1400px)/2+20px))] !pr-[max(1.25rem,calc((100vw-1400px)/2+20px))] pb-8"
                    >
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-[#182126]/80 border border-white/10 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden card-line">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8">01</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Performance</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">Core vitals<br />in the green.
                                    </h3>
                                    <p className="text-white/60 text-sm mt-4 max-w-xs">LCP 1.1s · INP 95ms · CLS 0.01. Every build ships
                                        on a hard performance budget.</p>
                                </div>
                                <div className="relative grid grid-cols-3 gap-2 mt-8">
                                    <div className="border border-white/10 bg-white/5 p-3">
                                        <p className="font-mono text-[9px] uppercase text-white/50">LCP</p>
                                        <p className="font-display text-base sm:text-xl font-bold text-leaf">1.1s</p>
                                    </div>
                                    <div className="border border-white/10 bg-white/5 p-3">
                                        <p className="font-mono text-[9px] uppercase text-white/50">INP</p>
                                        <p className="font-display text-base sm:text-xl font-bold text-leaf">95ms</p>
                                    </div>
                                    <div className="border border-white/10 bg-white/5 p-3">
                                        <p className="font-mono text-[9px] uppercase text-white/50">CLS</p>
                                        <p className="font-display text-base sm:text-xl font-bold text-leaf">0.01</p>
                                    </div>
                                </div>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-[#182126]/80 border border-white/10 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden card-line">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8">02</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Branding</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">Identity<br />that scales.
                                    </h3>
                                    <p className="text-white/60 text-sm mt-4 max-w-xs">Logos, type, color and a component system that
                                        stays consistent across every touchpoint.</p>
                                </div>
                                <ul className="relative mt-8 space-y-2 text-sm text-white/70 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-widest">
                                    <li>— Brand strategy</li>
                                    <li>— Visual identity</li>
                                    <li>— Rebrands & migrations</li>
                                </ul>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-[#182126]/80 border border-white/10 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden card-line">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8">03</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Web
                                        design</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">Journeys<br />built to
                                        convert.</h3>
                                    <p className="text-white/60 text-sm mt-4 max-w-xs">UX research, wireframes and design systems tuned
                                        for demos, sign-ups and sales.</p>
                                </div>
                                <ul className="relative mt-8 space-y-2 text-sm text-white/70 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-widest">
                                    <li>— Custom sites & CMS</li>
                                    <li>— Landing pages</li>
                                    <li>— Redesigns & audits</li>
                                </ul>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-[#182126]/80 border border-white/10 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden card-line">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8">04</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Products</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">Apps, portals<br />&
                                        dashboards.</h3>
                                    <p className="text-white/60 text-sm mt-4 max-w-xs">Web & mobile applications, custom CMS and
                                        CRM-connected portals that feel native.</p>
                                </div>
                                <ul className="relative mt-8 space-y-2 text-sm text-white/70 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-widest">
                                    <li>— Web applications</li>
                                    <li>— Dashboards</li>
                                    <li>— Headless CMS</li>
                                </ul>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-[#182126]/80 border border-white/10 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden card-line">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8">05</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Growth</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">SEO, content<br />& CRO loops.
                                    </h3>
                                    <p className="text-white/60 text-sm mt-4 max-w-xs">Search, content and experimentation that keep
                                        compounding after the launch.</p>
                                </div>
                                <ul className="relative mt-8 space-y-2 text-sm text-white/70 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-widest">
                                    <li>— Technical SEO</li>
                                    <li>— Content engine</li>
                                    <li>— A/B & analytics</li>
                                </ul>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide className="!w-auto">
                            <article className="group w-[78vw] md:w-[420px] shrink-0 bg-forest border border-leaf/30 p-7 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
                                <span className="num-ghost font-display font-extrabold text-[110px] absolute -right-4 -bottom-8 text-leaf/10">06</span>
                                <div className="relative">
                                    <span className="inline-block px-3 py-1 border border-leaf/50 text-leaf font-mono text-[9px] uppercase tracking-huge mb-8">Motion
                                        & media</span>
                                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-white">Animation<br />that
                                        sells.</h3>
                                    <p className="text-white/70 text-sm mt-4 max-w-xs">Hero films, product renders and
                                        micro-interactions designed to hold attention.</p>
                                </div>
                                <a href="#contact" data-cursor="hover" className="relative mt-8 inline-flex items-center gap-2 text-leaf font-mono text-[11px] uppercase tracking-widest border-b border-leaf/40 pb-1 w-fit">Book
                                    a 360 call →
                                </a>
                            </article>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="relative max-w-[1400px] mx-auto px-5 mt-10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/40">
                    <span>01 / Services</span>
                    <span>— Drag or scroll horizontally</span>
                    <span>06 / Full platform</span>
                </div>
            </section>


            <section id="why-us" className="py-20 md:py-28 bg-mint relative overflow-hidden">
                <div className="absolute inset-0 gridlines pointer-events-none"></div>
                <div className="max-w-[1400px] mx-auto px-5 relative">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
                        <div className="lg:sticky lg:top-28 self-start">
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">03 — Why us</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase leading-[0.92] mt-4" style={{ fontSize: 'clamp(32px, 6vw, 60px)' }}>
                                Built for momentum<span className="text-ember">.</span></h2>
                            <p className="reveal-up mt-6 text-slategrn max-w-sm leading-relaxed">
                                Not another agency — an extension of your team. Strategy-led design and engineering that help
                                brands scale, innovate and stay ahead of the curve.
                            </p>
                            <a href="#contact" data-cursor="hover" className="reveal-up mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-forest border-b-2 border-forest pb-1 group">
                                See how we drive impact
                                <svg className="transition-transform group-hover:translate-x-1.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </a>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <article className="reveal-card bg-white border border-forest/10 p-8 relative card-line group">
                                <p className="num-ghost font-display font-extrabold text-7xl absolute top-5 right-6 group-hover:opacity-0 transition-opacity">
                                    01</p>
                                <div className="w-12 h-12 border border-forest grid place-items-center mb-7 text-forest">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M3 17l6-6 4 4 8-8" />
                                        <path d="M14 7h7v7" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold uppercase text-xl">Strategy first</h3>
                                <p className="mt-3 text-sm text-slategrn leading-relaxed">We align business goals with user needs
                                    before a single pixel — a plan that drives performance from day one.</p>
                            </article>
                            <article className="reveal-card bg-white border border-forest/10 p-8 relative card-line group md:translate-y-8">
                                <p className="num-ghost font-display font-extrabold text-7xl absolute top-5 right-6 group-hover:opacity-0 transition-opacity">
                                    02</p>
                                <div className="w-12 h-12 border border-forest grid place-items-center mb-7 text-forest">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <rect x="3" y="3" width="8" height="8" />
                                        <rect x="13" y="3" width="8" height="8" />
                                        <rect x="3" y="13" width="8" height="8" />
                                        <rect x="13" y="13" width="8" height="8" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold uppercase text-xl">Design systems</h3>
                                <p className="mt-3 text-sm text-slategrn leading-relaxed">Scalable, consistent and memorable UI
                                    systems that make your product usable at every size.</p>
                            </article>
                            <article className="reveal-card bg-white border border-forest/10 p-8 relative card-line group">
                                <p className="num-ghost font-display font-extrabold text-7xl absolute top-5 right-6 group-hover:opacity-0 transition-opacity">
                                    03</p>
                                <div className="w-12 h-12 border border-forest grid place-items-center mb-7 text-forest">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M8 16l-3-4 3-4M16 8l3 4-3 4M13 6l-2 12" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold uppercase text-xl">Senior engineering</h3>
                                <p className="mt-3 text-sm text-slategrn leading-relaxed">Clean code, modern tooling, accessibility
                                    and obsessive performance — built by people who ship.</p>
                            </article>
                            <article className="reveal-card bg-forest text-white border border-forest p-8 relative card-line group md:translate-y-8">
                                <p className="num-ghost font-display font-extrabold text-7xl absolute top-5 right-6 opacity-20">04
                                </p>
                                <div className="w-12 h-12 border border-leaf grid place-items-center mb-7 text-leaf">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M12 3l2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7z" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold uppercase text-xl">True partnership</h3>
                                <p className="mt-3 text-sm text-white/75 leading-relaxed">A dedicated squad and one point of contact
                                    — more reliable than freelancers, more agile than giants.</p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>


            <section id="work" className="py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto px-5">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">04 — Selected work</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase leading-[0.9] mt-4 text-5xl md:text-7xl">
                                See the work<span className="text-ember">.</span></h2>
                        </div>
                        <div className="reveal-up flex flex-wrap gap-2" id="workFilters">
                            <button data-filter="all" data-cursor="hover" className="filter-btn font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 border border-ink bg-ink text-white">All</button>
                            <button data-filter="b2b" data-cursor="hover" className="filter-btn font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 border border-ink bg-transparent text-ink">B2B</button>
                            <button data-filter="product" data-cursor="hover" className="filter-btn font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 border border-ink bg-transparent text-ink">Product</button>
                            <button data-filter="commerce" data-cursor="hover" className="filter-btn font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 border border-ink bg-transparent text-ink">Ecommerce</button>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-6" id="workGrid">
                        <a href="https://powerfiling.com/" target='_blank'>
                            <article data-cat="b2b" data-cursor="view" className="reveal-card work-tile group bg-white border border-n2 overflow-hidden">
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <img className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" src="./img/power.png" alt="Nexora" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    </div>
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">B2B
                                        · SaaS</span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>

                                            <h3 className="font-display font-bold uppercase text-2xl">Powerfilling</h3>

                                            <p className="mt-2 text-sm text-slategrn max-w-md">Repositioned messaging, rebuilt IA and a
                                                conversion-led homepage for a growth-stage analytics platform.</p>
                                        </div>
                                        <svg className="shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M8 7h9v9" />
                                        </svg>
                                    </div>
                                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-n2 pt-5">
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="81" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Top-3 kw</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="47" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Demo conv.</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">2.1x</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Pipeline</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </a>

                        <a href="https://www.granmade.in/" target='_blank'>
                            <article data-cat="commerce" data-cursor="view" className="reveal-card work-tile group bg-white border border-n2 overflow-hidden md:translate-y-10">
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <img className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" src="./img/granmade.png" alt="Lumen" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    </div>
                                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">Ecommerce</span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-display font-bold uppercase text-2xl">Granmade</h3>
                                            <p className="mt-2 text-sm text-slategrn max-w-md">Custom storefront, photography system and
                                                a checkout that feels as considered as the product.</p>
                                        </div>
                                        <svg className="shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M8 7h9v9" />
                                        </svg>
                                    </div>
                                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-n2 pt-5">
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">55x</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Traffic</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="46" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Engagement</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">1.8x</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">AOV</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </a>

                        <a href="https://www.kimbal.io/" target='_blank'>
                            <article data-cat="product" data-cursor="view" className="reveal-card work-tile group bg-white border border-n2 overflow-hidden">
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <img className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" src="./img/Kimbal.png" alt="Solvio" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    </div>
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">Product
                                        · Fintech</span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-display font-bold uppercase text-2xl">Kimbal</h3>
                                            <p className="mt-2 text-sm text-slategrn max-w-md">A design system and site that made a
                                                complex payments product feel simple, credible and senior.</p>
                                        </div>
                                        <svg className="shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M8 7h9v9" />
                                        </svg>
                                    </div>
                                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-n2 pt-5">
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="60" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">More leads</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="35" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Pipeline</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest count" data-count="53" data-suffix="%">0%</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Sessions</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </a>

                        <a href="https://www.ebirasat.in/" target='_blank'>

                            <article data-cat="b2b" data-cursor="view" className="reveal-card work-tile group bg-white border border-n2 overflow-hidden md:translate-y-10">
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <img className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" src="/img/ebirasat.png" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1518]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    </div>
                                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">B2B
                                        · Consulting</span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-display font-bold uppercase text-2xl">E-Birasat</h3>
                                            <p className="mt-2 text-sm text-slategrn max-w-md">Editorial architecture and a quieter
                                                visual language for a consulting brand that needed authority.</p>
                                        </div>
                                        <svg className="shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M8 7h9v9" />
                                        </svg>
                                    </div>
                                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-n2 pt-5">
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">3x</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Domain rank
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">14x</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Traffic</p>
                                        </div>
                                        <div>
                                            <p className="font-display text-3xl font-extrabold text-forest">#1</p>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-slate mt-1">Category</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </a>
                    </div>

                    <div className="mt-16 text-center reveal-up">
                        <a href="#contact" data-cursor="hover" className="btn-square inline-flex items-center gap-3 bg-transparent text-ink border-2 border-ink font-mono text-[11px] uppercase tracking-[0.16em] px-8 py-4">
                            <span className="fill"></span>
                            <span className="relative">Load more projects</span>
                        </a>
                    </div>
                </div>
            </section >


            <section id="products" className="py-20 md:py-24 bg-ink text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-[#182126]" style={{ 'clipPath': 'polygon(30% 0,100% 0,100% 100%,0 100%)' }}></div>
                <div className="max-w-[1400px] mx-auto px-5 relative">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
                        <div>
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-leaf">05 — Products</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase text-5xl md:text-6xl leading-[0.92] mt-4">
                                Launch<br />stack<span className="text-ember">.</span></h2>
                            <p className="reveal-up mt-6 text-muted max-w-sm text-sm leading-relaxed">Reusable systems we build and
                                operate with you — so your next launch is fast, on-brand and measurable.</p>
                            <a href="#contact" data-cursor="hover" className="reveal-up mt-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-huge text-leaf">
                                <span className="grid place-items-center w-10 h-10 border border-leaf/50">+</span> Talk to the team
                            </a>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <article className="reveal-card group border border-white/10 bg-[#182126]/60 p-7 card-line relative overflow-hidden">
                                <div className="flex items-center justify-between mb-6"><span className="font-mono text-[9px] uppercase tracking-huge text-leaf">Launch OS</span><span className="num-ghost text-5xl font-display font-extrabold text-white/20">A</span></div>
                                <h3 className="font-display font-bold uppercase text-xl">Launch OS</h3>
                                <p className="mt-3 text-sm text-white/60">Site system with pricing, blog and CMS — shipped in weeks,
                                    not quarters.</p>
                                <span className="mt-6 block w-8 h-8 border border-leaf/40 group-hover:bg-leaf transition-colors"></span>
                            </article>
                            <article className="reveal-card group border border-white/10 bg-[#182126]/60 p-7 card-line relative overflow-hidden sm:translate-y-6">
                                <div className="flex items-center justify-between mb-6"><span className="font-mono text-[9px] uppercase tracking-huge text-leaf">Brand Kit</span><span className="num-ghost text-5xl font-display font-extrabold text-white/20">B</span></div>
                                <h3 className="font-display font-bold uppercase text-xl">Brand Kit</h3>
                                <p className="mt-3 text-sm text-white/60">Logo, type, color and components so every touchpoint stays
                                    on brand.</p>
                                <span className="mt-6 block w-8 h-8 border border-leaf/40 group-hover:bg-leaf transition-colors"></span>
                            </article>
                            <article className="reveal-card group border border-white/10 bg-[#182126]/60 p-7 card-line relative overflow-hidden sm:translate-y-12">
                                <div className="flex items-center justify-between mb-6"><span className="font-mono text-[9px] uppercase tracking-huge text-leaf">Growth Loop</span><span className="num-ghost text-5xl font-display font-extrabold text-white/20">C</span></div>
                                <h3 className="font-display font-bold uppercase text-xl">Growth Loop</h3>
                                <p className="mt-3 text-sm text-white/60">CRO, content and performance sprints that keep earning
                                    after launch.</p>
                                <span className="mt-6 block w-8 h-8 border border-leaf/40 group-hover:bg-leaf transition-colors"></span>
                            </article>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-5">
                    <div className="relative bg-forest text-white overflow-hidden px-8 md:px-16 py-16 md:py-20">
                        <div className="absolute inset-0 dotgrid opacity-40"></div>
                        <div className="absolute -right-10 -bottom-24 w-80 h-80 rounded-full bg-leaf/10 float-a"></div>
                        <div className="absolute right-40 top-8 w-6 h-6 bg-ember float-b"></div>
                        <div className="relative grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
                            <div>
                                <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-leaf mb-4">Book a call
                                </p>
                                <h2 className="reveal-up font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.92]">
                                    Elevate your brand with Tech Hodu<span className="text-leaf">.</span></h2>
                            </div>
                            <div className="reveal-up">
                                <p className="text-white/70 text-sm leading-relaxed">Get in touch to discuss how our full-platform
                                    solutions drive measurable results for your brand.</p>
                                <a href="#contact" data-cursor="hover" className="btn-square mt-6 inline-flex items-center gap-3 bg-leaf text-ink font-mono text-[11px] uppercase tracking-[0.16em] px-7 py-4">
                                    <span className="relative">Let's Talk</span>
                                    <svg className="relative" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-20 md:py-24 bg-mint overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="flex items-end justify-between gap-4 mb-12">
                        <div>
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">Wall of love</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase text-4xl md:text-5xl mt-3">Real
                                stories,<br />real results<span className="text-ember">.</span></h2>
                        </div>
                        <div className="flex gap-2 font-mono text-xs reveal-up">
                            <button id="tsPrev" data-cursor="hover" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors" aria-label="Previous">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M11 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button id="tsNext" data-cursor="hover" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors" aria-label="Next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="relative min-h-[380px] md:min-h-[320px]">
                        <figure className="tsl active">
                            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                                <img className="w-20 h-20 md:w-24 md:h-24 object-cover border-2 border-forest" src="./testimonial_image/power_logo.png" alt="PowerFiling" />
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-huge text-ember mb-3">★★★★★ · PowerFiling</p>
                                    <blockquote className="font-display text-2xl md:text-4xl leading-snug text-ink">"Excellent teamwork and on-schedule delivery. The team's technical expertise enabled the successful development of a streamlining the filing process and significantly improving user experience and overall system performance."</blockquote>
                                    <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate">PowerFiling</figcaption>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">+37%</p>
                                    <p className="text-xs text-slate mt-1">Application submissions</p>
                                </div>
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">-40%</p>
                                    <p className="text-xs text-slate mt-1">Page load time</p>
                                </div>
                            </div>
                        </figure>
                        <figure className="tsl">
                            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                                <img className="w-20 h-20 md:w-24 md:h-24 object-cover border-2 border-forest" src="./testimonial_image/rama_logo.jpg" alt="Rama Collection Shop" />
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-huge text-ember mb-3">★★★★★ · Rama Collection Shop</p>
                                    <blockquote className="font-display text-2xl md:text-4xl leading-snug text-ink">"Excellent teamwork and on-schedule delivery. The IT firm's technical expertise enabled rapid scaling and significantly enhanced performance across all digital platforms."</blockquote>
                                    <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate">Rama Collection Shop</figcaption>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">+37%</p>
                                    <p className="text-xs text-slate mt-1">Qualified leads in 60 days</p>
                                </div>
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">+28%</p>
                                    <p className="text-xs text-slate mt-1">Session duration</p>
                                </div>
                            </div>
                        </figure>
                        <figure className="tsl">
                            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                                <img className="w-20 h-20 md:w-24 md:h-24 object-cover border-2 border-forest" src="./testimonial_image/khabar_logo.jpeg" alt="Khabar Taazgi" />
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-huge text-ember mb-3">★★★★★ · Khabar Taazgi</p>
                                    <blockquote className="font-display text-2xl md:text-4xl leading-snug text-ink">"Great collaboration and timely execution. ITfirm's development expertise helped us scale faster and improve performance across platforms."</blockquote>
                                    <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate">Khabar Taazgi</figcaption>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">+60%</p>
                                    <p className="text-xs text-slate mt-1">User engagement</p>
                                </div>
                                <div className="border-l-2 border-forest pl-4">
                                    <p className="font-display text-3xl font-extrabold text-forest">144+</p>
                                    <p className="text-xs text-slate mt-1">Sites launched</p>
                                </div>
                            </div>
                        </figure>
                    </div>

                    <div className="mt-10 flex items-center gap-3" id="tsDots">
                        <button data-cursor="hover" data-ti="0" className="tsl-dot w-8 h-1.5 bg-forest"></button>
                        <button data-cursor="hover" data-ti="1" className="tsl-dot w-8 h-1.5 bg-n2"></button>
                        <button data-cursor="hover" data-ti="2" className="tsl-dot w-8 h-1.5 bg-n2"></button>
                        <span className="ml-2 font-mono text-[9px] uppercase tracking-huge text-slate">Autoplay</span>
                    </div>
                </div>
            </section>


            <section id="blogs" className="py-20 md:py-28 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-5">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">06 — Insights</p>
                            <h2 className="reveal-up font-display font-extrabold uppercase text-4xl sm:text-5xl md:text-7xl mt-3">Latest
                                articles<span className="text-ember">.</span></h2>
                        </div>
                        <div className="flex gap-2 font-mono text-xs reveal-up shrink-0">
                            <button id="blogPrev" data-cursor="hover" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors" aria-label="Previous"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M11 18l-6-6 6-6" />
                            </svg></button>
                            <button id="blogNext" data-cursor="hover" className="w-11 h-11 border border-ink grid place-items-center hover:bg-ink hover:text-leaf transition-colors" aria-label="Next"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg></button>
                        </div>
                    </div>
                </div>
                <div className="w-full pl-5">
                    <div id="blogScroller" className="blog-scroller snap-x flex gap-5 pl-5 sm:pl-[max(1.25rem,calc((100vw-1400px)/2+20px))] pr-5 sm:pr-8 overflow-x-auto" style={{ 'cursor': 'grab' }}>
                        <article className="reveal-card snap-start w-[80vw] sm:w-[420px] shrink-0 group" data-cursor="drag">
                            <div className="relative overflow-hidden aspect-[16/11] bg-n2">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt="Redesign process" />
                                <span className="absolute top-4 left-4 bg-white px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">Web
                                    design</span>
                            </div>
                            <div className="pt-5">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Jun 5, 2026 · 8 min read
                                </p>
                                <h3 className="font-display font-bold uppercase text-xl mt-2 leading-snug">The redesign process B2B
                                    teams use to raise conversions</h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-forest">Read
                                    article →</span>
                            </div>
                        </article>
                        <article className="reveal-card snap-start w-[80vw] sm:w-[420px] shrink-0 group" data-cursor="drag">
                            <div className="relative overflow-hidden aspect-[16/11] bg-n2">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Brand storytelling" />
                                <span className="absolute top-4 left-4 bg-white px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">Branding</span>
                            </div>
                            <div className="pt-5">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Apr 8, 2026 · 6 min read
                                </p>
                                <h3 className="font-display font-bold uppercase text-xl mt-2 leading-snug">How brand storytelling on
                                    your site closes more B2B deals</h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-forest">Read
                                    article →</span>
                            </div>
                        </article>
                        <article className="reveal-card snap-start w-[80vw] sm:w-[420px] shrink-0 group" data-cursor="drag">
                            <div className="relative overflow-hidden aspect-[16/11] bg-n2">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="SaaS rebrand" />
                                <span className="absolute top-4 left-4 bg-white px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">SaaS</span>
                            </div>
                            <div className="pt-5">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Mar 19, 2026 · 7 min read
                                </p>
                                <h3 className="font-display font-bold uppercase text-xl mt-2 leading-snug">How a rebrand redefines
                                    SaaS identity and boosts pipeline</h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-forest">Read
                                    article →</span>
                            </div>
                        </article>
                        <article className="reveal-card snap-start w-[80vw] sm:w-[420px] shrink-0 group" data-cursor="drag">
                            <div className="relative overflow-hidden aspect-[16/11] bg-n2">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" alt="CRO audit" />
                                <span className="absolute top-4 left-4 bg-white px-3 py-1 font-mono text-[9px] uppercase tracking-huge text-forest">CRO</span>
                            </div>
                            <div className="pt-5">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Feb 2, 2026 · 5 min read
                                </p>
                                <h3 className="font-display font-bold uppercase text-xl mt-2 leading-snug">The 20-minute website
                                    audit that finds your revenue leaks</h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-forest">Read
                                    article →</span>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto px-5 mt-8 flex justify-between font-mono text-[9px] uppercase tracking-widest text-slate">
                    <span>← Drag the track →</span>
                    <a href="#blogs" data-cursor="hover" className="text-forest hover:underline">Browse similar articles</a>
                </div>
            </section>


            <section id="contact" className="py-20 md:py-28 bg-mist gridlines relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-5 grid lg:grid-cols-2 gap-14 items-start relative">
                    <div>
                        <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">07 — Contact</p>
                        <h2 className="reveal-up font-display font-extrabold uppercase text-[42px] md:text-6xl leading-[0.92] mt-4">
                            Your next idea starts here<span className="text-ember">.</span></h2>
                        <p className="reveal-up mt-6 text-slategrn max-w-md leading-relaxed text-sm">Tell us about the brand, the
                            bottleneck and the outcome you want. We'll reply with a clear next step — usually a 30-minute
                            strategy call.</p>
                        <div className="reveal-up mt-8 space-y-4 font-mono text-xs uppercase tracking-widest">
                            <p className="flex items-center gap-3"><span className="w-8 h-8 border border-forest grid place-items-center text-forest text-[10px]">@</span>
                                <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="08606d646467487c6d6b6060676c7d266b6765">[email protected]</a></p>
                            <p className="flex items-center gap-3"><span className="w-8 h-8 border border-forest grid place-items-center text-forest text-[10px]">⌁</span>
                                Worldwide — remote studio</p>
                            <p className="flex items-center gap-3"><span className="w-8 h-8 border border-forest grid place-items-center text-forest text-[10px]">⚡</span>
                                Reply within 24 hours</p>
                        </div>
                        <div className="reveal-up mt-10 grid grid-cols-3 gap-3 max-w-sm">
                            <div className="bg-white border border-n2 p-4 text-center">
                                <p className="font-display text-3xl font-extrabold text-forest count" data-count="144" data-suffix="+">0+</p>
                                <p className="font-mono text-[8px] uppercase tracking-widest text-slate mt-1">Sites shipped</p>
                            </div>
                            <div className="bg-white border border-n2 p-4 text-center">
                                <p className="font-display text-3xl font-extrabold text-forest count" data-count="50" data-suffix="%">0%</p>
                                <p className="font-mono text-[8px] uppercase tracking-widest text-slate mt-1">More demos</p>
                            </div>
                            <div className="bg-white border border-n2 p-4 text-center">
                                <p className="font-display text-3xl font-extrabold text-forest">4.9</p>
                                <p className="font-mono text-[8px] uppercase tracking-widest text-slate mt-1">Rating</p>
                            </div>
                        </div>
                    </div>
                    <form id="talkForm" className="reveal-card bg-white border border-n2 p-7 md:p-10 space-y-5 relative">
                        <p className="font-mono text-[9px] uppercase tracking-huge text-slate absolute -top-3 left-6 bg-[#f5f8f4] px-2">
                            Project brief</p>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <label className="block text-sm">Name <span className="text-ember">*</span>
                                <input required name="name" className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest transition text-sm bg-[#fbfdf9]" />
                            </label>
                            <label className="block text-sm">Email <span className="text-ember">*</span>
                                <input required type="email" name="email" className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest transition text-sm bg-[#fbfdf9]" />
                            </label>
                        </div>
                        <label className="block text-sm">Company
                            <input name="company" className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest transition text-sm bg-[#fbfdf9]" />
                        </label>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <label className="block text-sm">Service needed
                                <select name="service" className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest bg-[#fbfdf9] text-sm">
                                    <option>Website design & development</option>
                                    <option>Brand identity</option>
                                    <option>Product / app</option>
                                    <option>Growth & SEO</option>
                                    <option>Not sure yet</option>
                                </select>
                            </label>
                            <label className="block text-sm">Budget
                                <select name="budget" className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest bg-[#fbfdf9] text-sm">
                                    <option>Less than $10k</option>
                                    <option>$10k–$20k</option>
                                    <option>$20k–$40k</option>
                                    <option>$40k–$80k</option>
                                    <option>$80k+</option>
                                </select>
                            </label>
                        </div>
                        <label className="block text-sm">Tell us more
                            <textarea name="message" rows={4} className="mt-2 w-full border border-n2 px-4 py-3 outline-none focus:border-forest transition text-sm bg-[#fbfdf9]"></textarea>
                        </label>
                        <button type="submit" data-cursor="hover" className="btn-square w-full bg-ink text-white font-mono text-[11px] uppercase tracking-[0.2em] py-4">
                            <span className="fill"></span><span className="relative">Book a strategy call →</span>
                        </button>
                        <p id="formNote" className="hidden text-sm text-moss font-semibold">Thanks — we'll be in touch within 24
                            hours.</p>
                    </form>
                </div>
            </section>


            <section id="faqs" className="py-20 md:py-24">
                <div className="max-w-3xl mx-auto px-5">
                    <div className="text-center mb-12">
                        <p className="reveal-up font-mono text-[10px] uppercase tracking-huge text-moss">08 — FAQ</p>
                        <h2 className="reveal-up font-display font-extrabold uppercase text-4xl md:text-5xl mt-3">Still have
                            questions?</h2>
                    </div>
                    <div className="space-y-3">
                        <details open className="reveal-card bg-white border border-n2">
                            <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display font-bold uppercase text-base cursor-pointer">
                                What makes a Tech Hodu website effective?
                                <span className="faq-plus shrink-0 grid place-items-center w-9 h-9 border border-forest text-forest font-mono text-lg">+</span>
                            </summary>
                            <p className="px-6 pb-6 text-sm text-slategrn leading-relaxed">Clear messaging, an intuitive buyer
                                journey and design that proves value fast. We optimize for conversions — demos, inquiries and
                                sales — not just aesthetics.</p>
                        </details>
                        <details className="reveal-card bg-white border border-n2">
                            <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display font-bold uppercase text-base cursor-pointer">
                                How do you approach a new engagement?
                                <span className="faq-plus shrink-0 grid place-items-center w-9 h-9 border border-forest text-forest font-mono text-lg">+</span>
                            </summary>
                            <p className="px-6 pb-6 text-sm text-slategrn leading-relaxed">We start with product, audience and
                                business goals. Then positioning, wireframes, design and a build your marketing team can
                                actually run without engineering.</p>
                        </details>
                        <details className="reveal-card bg-white border border-n2">
                            <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display font-bold uppercase text-base cursor-pointer">
                                How long does a typical project take?
                                <span className="faq-plus shrink-0 grid place-items-center w-9 h-9 border border-forest text-forest font-mono text-lg">+</span>
                            </summary>
                            <p className="px-6 pb-6 text-sm text-slategrn leading-relaxed">Most custom websites ship in 8–12 weeks.
                                Complexity and content can shift that — you'll get a week-by-week plan at kickoff so
                                expectations stay clear.</p>
                        </details>
                        <details className="reveal-card bg-white border border-n2">
                            <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display font-bold uppercase text-base cursor-pointer">
                                Do you work as an extension of our team?
                                <span className="faq-plus shrink-0 grid place-items-center w-9 h-9 border border-forest text-forest font-mono text-lg">+</span>
                            </summary>
                            <p className="px-6 pb-6 text-sm text-slategrn leading-relaxed">Yes. A dedicated squad and a single point
                                of contact — more reliable than freelancers, more agile than a typical holding-company agency.
                            </p>
                        </details>
                        <details className="reveal-card bg-white border border-n2">
                            <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display font-bold uppercase text-base cursor-pointer">
                                What happens after launch?
                                <span className="faq-plus shrink-0 grid place-items-center w-9 h-9 border border-forest text-forest font-mono text-lg">+</span>
                            </summary>
                            <p className="px-6 pb-6 text-sm text-slategrn leading-relaxed">We can stay on for CRO, content, SEO and
                                performance. Launch is the start of the growth loop, not the finish line.</p>
                        </details>
                    </div>
                </div>
            </section>


            <footer className="bg-night text-white pb-24">
                <div className="max-w-[1400px] mx-auto px-5 pt-16 pb-10 grid md:grid-cols-4 gap-10">
                    <div>
                        <a href="#home" className="flex items-center gap-3" data-cursor="hover">
                            <img src="techhodu_logo.svg" alt="Tech Hodu" className="h-9 w-9 object-contain bg-white rounded p-0.5" />
                            <span className="font-display font-bold uppercase text-lg leading-none">Tech<br />Hodu<span className="text-ember">.</span></span>
                        </a>
                        <p className="mt-5 text-sm text-muted leading-relaxed max-w-xs">Websites that grow brands. Built to perform.
                            Designed to last.</p>
                        <div className="mt-6 flex gap-3">
                            <a target='_blank' href="https://www.linkedin.com/company/techhoduservices/" data-cursor="hover" className="w-10 h-10 border border-white/15 grid place-items-center hover:border-leaf hover:text-leaf transition-colors">in</a>
                            <a target='_blank' href="https://www.facebook.com/profile.php?id=61593569147707" data-cursor="hover" className="w-10 h-10 border border-white/15 grid place-items-center hover:border-leaf hover:text-leaf transition-colors">FB</a>
                            <a target='_blank' href="https://www.instagram.com/techhodufirm?igsi=MnloOXlzdnJ0aTE5" data-cursor="hover" className="w-10 h-10 border border-white/15 grid place-items-center hover:border-leaf hover:text-leaf transition-colors">ig</a>
                            <a target='_blank' href="https://www.youtube.com/@techhoduofficial" data-cursor="hover" className="w-10 h-10 border border-white/15 grid place-items-center hover:border-leaf hover:text-leaf transition-colors">yt</a>
                        </div>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-huge text-leaf mb-5">Services</p>
                        <ul className="space-y-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                            <li><a href="#services" className="hover:text-white">Web design</a></li>
                            <li><a href="#services" className="hover:text-white">Development</a></li>
                            <li><a href="#products" className="hover:text-white">Products</a></li>
                            <li><a href="#services" className="hover:text-white">Branding</a></li>
                            <li><a href="#services" className="hover:text-white">Growth</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-huge text-leaf mb-5">Company</p>
                        <ul className="space-y-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                            <li><a href="#why-us" className="hover:text-white">Why us</a></li>
                            <li><a href="#work" className="hover:text-white">Work</a></li>
                            <li><a href="#blogs" className="hover:text-white">Blogs</a></li>
                            <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
                            <li><a href="#contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-huge text-leaf mb-5">Start a conversation</p>
                        <a href="#contact" data-cursor="hover" className="btn-square mt-6 inline-flex items-center gap-2 bg-leaf text-ink font-mono text-[10px] uppercase tracking-[0.16em] px-5 py-3">
                            <span className="relative">Let's Talk</span>
                        </a>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto px-5 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-widest text-slate">
                    <p>© 2026 Tech Hodu. All rights reserved.</p>
                    <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Back to top ↑</a></div>
                </div>
            </footer>

            <div className="bottom-0 inset-x-0 z-40 bg-ink text-white">
                <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-huge text-white/70 hidden sm:block">Ready when you are
                    </p>
                    <p className="text-sm font-display font-bold uppercase truncate">Let's grow your brand<span className="text-ember">.</span></p>
                    <a href="#contact" data-cursor="hover" className="font-bold btn-square shrink-0 inline-flex items-center gap-2 bg-leaf text-ink font-mono text-[10px] uppercase tracking-[0.14em] px-5 py-2.5">
                        {/* <span className="fill" style={{ 'background': '#0f1518' }}></span> */}
                        <span className="relative">Start a project</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
