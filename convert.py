import re
import sys
from html.parser import HTMLParser

class JSXConverter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.jsx = []
        self.in_body = False
        self.in_script = False
        self.script_content = ""
        self.body_content = []

    def handle_starttag(self, tag, attrs):
        if tag == "body":
            self.in_body = True
            # we skip the body tag itself
            return
        if not self.in_body:
            return
        if tag == "script":
            self.in_script = True
            return

        attr_str = ""
        for name, value in attrs:
            if name == "class":
                name = "className"
            elif name == "for":
                name = "htmlFor"
            elif name == "tabindex":
                name = "tabIndex"
            elif name == "autocomplete":
                name = "autoComplete"
            elif name == "stroke-width":
                name = "strokeWidth"
            elif name == "fill-rule":
                name = "fillRule"
            elif name == "clip-rule":
                name = "clipRule"
            elif name == "stroke-linecap":
                name = "strokeLinecap"
            elif name == "stroke-linejoin":
                name = "strokeLinejoin"
            elif name == "viewbox":
                name = "viewBox"
            elif name == "style":
                # Very basic style to object converter
                styles = value.split(";")
                style_obj = []
                for s in styles:
                    if ":" in s:
                        k, v = s.split(":", 1)
                        k = k.strip()
                        v = v.strip()
                        # camelCase k
                        k_parts = k.split("-")
                        k_camel = k_parts[0] + "".join(x.capitalize() for x in k_parts[1:])
                        style_obj.append(f"'{k_camel}': '{v}'")
                value = "{{" + ", ".join(style_obj) + "}}"
                attr_str += f" {name}={value}"
                continue
                
            if value is None:
                attr_str += f" {name}"
            else:
                attr_str += f' {name}="{value}"'
                
        if tag in ["img", "input", "br", "hr", "meta", "link", "path", "rect", "circle"]:
            self.body_content.append(f"<{tag}{attr_str} />")
        else:
            self.body_content.append(f"<{tag}{attr_str}>")

    def handle_endtag(self, tag):
        if tag == "body":
            self.in_body = False
            return
        if tag == "script":
            self.in_script = False
            return
        if not self.in_body:
            return
        if tag not in ["img", "input", "br", "hr", "meta", "link", "path", "rect", "circle"]:
            self.body_content.append(f"</{tag}>")

    def handle_data(self, data):
        if self.in_script:
            self.script_content += data
        elif self.in_body:
            # escape curly braces
            data = data.replace("{", "&#123;").replace("}", "&#125;")
            self.body_content.append(data)

def main():
    with open("index.html.bak", "r", encoding="utf-8") as f:
        html = f.read()
    
    parser = JSXConverter()
    parser.feed(html)
    
    jsx = "".join(parser.body_content)
    
    # We want to extract the gsap/lenis script block specifically
    # It's in parser.script_content
    # Let's clean it up slightly and wrap it in useEffect
    
    script = parser.script_content
    # strip tailwind config script and cloudflare scripts
    scripts = re.split(r'tailwind\.config = \{.*?\};|!function\(e,t\)\{.*|import .*|export .*', script, flags=re.DOTALL)
    # The actual logic is inside an IIFE (function () { ... })();
    # We can extract the content of the IIFE
    match = re.search(r'\(function\s*\(\)\s*\{(.*?)\}\)\(\);', script, re.DOTALL)
    if match:
        logic = match.group(1)
    else:
        logic = script # fallback

    # Add React template
    template = """'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Page() {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Original JS Logic Start
""" + logic + """
    // Original JS Logic End

    return () => {
        if (timer) clearInterval(timer);
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      """ + jsx + """
    </>
  );
}
"""
    with open("src/app/page.tsx", "w", encoding="utf-8") as f:
        f.write(template)

if __name__ == "__main__":
    main()
